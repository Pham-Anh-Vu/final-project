/**
 * Data Protection utilities cho Banking Application
 */

import { ClientEncryptionService } from './EncryptionService';

export interface SensitiveField {
  value: string;
  type: 'phone' | 'email' | 'identity' | 'account' | 'financial' | 'general';
  masked?: string;
}

export class DataProtectionService {
  
  /**
   * Chuẩn bị dữ liệu nhạy cảm trước khi gửi lên server
   */
  static prepareSensitiveData(data: Record<string, any>): Record<string, any> {
    const prepared = { ...data };
    
    // Validate và sanitize dữ liệu
    for (const [key, value] of Object.entries(prepared)) {
      if (typeof value === 'string' && value.trim()) {
        prepared[key] = this.sanitizeInput(value.trim());
      }
    }
    
    return prepared;
  }

  /**
   * Tạo masked version của dữ liệu nhạy cảm cho UI
   */
  static createMaskedData<T extends Record<string, any>>(
    data: T,
    sensitiveFields: Record<keyof T, 'phone' | 'email' | 'identity' | 'account' | 'general' | 'financial'>
  ): T {
    const masked = { ...data } as T;
    
    for (const [field, type] of Object.entries(sensitiveFields)) {
      if (masked[field] && typeof masked[field] === 'string') {
        (masked as any)[field] = ClientEncryptionService.maskSensitiveData(masked[field], type);
      }
    }
    
    return masked;
  }

  /**
   * Validate dữ liệu nhạy cảm
   */
  static validateSensitiveFields(
    data: Record<string, string>,
    rules: Record<string, 'phone' | 'email' | 'identity'>
  ): { isValid: boolean; errors: Record<string, string> } {
    const errors: Record<string, string> = {};
    
    for (const [field, type] of Object.entries(rules)) {
      const value = data[field];
      if (value && !ClientEncryptionService.validateSensitiveData(value, type)) {
        switch (type) {
          case 'phone':
            errors[field] = 'Số điện thoại không hợp lệ';
            break;
          case 'email':
            errors[field] = 'Email không hợp lệ';
            break;
          case 'identity':
            errors[field] = 'Số CMND/CCCD không hợp lệ (9 hoặc 12 số)';
            break;
        }
      }
    }
    
    return {
      isValid: Object.keys(errors).length === 0,
      errors
    };
  }

