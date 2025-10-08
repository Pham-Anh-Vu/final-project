import React from 'react';
import { Typography, Space } from 'antd';
import './ProfessionalHeader.css';

const { Title, Text } = Typography;

interface ProfessionalHeaderProps {
  icon?: React.ReactNode;
  title: string;
  subtitle?: string;
  children?: React.ReactNode;
  className?: string;
  variant?: 'primary' | 'secondary' | 'success' | 'warning' | 'info';
  size?: 'small' | 'medium' | 'large';
}

export const ProfessionalHeader: React.FC<ProfessionalHeaderProps> = ({
  icon,
  title,
  subtitle,
  children,
  className = '',
  variant = 'primary',
  size = 'large'
}) => {
  return (
    <div className={`professional-header professional-header--${variant} professional-header--${size} ${className}`}>
      {/* Background Pattern */}
      <div className="professional-header__pattern"></div>
      
      {/* Gradient Overlay */}
      <div className="professional-header__gradient"></div>
      
      {/* Content */}
      <div className="professional-header__content">
        <div className="professional-header__main">
          <Space align="center" size={16}>
            {icon && (
              <div className="professional-header__icon">
                {icon}
              </div>
            )}
            <div className="professional-header__text">
              <Title level={size === 'small' ? 3 : size === 'medium' ? 2 : 1} className="professional-header__title">
                {title}
              </Title>
              {subtitle && (
                <Text className="professional-header__subtitle">
                  {subtitle}
                </Text>
              )}
            </div>
          </Space>
        </div>
        
        {children && (
          <div className="professional-header__extra">
            {children}
          </div>
        )}
      </div>
      
      {/* Decorative Elements */}
      <div className="professional-header__decoration professional-header__decoration--1"></div>
      <div className="professional-header__decoration professional-header__decoration--2"></div>
      <div className="professional-header__decoration professional-header__decoration--3"></div>
    </div>
  );
};

export default ProfessionalHeader;














