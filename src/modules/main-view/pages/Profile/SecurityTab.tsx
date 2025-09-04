import React, { useState } from 'react';
import { Row, Col, Card, Switch, Progress, Alert, Typography, Tag, Button, Modal, Form, Input, message } from 'antd';
import {  LockOutlined, GlobalOutlined, SafetyOutlined, QrcodeOutlined } from '@ant-design/icons';
import { ProfileResponse, useUpdateSecuritySettingsMutation, useChangePasswordMutation, useToggle2FAMutation } from '../../../../service/profile.api';

const { Title, Text, Paragraph } = Typography;

interface SecurityTabProps {
  profile: ProfileResponse;
  refetch: () => void;
}

export const SecurityTab: React.FC<SecurityTabProps> = ({ profile, refetch }) => {
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [show2FAModal, setShow2FAModal] = useState(false);
  const [qrCodeUrl, setQrCodeUrl] = useState('');
  const [passwordForm] = Form.useForm();

  const [updateSecuritySettings, { isLoading: isUpdatingSecurity }] = useUpdateSecuritySettingsMutation();
  const [changePassword, { isLoading: isChangingPassword }] = useChangePasswordMutation();
  const [toggle2FA, { isLoading: isToggling2FA }] = useToggle2FAMutation();

  const getSecurityScore = () => {
    let score = 0;
    if (profile.securitySettings.twoFactorEnabled) score += 25;
    if (profile.securitySettings.biometricEnabled) score += 20;
    if (profile.securitySettings.sessionTimeout) score += 15;
    if (profile.securitySettings.transactionLimits) score += 15;
    if (profile.securitySettings.ipWhitelisting) score += 25;
    return score;
  };

  const handleSecuritySettingsChange = async (field: string, value: any) => {
    try {
      const newSettings = { ...profile.securitySettings, [field]: value };
      await updateSecuritySettings(newSettings).unwrap();
      message.success('Cập nhật bảo mật thành công!');
      refetch();
    } catch (error: any) {
      message.error(error?.data?.message || 'Cập nhật bảo mật thất bại!');
    }
  };

  const handlePasswordChange = async () => {
    try {
      const values = await passwordForm.validateFields();
      await changePassword({
        currentPassword: values.currentPassword,
        newPassword: values.newPassword
      }).unwrap();
      message.success('Đổi mật khẩu thành công!');
      setShowPasswordModal(false);
      passwordForm.resetFields();
    } catch (error: any) {
      message.error(error?.data?.message || 'Đổi mật khẩu thất bại!');
    }
  };

  const handle2FAToggle = async (enabled: boolean) => {
    try {
      const result = await toggle2FA({ enabled }).unwrap();
      if (enabled && result.data) {
        setQrCodeUrl(result.data);
        setShow2FAModal(true);
      }
      message.success(enabled ? 'Kích hoạt 2FA thành công!' : 'Vô hiệu hóa 2FA thành công!');
      refetch();
    } catch (error: any) {
      message.error(error?.data?.message || 'Cập nhật 2FA thất bại!');
    }
  };

  const securityScore = getSecurityScore();

  return (
    <div>
      <Title level={4}>Cài đặt bảo mật</Title>
      
      {/* Security Score */}
      <Card className="security-score-card">
        <Row align="middle" gutter={16}>
          <Col>
            <Progress 
              type="circle" 
              percent={securityScore}
              strokeColor={{ '0%': '#108ee9', '100%': '#87d068' }}
              format={() => `${securityScore}%`}
            />
          </Col>
          <Col flex="1">
            <Title level={5} style={{ margin: 0, color: 'white' }}>
              Điểm bảo mật: <span style={{ 
                color: securityScore >= 80 ? '#52c41a' : securityScore >= 60 ? '#faad14' : '#f5222d' 
              }}>
                {securityScore >= 80 ? 'Cao' : securityScore >= 60 ? 'Trung bình' : 'Thấp'}
              </span>
            </Title>
            <Paragraph style={{ color: 'rgba(255, 255, 255, 0.8)', margin: 0 }}>
              Mức độ bảo mật tài khoản dựa trên các cài đặt đã kích hoạt
            </Paragraph>
          </Col>
        </Row>
      </Card>

      {/* Authentication Settings */}
      <Card title="Xác thực" size="small" className="settings-card">
        <div className="setting-item-large">
          <div>
            <SafetyOutlined style={{ color: '#52c41a', marginRight: 8 }} />
            <Text strong>Xác thực hai yếu tố (2FA)</Text>
            <div><Text type="secondary">Tăng cường bảo mật với mã xác thực từ ứng dụng</Text></div>
          </div>
          <Switch 
            checked={profile.securitySettings.twoFactorEnabled}
            onChange={handle2FAToggle}
            loading={isToggling2FA}
          />
        </div>
        
        <div className="setting-item-large">
          <div>
            <Text strong>Xác thực sinh trắc học</Text>
            <div><Text type="secondary">Sử dụng vân tay hoặc khuôn mặt để đăng nhập</Text></div>
          </div>
          <Switch 
            checked={profile.securitySettings.biometricEnabled}
            onChange={(checked) => handleSecuritySettingsChange('biometricEnabled', checked)}
            loading={isUpdatingSecurity}
          />
        </div>
      </Card>

      {/* Session & Access */}
      <Card title="Phiên làm việc & Truy cập" size="small" className="settings-card">
        <div className="setting-item-large">
          <div>
            <Text strong>Tự động đăng xuất</Text>
            <div><Text type="secondary">Đăng xuất tự động khi không hoạt động</Text></div>
          </div>
          <Switch 
            checked={profile.securitySettings.sessionTimeout}
            onChange={(checked) => handleSecuritySettingsChange('sessionTimeout', checked)}
            loading={isUpdatingSecurity}
          />
        </div>
        
        <div className="setting-item-large">
          <div>
            <GlobalOutlined style={{ marginRight: 8 }} />
            <Text strong>Danh sách IP trắng</Text>
            <div><Text type="secondary">Chỉ cho phép truy cập từ IP đã được phê duyệt</Text></div>
          </div>
          <Switch 
            checked={profile.securitySettings.ipWhitelisting}
            onChange={(checked) => handleSecuritySettingsChange('ipWhitelisting', checked)}
            loading={isUpdatingSecurity}
          />
        </div>
        
        <div className="setting-item-large">
          <div>
            <Text strong>Giới hạn giao dịch</Text>
            <div><Text type="secondary">Áp dụng giới hạn cho các giao dịch lớn</Text></div>
          </div>
          <Switch 
            checked={profile.securitySettings.transactionLimits}
            onChange={(checked) => handleSecuritySettingsChange('transactionLimits', checked)}
            loading={isUpdatingSecurity}
          />
        </div>
      </Card>

      {/* Password & Encryption */}
      <Card title="Mật khẩu & Mã hóa" size="small" className="settings-card">
        <div className="setting-item-large">
          <div>
            <LockOutlined style={{ marginRight: 8 }} />
            <Text strong>Thay đổi mật khẩu</Text>
            <div>
              <Text type="secondary">
                Lần thay đổi cuối: {profile.securitySettings.lastPasswordChange ? 
                  new Date(profile.securitySettings.lastPasswordChange).toLocaleDateString('vi-VN') : 
                  'Chưa có'}
              </Text>
            </div>
          </div>
          <Button onClick={() => setShowPasswordModal(true)}>Đổi mật khẩu</Button>
        </div>
        
        <div className="setting-item-large">
          <div>
            <SafetyOutlined style={{ color: '#52c41a', marginRight: 8 }} />
            <Text strong>Trạng thái mã hóa</Text>
            <div><Text type="secondary">{profile.securitySettings.encryptionStatus}</Text></div>
          </div>
          <Tag color="green">Đã kích hoạt</Tag>
        </div>
      </Card>

      {/* Security Status */}
      <Alert
        message="Thông tin bảo mật"
        description={
          <div>
            <Text>Số lần đăng nhập thất bại: <Text strong>{profile.securitySettings.loginAttempts}</Text></Text><br/>
            <Text>Trạng thái tài khoản: <Text strong style={{ color: profile.securitySettings.accountLocked ? '#f5222d' : '#52c41a' }}>
              {profile.securitySettings.accountLocked ? 'Bị khóa' : 'Hoạt động bình thường'}
            </Text></Text>
          </div>
        }
        type={profile.securitySettings.accountLocked ? "error" : "info"}
        showIcon
      />

      {/* Change Password Modal */}
      <Modal
        title="Thay đổi mật khẩu"
        open={showPasswordModal}
        onCancel={() => {
          setShowPasswordModal(false);
          passwordForm.resetFields();
        }}
        footer={[
          <Button key="cancel" onClick={() => setShowPasswordModal(false)}>Hủy</Button>,
          <Button key="submit" type="primary" loading={isChangingPassword} onClick={handlePasswordChange}>
            Đổi mật khẩu
          </Button>
        ]}
      >
        <Form form={passwordForm} layout="vertical">
          <Form.Item 
            label="Mật khẩu hiện tại" 
            name="currentPassword"
            rules={[{ required: true, message: 'Vui lòng nhập mật khẩu hiện tại!' }]}
          >
            <Input.Password size="large" />
          </Form.Item>
          <Form.Item 
            label="Mật khẩu mới" 
            name="newPassword"
            rules={[
              { required: true, message: 'Vui lòng nhập mật khẩu mới!' },
            ]}
          >
            <Input.Password size="large" />
          </Form.Item>
          <Form.Item 
            label="Xác nhận mật khẩu mới" 
            name="confirmPassword"
            dependencies={['newPassword']}
            rules={[
              { required: true, message: 'Vui lòng xác nhận mật khẩu!' },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue('newPassword') === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error('Mật khẩu xác nhận không khớp!'));
                },
              }),
            ]}
          >
            <Input.Password size="large" />
          </Form.Item>
        </Form>
      </Modal>

      {/* 2FA Modal */}
      <Modal
        title="Kích hoạt xác thực hai yếu tố"
        open={show2FAModal}
        onCancel={() => setShow2FAModal(false)}
        footer={[
          <Button key="done" type="primary" onClick={() => setShow2FAModal(false)}>
            Hoàn thành
          </Button>
        ]}
      >
        <div style={{ textAlign: 'center' }}>
          <QrcodeOutlined style={{ fontSize: '48px', color: '#1890ff', marginBottom: 16 }} />
          <Title level={4}>Quét mã QR bằng ứng dụng Google Authenticator</Title>
          <div style={{ background: '#f5f5f5', padding: '16px', borderRadius: '8px', margin: '16px 0' }}>
            <Text code>{qrCodeUrl}</Text>
          </div>
          <Paragraph type="secondary">
            Sau khi quét mã, hãy nhập mã 6 số từ ứng dụng để hoàn tất việc kích hoạt 2FA
          </Paragraph>
        </div>
      </Modal>
    </div>
  );
};

