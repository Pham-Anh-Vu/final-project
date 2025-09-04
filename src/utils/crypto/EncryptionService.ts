/**
 * Frontend Encryption Service for Banking Application
 * 
 * Chỉ dùng cho mã hóa dữ liệu tạm thời phía client
 * Dữ liệu nhạy cảm chính vẫn được mã hóa ở backend
 */

interface CryptoResult {
  encryptedData: string;
  iv: string;
}

interface KeyPair {
  publicKey: CryptoKey;
  privateKey: CryptoKey;
}

export class ClientEncryptionService {
  private static readonly ALGORITHM = 'AES-GCM';
  private static readonly KEY_LENGTH = 256;
  private static readonly IV_LENGTH = 12;

  /**
   * Tạo symmetric key cho session
   */
  static async generateSessionKey(): Promise<CryptoKey> {
    return await window.crypto.subtle.generateKey(
      {
        name: this.ALGORITHM,
        length: this.KEY_LENGTH,
      },
      true, // extractable
      ['encrypt', 'decrypt']
    );
  }

  /**
   * Mã hóa dữ liệu với session key
   */
  static async encryptData(data: string, key: CryptoKey): Promise<CryptoResult> {
    const encoder = new TextEncoder();
    const dataBuffer = encoder.encode(data);
    
    const iv = window.crypto.getRandomValues(new Uint8Array(this.IV_LENGTH));
    
    const encryptedBuffer = await window.crypto.subtle.encrypt(
      {
        name: this.ALGORITHM,
        iv: iv,
      },
      key,
      dataBuffer
    );

    return {
      encryptedData: this.arrayBufferToBase64(encryptedBuffer),
      iv: this.arrayBufferToBase64(iv),
    };
  }

  /**
   * Giải mã dữ liệu
   */
  static async decryptData(
    encryptedData: string,
    iv: string,
    key: CryptoKey
  ): Promise<string> {
    const encryptedBuffer = this.base64ToArrayBuffer(encryptedData);
    const ivBuffer = this.base64ToArrayBuffer(iv);

    const decryptedBuffer = await window.crypto.subtle.decrypt(
      {
        name: this.ALGORITHM,
        iv: ivBuffer,
      },
      key,
      encryptedBuffer
    );

    const decoder = new TextDecoder();
    return decoder.decode(decryptedBuffer);
  }

  /**
   * Export key để lưu trữ (dạng base64)
   */
  static async exportKey(key: CryptoKey): Promise<string> {
    const exportedKey = await window.crypto.subtle.exportKey('raw', key);
    return this.arrayBufferToBase64(exportedKey);
  }

  /**
   * Import key từ base64
   */
  static async importKey(keyData: string): Promise<CryptoKey> {
    const keyBuffer = this.base64ToArrayBuffer(keyData);
    
    return await window.crypto.subtle.importKey(
      'raw',
      keyBuffer,
      {
        name: this.ALGORITHM,
        length: this.KEY_LENGTH,
      },
      true,
      ['encrypt', 'decrypt']
    );
  }

  /**
   * Tạo RSA key pair cho key exchange
   */
  static async generateRSAKeyPair(): Promise<KeyPair> {
    const keyPair = await window.crypto.subtle.generateKey(
      {
        name: 'RSA-OAEP',
        modulusLength: 2048,
        publicExponent: new Uint8Array([1, 0, 1]),
        hash: 'SHA-256',
      },
      true,
      ['encrypt', 'decrypt']
    );

    return {
      publicKey: keyPair.publicKey,
      privateKey: keyPair.privateKey,
    };
  }

  /**
   * Mã hóa session key bằng RSA public key
   */
  static async encryptSessionKey(
    sessionKey: CryptoKey,
    publicKey: CryptoKey
  ): Promise<string> {
    const keyBuffer = await window.crypto.subtle.exportKey('raw', sessionKey);
    
    const encryptedKey = await window.crypto.subtle.encrypt(
      {
        name: 'RSA-OAEP',
      },
      publicKey,
      keyBuffer
    );

    return this.arrayBufferToBase64(encryptedKey);
  }

  /**
   * Giải mã session key bằng RSA private key
   */
  static async decryptSessionKey(
    encryptedSessionKey: string,
    privateKey: CryptoKey
  ): Promise<CryptoKey> {
    const encryptedKeyBuffer = this.base64ToArrayBuffer(encryptedSessionKey);
    
    const keyBuffer = await window.crypto.subtle.decrypt(
      {
        name: 'RSA-OAEP',
      },
      privateKey,
      encryptedKeyBuffer
    );

    return await window.crypto.subtle.importKey(
      'raw',
      keyBuffer,
      {
        name: this.ALGORITHM,
        length: this.KEY_LENGTH,
      },
      true,
      ['encrypt', 'decrypt']
    );
  }

  /**
   * Hash dữ liệu để so sánh
   */
  static async hashData(data: string): Promise<string> {
    const encoder = new TextEncoder();
    const dataBuffer = encoder.encode(data);
    
    const hashBuffer = await window.crypto.subtle.digest('SHA-256', dataBuffer);
    return this.arrayBufferToBase64(hashBuffer);
  }

