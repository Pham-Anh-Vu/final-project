import React, { useEffect, useState } from 'react';
import { Alert, Badge, Tooltip } from 'antd';
import { ShieldCheckOutlined, WarningOutlined, LockOutlined } from '@ant-design/icons';
import { DataProtectionService } from '../../utils/crypto/DataProtection';
import './EncryptionStatus.css';

interface EncryptionStatusProps {
  showDetails?: boolean;
  className?: string;
}

export const EncryptionStatus: React.FC<EncryptionStatusProps> = ({ 
  showDetails = false, 
  className = '' 
}) => {
  const [securityWarnings, setSecurityWarnings] = useState<string[]>([]);
  const [isSecure, setIsSecure] = useState(true);

  useEffect(() => {
    const warnings = DataProtectionService.checkSecurityWarnings();
    setSecurityWarnings(warnings);
    setIsSecure(warnings.length === 0);
  }, []);

  const getSecurityBadge = () => {
    if (isSecure) {
      return (
        <Badge 
          status="success" 
          text={
            <span className="security-badge">
              <ShieldCheckOutlined style={{ color: '#52c41a', marginRight: 4 }} />
              Kết nối bảo mật
            </span>
          }
        />
      );
    } else {
      return (
        <Badge 
          status="warning" 
          text={
            <span className="security-badge">
              <WarningOutlined style={{ color: '#faad14', marginRight: 4 }} />
              Cảnh báo bảo mật
            </span>
          }
        />
      );
    }
  };

  const getEncryptionIndicator = () => {
    return (
      <Tooltip title="Dữ liệu được mã hóa end-to-end với chuẩn AES-256">
        <span className="encryption-indicator">
          <LockOutlined style={{ color: '#1890ff', marginRight: 4 }} />
          Mã hóa AES-256
        </span>
      </Tooltip>
    );
  };

  return (
    <div className={`encryption-status ${className}`}>
      {showDetails && !isSecure && (
        <Alert
          message="Cảnh báo bảo mật"
          description={
            <ul>
              {securityWarnings.map((warning, index) => (
                <li key={index}>{warning}</li>
              ))}
            </ul>
          }
          type="warning"
          showIcon
          style={{ marginBottom: 16 }}
        />
      )}
      
      <div className="security-indicators">
        {getSecurityBadge()}
        {getEncryptionIndicator()}
      </div>
      
      {showDetails && isSecure && (
        <div className="security-details">
          <Alert
            message="Kết nối an toàn"
            description={
              <div>
                <p>✅ Kết nối HTTPS được mã hóa</p>
                <p>✅ Dữ liệu được bảo vệ bằng Envelope Encryption</p>
                <p>✅ Trình duyệt hỗ trợ Web Crypto API</p>
                <p>✅ Session được bảo mật</p>
              </div>
            }
            type="success"
            showIcon
          />
        </div>
      )}
    </div>
  );
};

export default EncryptionStatus;





























