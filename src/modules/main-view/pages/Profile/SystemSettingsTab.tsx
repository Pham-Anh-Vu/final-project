import React from 'react';
import { Row, Col, Card, Switch, Select, Typography, message } from 'antd';
import { BellOutlined, MobileOutlined } from '@ant-design/icons';
import { ProfileResponse, useUpdateSystemSettingsMutation } from '../../../../service/profile.api';

const { Title, Text } = Typography;
const { Option } = Select;

interface SystemSettingsTabProps {
  profile: ProfileResponse;
  refetch: () => void;
}

export const SystemSettingsTab: React.FC<SystemSettingsTabProps> = ({ profile, refetch }) => {
  const [updateSystemSettings, { isLoading }] = useUpdateSystemSettingsMutation();

  const handleSettingsChange = async (field: string, value: any) => {
    try {
      const newSettings = { ...profile.systemSettings, [field]: value };
      await updateSystemSettings(newSettings).unwrap();
      message.success('Cập nhật cài đặt thành công!');
      refetch();
    } catch (error: any) {
      message.error(error?.data?.message || 'Cập nhật cài đặt thất bại!');
    }
  };

  return (
    <div>
      <Title level={4}>Cài đặt hệ thống</Title>

      <Card title="Hiển thị & Ngôn ngữ" size="small" className="settings-card">
        <Row gutter={[16, 16]}>
          <Col xs={24} md={8}>
            <div className="setting-item">
              <Text strong>Ngôn ngữ</Text>
              <Select 
                value={profile.systemSettings.language}
                onChange={(value) => handleSettingsChange('language', value)}
                style={{ width: 120 }}
              >
                <Option value="vi-VN">Tiếng Việt</Option>
                <Option value="en-US">English</Option>
              </Select>
            </div>
          </Col>
          <Col xs={24} md={8}>
            <div className="setting-item">
              <Text strong>Múi giờ</Text>
              <Select 
                value={profile.systemSettings.timezone}
                onChange={(value) => handleSettingsChange('timezone', value)}
                style={{ width: 150 }}
              >
                <Option value="Asia/Ho_Chi_Minh">Hồ Chí Minh</Option>
                <Option value="Asia/Bangkok">Bangkok</Option>
                <Option value="Asia/Singapore">Singapore</Option>
              </Select>
            </div>
          </Col>
          <Col xs={24} md={8}>
            <div className="setting-item">
              <Text strong>Tiền tệ</Text>
              <Select 
                value={profile.systemSettings.currency}
                onChange={(value) => handleSettingsChange('currency', value)}
                style={{ width: 100 }}
              >
                <Option value="VND">VND (₫)</Option>
                <Option value="USD">USD ($)</Option>
              </Select>
            </div>
          </Col>
        </Row>

        <Row gutter={[16, 16]} style={{ marginTop: 16 }}>
          <Col xs={24} md={12}>
            <div className="setting-item">
              <Text strong>Giao diện</Text>
              <Select 
                value={profile.systemSettings.theme}
                onChange={(value) => handleSettingsChange('theme', value)}
                style={{ width: 120 }}
              >
                <Option value="light">Sáng</Option>
                <Option value="dark">Tối</Option>
                <Option value="auto">Tự động</Option>
              </Select>
            </div>
          </Col>
          <Col xs={24} md={12}>
            <div className="setting-item">
              <span>
                <Text strong>Chế độ tối</Text>
                <Switch 
                  checked={profile.systemSettings.darkMode}
                  onChange={(checked) => handleSettingsChange('darkMode', checked)}
                  loading={isLoading}
                />
              </span>
            </div>
          </Col>
        </Row>
      </Card>

      <Card title="Thông báo" size="small" className="settings-card">
        <Row gutter={[16, 16]}>
          <Col xs={24} md={12}>
            <div className="setting-item">
              <span>
                <BellOutlined /> <Text strong>Email thông báo</Text>
                <Switch 
                  checked={profile.systemSettings.emailNotifications}
                  onChange={(checked) => handleSettingsChange('emailNotifications', checked)}
                  loading={isLoading}
                />
              </span>
            </div>
          </Col>
          <Col xs={24} md={12}>
            <div className="setting-item">
              <span>
                <MobileOutlined /> <Text strong>SMS thông báo</Text>
                <Switch 
                  checked={profile.systemSettings.smsNotifications}
                  onChange={(checked) => handleSettingsChange('smsNotifications', checked)}
                  loading={isLoading}
                />
              </span>
            </div>
          </Col>
          <Col xs={24} md={12}>
            <div className="setting-item">
              <span>
                <Text strong>Thông báo push</Text>
                <Switch 
                  checked={profile.systemSettings.pushNotifications}
                  onChange={(checked) => handleSettingsChange('pushNotifications', checked)}
                  loading={isLoading}
                />
              </span>
            </div>
          </Col>
          <Col xs={24} md={12}>
            <div className="setting-item">
              <span>
                <Text strong>Cảnh báo giao dịch</Text>
                <Switch 
                  checked={profile.systemSettings.transactionAlerts}
                  onChange={(checked) => handleSettingsChange('transactionAlerts', checked)}
                  loading={isLoading}
                />
              </span>
            </div>
          </Col>
          <Col xs={24} md={12}>
            <div className="setting-item">
              <span>
                <Text strong>Cảnh báo đăng nhập</Text>
                <Switch 
                  checked={profile.systemSettings.loginAlerts}
                  onChange={(checked) => handleSettingsChange('loginAlerts', checked)}
                  loading={isLoading}
                />
              </span>
            </div>
          </Col>
          <Col xs={24} md={12}>
            <div className="setting-item">
              <span>
                <Text strong>Email marketing</Text>
                <Switch 
                  checked={profile.systemSettings.marketingEmails}
                  onChange={(checked) => handleSettingsChange('marketingEmails', checked)}
                  loading={isLoading}
                />
              </span>
            </div>
          </Col>
        </Row>
      </Card>
    </div>
  );
};