  /**
   * Mask dữ liệu nhạy cảm để hiển thị
   */
  static maskSensitiveData(value: string, type: 'phone' | 'email' | 'identity' | 'account' | 'general' | 'financial'): string {
    if (!value || value.length === 0) return value;

    switch (type) {
      case 'phone':
        if (value.length > 6) {
          return value.substring(0, 3) + '****' + value.substring(value.length - 3);
        }
        break;
      case 'email':
        const atIndex = value.indexOf('@');
        if (atIndex > 2) {
          return value.substring(0, 2) + '****' + value.substring(atIndex);
        }
        break;
      case 'identity':
        if (value.length > 6) {
          return value.substring(0, 3) + '****' + value.substring(value.length - 3);
        }
        break;
      case 'account':
        if (value.length > 4) {
          return '****' + value.substring(value.length - 4);
        }
        break;
      case 'general':
        if (value.length > 6) {
          return value.substring(0, 2) + '*'.repeat(value.length - 4) + value.substring(value.length - 2);
        } else {
          return '*'.repeat(value.length);
        }
        break;
      case 'financial':
        // For financial data, show only currency format with masked amount
        return '***,*** ₫';
      default:
        if (value.length > 4) {
          return value.substring(0, 2) + '****' + value.substring(value.length - 2);
        }
    }

    return '****';
  }

  /**
   * Validate dữ liệu đầu vào trước khi gửi lên server
   */
  static validateSensitiveData(value: string, type: 'phone' | 'email' | 'identity' | 'financial'): boolean {
    switch (type) {
      case 'phone':
        // Kiểm tra số điện thoại Việt Nam
        return /^(\+84|84|0)(3|5|7|8|9)[0-9]{8}$/.test(value);
      case 'email':
        // Kiểm tra format email
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
      case 'identity':
        // Kiểm tra CMND/CCCD (9 hoặc 12 số)
        return /^[0-9]{9}$|^[0-9]{12}$/.test(value);
      case 'financial':
        // Kiểm tra số tiền (số dương hoặc 0)
        const amount = parseFloat(value);
        return !isNaN(amount) && amount >= 0;
      default:
        return true;
    }
  }

  /**
   * Secure wipe của dữ liệu nhạy cảm trong memory
   */
  static secureWipe(obj: any): void {
    if (typeof obj === 'object' && obj !== null) {
      for (const key in obj) {
        if (typeof obj[key] === 'string') {
          // Overwrite string với random data
          obj[key] = this.generateRandomString(obj[key].length);
        } else if (typeof obj[key] === 'object') {
          this.secureWipe(obj[key]);
        }
      }
    }
  }

  /**
   * Tạo random string
   */
  private static generateRandomString(length: number): string {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
  }

  /**
   * Utility: ArrayBuffer to Base64
   */
  private static arrayBufferToBase64(buffer: ArrayBuffer): string {
    const bytes = new Uint8Array(buffer);
    let binary = '';
    for (let i = 0; i < bytes.byteLength; i++) {
      binary += String.fromCharCode(bytes[i]);
    }
    return window.btoa(binary);
  }

  /**
   * Utility: Base64 to ArrayBuffer
   */
  private static base64ToArrayBuffer(base64: string): ArrayBuffer {
    const binary = window.atob(base64);
    const bytes = new Uint8Array(binary.length);
    for (let i = 0; i < binary.length; i++) {
      bytes[i] = binary.charCodeAt(i);
    }
    return bytes.buffer;
  }
}

/**
 * Session Storage Manager cho encrypted data
 */
export class SecureSessionManager {
  private static readonly SESSION_KEY = 'banking_session_key';
  private static readonly DATA_PREFIX = 'encrypted_';

  /**
   * Khởi tạo secure session
   */
  static async initializeSession(): Promise<void> {
    const sessionKey = await ClientEncryptionService.generateSessionKey();
    const keyData = await ClientEncryptionService.exportKey(sessionKey);
    
    // Lưu key trong memory, không lưu persistent
    (window as any).__banking_session_key__ = keyData;
  }

  /**
   * Lưu dữ liệu encrypted vào session
   */
  static async setSecureData(key: string, data: string): Promise<void> {
    const keyData = (window as any).__banking_session_key__;
    if (!keyData) {
      throw new Error('Session not initialized');
    }

    const sessionKey = await ClientEncryptionService.importKey(keyData);
    const encrypted = await ClientEncryptionService.encryptData(data, sessionKey);
    
    sessionStorage.setItem(
      this.DATA_PREFIX + key,
      JSON.stringify(encrypted)
    );
  }

  /**
   * Lấy dữ liệu encrypted từ session
   */
  static async getSecureData(key: string): Promise<string | null> {
    const keyData = (window as any).__banking_session_key__;
    if (!keyData) {
      return null;
    }

    const encryptedData = sessionStorage.getItem(this.DATA_PREFIX + key);
    if (!encryptedData) {
      return null;
    }

    try {
      const { encryptedData: data, iv } = JSON.parse(encryptedData);
      const sessionKey = await ClientEncryptionService.importKey(keyData);
      
      return await ClientEncryptionService.decryptData(data, iv, sessionKey);
    } catch (error) {
      console.error('Failed to decrypt session data:', error);
      return null;
    }
  }

  /**
   * Xóa tất cả dữ liệu secure
   */
  static clearSecureSession(): void {
    // Xóa session key từ memory
    delete (window as any).__banking_session_key__;
    
    // Xóa tất cả encrypted data từ session storage
    for (let i = sessionStorage.length - 1; i >= 0; i--) {
      const key = sessionStorage.key(i);
      if (key && key.startsWith(this.DATA_PREFIX)) {
        sessionStorage.removeItem(key);
      }
    }
  }
}