  /**
   * Sanitize input để prevent injection
   */
  private static sanitizeInput(input: string): string {
    return input
      .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '') // Remove scripts
      .replace(/[<>]/g, '') // Remove angle brackets
      .replace(/javascript:/gi, '') // Remove javascript: protocol
      .replace(/data:/gi, '') // Remove data: protocol
      .trim();
  }

  /**
   * Format số tiền an toàn
   */
  static formatCurrencySecure(amount: number | string): string {
    if (typeof amount === 'string') {
      amount = parseFloat(amount);
    }
    
    if (isNaN(amount)) {
      return '0 ₫';
    }
    
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  }

  /**
   * Xử lý hiển thị encrypted financial data
   */
  static handleEncryptedFinancialData(
    encryptedValue: string | null,
    plainValue: number | string | null,
    showMasked: boolean = true
  ): string {
    // Nếu có plain value và không yêu cầu mask, hiển thị giá trị thật
    if (!showMasked && plainValue !== null && plainValue !== undefined) {
      return this.formatCurrencySecure(plainValue);
    }
    
    // Nếu data được encrypt, hiển thị masked format
    if (encryptedValue && showMasked) {
      return ClientEncryptionService.maskSensitiveData(encryptedValue, 'financial');
    }
    
    // Fallback cho case không có data
    return '0 ₫';
  }

  /**
   * Tạo financial data object với encrypted và plain versions
   */
  static createFinancialDataObject(amount: number | string): {
    value: number;
    encrypted: string | null;
    masked: string;
    formatted: string;
  } {
    const numericValue = typeof amount === 'string' ? parseFloat(amount) : amount;
    
    return {
      value: isNaN(numericValue) ? 0 : numericValue,
      encrypted: null, // Sẽ được backend xử lý
      masked: this.handleEncryptedFinancialData(null, numericValue, true),
      formatted: this.formatCurrencySecure(numericValue)
    };
  }

  /**
   * Format số tài khoản an toàn
   */
  static formatAccountNumber(accountNumber: string, showFull: boolean = false): string {
    if (!accountNumber) return '';
    
    if (showFull) {
      // Hiển thị với khoảng trắng mỗi 4 số
      return accountNumber.replace(/(\d{4})(?=\d)/g, '$1 ');
    } else {
      // Hiển thị chỉ 4 số cuối
      return ClientEncryptionService.maskSensitiveData(accountNumber, 'account');
    }
  }

  /**
   * Tạo audit log cho các thao tác nhạy cảm
   */
  static createAuditLog(action: string, entityType: string, entityId: string | number): void {
    const auditData = {
      timestamp: new Date().toISOString(),
      action,
      entityType,
      entityId,
      userAgent: navigator.userAgent,
      sessionId: this.getSessionId(),
    };
    
    // Gửi audit log lên server (async)
    this.sendAuditLog(auditData).catch(error => {
      console.error('Failed to send audit log:', error);
    });
  }

  /**
   * Gửi audit log lên server
   */
  private static async sendAuditLog(auditData: any): Promise<void> {
    try {
      await fetch('/api/audit-log', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(auditData),
      });
    } catch (error) {
      // Store locally nếu không gửi được
      const logs = JSON.parse(localStorage.getItem('pending_audit_logs') || '[]');
      logs.push(auditData);
      localStorage.setItem('pending_audit_logs', JSON.stringify(logs));
    }
  }

  /**
   * Lấy session ID
   */
  private static getSessionId(): string {
    let sessionId = sessionStorage.getItem('banking_session_id');
    if (!sessionId) {
      sessionId = this.generateUUID();
      sessionStorage.setItem('banking_session_id', sessionId);
    }
    return sessionId;
  }

  /**
   * Tạo UUID
   */
  private static generateUUID(): string {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      const r = Math.random() * 16 | 0;
      const v = c === 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }

  /**
   * Kiểm tra xem có đang trong môi trường an toàn không
   */
  static isSecureEnvironment(): boolean {
    // Kiểm tra HTTPS
    if (location.protocol !== 'https:' && location.hostname !== 'localhost') {
      return false;
    }
    
    // Kiểm tra Web Crypto API
    if (!window.crypto || !window.crypto.subtle) {
      return false;
    }
    
    return true;
  }

  /**
   * Hiển thị cảnh báo bảo mật nếu cần
   */
  static checkSecurityWarnings(): string[] {
    const warnings: string[] = [];
    
    if (!this.isSecureEnvironment()) {
      warnings.push('Môi trường không an toàn. Vui lòng sử dụng HTTPS.');
    }
    
    if (navigator.userAgent.includes('IE')) {
      warnings.push('Trình duyệt không được hỗ trợ. Vui lòng sử dụng Chrome, Firefox hoặc Safari.');
    }
    
    return warnings;
  }

  /**
   * Memory cleanup cho sensitive data
   */
  static secureCleanup(obj: any): void {
    ClientEncryptionService.secureWipe(obj);
  }
}

/**
 * React Hook cho data protection
 */
export const useDataProtection = () => {
  return {
    maskData: DataProtectionService.createMaskedData,
    validateFields: DataProtectionService.validateSensitiveFields,
    formatCurrency: DataProtectionService.formatCurrencySecure,
    formatAccount: DataProtectionService.formatAccountNumber,
    createAuditLog: DataProtectionService.createAuditLog,
    checkSecurity: DataProtectionService.checkSecurityWarnings,
  };
};
