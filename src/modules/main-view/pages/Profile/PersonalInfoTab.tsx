import React, { useState, useEffect } from 'react';
import { Row, Col, Card, Button, Form, Input, Divider, Statistic, Typography, message } from 'antd';
import { EditOutlined, SaveOutlined, UserOutlined, MobileOutlined, EyeInvisibleOutlined } from '@ant-design/icons';
import { ProfileResponse, useUpdatePersonalInfoMutation } from '../../../../service/profile.api';

const { Title } = Typography;

interface PersonalInfoTabProps {
  profile: ProfileResponse;
  refetch: () => void;
}

export const PersonalInfoTab: React.FC<PersonalInfoTabProps> = ({ profile, refetch }) => {
  const [editMode, setEditMode] = useState(false);
  const [form] = Form.useForm();
  const [updatePersonalInfo, { isLoading }] = useUpdatePersonalInfoMutation();

  useEffect(() => {
    form.setFieldsValue({
      fullName: profile.fullName,
      email: profile.email.includes('****') ? '' : profile.email,
      phone: profile.phone.includes('****') ? '' : profile.phone,
      identityNo: profile.identityNo?.includes('****') ? '' : profile.identityNo,
    });
  }, [profile, form]);

  const handleSave = async () => {
    try {
      const values = await form.validateFields();
      await updatePersonalInfo(values).unwrap();
      message.success('Cập nhật thông tin thành công!');
      setEditMode(false);
      refetch();
    } catch (error: any) {
      message.error(error?.data?.message || 'Cập nhật thông tin thất bại!');
    }
  };

  return (
    <div>
      <div className="section-header">
        <Title level={4}>Thông tin cá nhân</Title>
        <Button 
          type={editMode ? 'primary' : 'default'}
          icon={editMode ? <SaveOutlined /> : <EditOutlined />}
          onClick={editMode ? handleSave : () => setEditMode(true)}
          loading={isLoading}
        >
          {editMode ? 'Lưu thay đổi' : 'Chỉnh sửa'}
        </Button>
      </div>

      <Form form={form} layout="vertical" disabled={!editMode}>
        <Row gutter={[16, 16]}>
          <Col xs={24} md={12}>
            <Form.Item 
              label="Họ và tên" 
              name="fullName"
              rules={[{ required: true, message: 'Vui lòng nhập họ tên!' }]}
            >
              <Input size="large" prefix={<UserOutlined />} />
            </Form.Item>
          </Col>
          <Col xs={24} md={12}>
            <Form.Item 
              label="Email" 
              name="email"
              rules={[
                { required: true, message: 'Vui lòng nhập email!' },
                { type: 'email', message: 'Email không hợp lệ!' }
              ]}
            >
              <Input size="large" placeholder={profile.email} prefix={<UserOutlined />} />
            </Form.Item>
          </Col>
          <Col xs={24} md={12}>
            <Form.Item 
              label="Số điện thoại" 
              name="phone"
              rules={[
                { required: true, message: 'Vui lòng nhập số điện thoại!' },
                { pattern: /^(\+84|84|0)(3|5|7|8|9)[0-9]{8}$/, message: 'Số điện thoại không hợp lệ!' }
              ]}
            >
              <Input size="large" prefix={<MobileOutlined />} placeholder={profile.phone} />
            </Form.Item>
          </Col>
          <Col xs={24} md={12}>
            <Form.Item label="Số CMND/CCCD" name="identityNo">
              <Input size="large" placeholder={profile.identityNo || 'Chưa cập nhật'} prefix={<UserOutlined />} />
            </Form.Item>
          </Col>
        </Row>
      </Form>

      <Divider />
      
      <Title level={5}>Thông tin tài khoản</Title>
      <Row gutter={[16, 16]}>
        <Col xs={24} md={8}>
          <Card size="small" className="info-card">
            <Statistic 
              title="Số dư tài khoản" 
              value={profile.totalBalance}
              prefix={<EyeInvisibleOutlined />}
            />
          </Card>
        </Col>
        <Col xs={24} md={8}>
          <Card size="small" className="info-card">
            <Statistic 
              title="Ngày tham gia" 
              value={new Date(profile.createdAt).toLocaleDateString('vi-VN')}
            />
          </Card>
        </Col>
        <Col xs={24} md={8}>
          <Card size="small" className="info-card">
            <Statistic 
              title="Đăng nhập cuối" 
              value={profile.lastLogin ? new Date(profile.lastLogin).toLocaleDateString('vi-VN') : 'Chưa có'}
            />
          </Card>
        </Col>
      </Row>
    </div>
  );
};




















