import React from 'react';
import { Row, Col, Card, Avatar, Badge, Tag, Statistic, Typography } from 'antd';
import { UserOutlined, SafetyOutlined } from '@ant-design/icons';
import { ProfileResponse } from '../../../../service/profile.api';

const { Title, Text } = Typography;

interface ProfileHeaderProps {
  profile: ProfileResponse;
}

export const ProfileHeader: React.FC<ProfileHeaderProps> = ({ profile }) => {
  const getSecurityScore = () => {
    let score = 0;
    if (profile.securitySettings.twoFactorEnabled) score += 25;
    if (profile.securitySettings.biometricEnabled) score += 20;
    if (profile.securitySettings.sessionTimeout) score += 15;
    if (profile.securitySettings.transactionLimits) score += 15;
    if (profile.securitySettings.ipWhitelisting) score += 25;
    return score;
  };

  const securityScore = getSecurityScore();

  return (
    <Card className="profile-header" bordered={false}>
      <Row align="middle" gutter={[24, 16]}>
        <Col>
          <Badge 
            count={profile.securitySettings.twoFactorEnabled ? <SafetyOutlined style={{ color: '#52c41a' }} /> : 0}
            offset={[-8, 8]}
          >
            <Avatar 
              size={80} 
              icon={<UserOutlined />} 
              className="profile-avatar"
              style={{ backgroundColor: '#1890ff', border: '3px solid #f0f2f5' }}
            />
          </Badge>
        </Col>
        <Col flex="1">
          <Title level={3} style={{ margin: 0, color: '#ffffff' }}>
            {profile.fullName}
          </Title>
          <Text style={{ fontSize: '16px', color: 'rgba(255, 255, 255, 0.8)' }}>
            Mã khách hàng: <Text strong style={{ color: '#ffffff' }}>{profile.cusCode}</Text>
          </Text>
          <div style={{ marginTop: 8 }}>
            <Tag color="blue">Tài khoản cá nhân</Tag>
            <Tag color={profile.securitySettings.accountLocked ? 'red' : 'green'}>
              {profile.securitySettings.accountLocked ? 'Bị khóa' : 'Hoạt động'}
            </Tag>
          </div>
        </Col>
        <Col>
          <Statistic 
            title={<span style={{ color: 'rgba(255, 255, 255, 0.8)' }}>Bảo mật</span>}
            value={securityScore} 
            suffix="%" 
            valueStyle={{ 
              color: securityScore >= 80 ? '#52c41a' : securityScore >= 60 ? '#faad14' : '#f5222d',
              fontSize: '20px'
            }}
          />
        </Col>
      </Row>
    </Card>
  );
};

