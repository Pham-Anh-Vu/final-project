import React, { useState } from 'react';
import { Card, Typography, Space, Button, Select, Alert, Descriptions, Badge, Divider } from 'antd';
import { UserOutlined, CrownOutlined, TeamOutlined } from '@ant-design/icons';
import { 
  useCurrentUser, 
  getAllowedMenuItems, 
  isRegularUser, 
  isPrivilegedUser,
  USER_ROLES,
  MENU_PERMISSIONS 
} from '../../utils/roleUtils';
import { useAppSelector } from '../../hooks/hooks';

const { Title, Text, Paragraph } = Typography;
const { Option } = Select;

interface MockUser {
  name: string;
  roles: string[];
  description: string;
  color: string;
  icon: React.ReactNode;
}

export const RoleMenuTestComponent: React.FC = () => {
  const [selectedMockRole, setSelectedMockRole] = useState<string>('');
  const currentUser = useCurrentUser();
  const auth = useAppSelector((state) => state.auth);

  // Mock users với các role khác nhau
  const mockUsers: Record<string, MockUser> = {
    regular: {
      name: "Nguyễn Văn A (User thường)",
      roles: [USER_ROLES.USER],
      description: "User thường - chỉ có quyền cơ bản",
      color: "#52c41a",
      icon: <UserOutlined />
    },
    admin: {
      name: "Trần Thị B (Admin)",
      roles: [USER_ROLES.ADMIN],
      description: "Quản trị viên - có quyền cao nhất",
      color: "#f5222d",
      icon: <CrownOutlined />
    },
    gdv: {
      name: "Lê Văn C (GDV)",
      roles: [USER_ROLES.GDV],
      description: "Giám đốc vùng - có quyền quản lý vùng",
      color: "#fa8c16",
      icon: <TeamOutlined />
    },
    ksv: {
      name: "Phạm Thị D (KSV)",
      roles: [USER_ROLES.KSV],
      description: "Kinh doanh vùng - có quyền kinh doanh",
      color: "#1890ff",
      icon: <UserOutlined />
    },
    noRole: {
      name: "Khách E (Không có role)",
      roles: [],
      description: "User không có role cụ thể",
      color: "#d9d9d9",
      icon: <UserOutlined />
    }
  };

  // Lấy thông tin user hiện tại hoặc mock user
  const getTestUserRoles = (): string[] => {
    if (selectedMockRole && mockUsers[selectedMockRole]) {
      return mockUsers[selectedMockRole].roles;
    }
    return currentUser?.roles || [];
  };

  const testRoles = getTestUserRoles();
  const allowedMenuItems = getAllowedMenuItems(testRoles);
  const isRegular = isRegularUser(testRoles);
  const isPrivileged = isPrivilegedUser(testRoles);

  // Mapping menu items thành tiếng Việt
  const menuItemLabels: Record<string, string> = {
    [MENU_PERMISSIONS.DASHBOARD]: "📊 Dashboard",
    [MENU_PERMISSIONS.CUSTOMERS]: "👥 Khách hàng",
    [MENU_PERMISSIONS.BILLING]: "💳 Billing",
    [MENU_PERMISSIONS.INTEREST_PACKAGES]: "📦 Gói lãi suất",
    [MENU_PERMISSIONS.DEPOSITS]: "💰 Tiền gửi",
    [MENU_PERMISSIONS.PENDING_TASKS]: "⏳ Tác vụ chờ duyệt",
    [MENU_PERMISSIONS.PROFILE]: "👤 Profile",
    [MENU_PERMISSIONS.LOGOUT]: "🚪 Log Out",
    [MENU_PERMISSIONS.RTL]: "🔄 RTL",
    [MENU_PERMISSIONS.ENCRYPTION_DEMO]: "🔐 Demo Mã Hóa"
  };

  return (
    <Card 
      title="🧪 Test Role-Based Menu Visibility" 
      style={{ maxWidth: 900, margin: '20px auto' }}
    >
      <Space direction="vertical" style={{ width: '100%' }} size="large">
        {/* Hướng dẫn */}
        <Alert
          message="Hướng dẫn sử dụng"
          description={
            <div>
              <p>• Component này test việc hiển thị menu dựa trên role của user</p>
              <p>• Chọn mock user để xem menu tương ứng với từng role</p>
              <p>• <strong>User thường:</strong> Dashboard, Billing, Tiền gửi, Profile, Log Out</p>
              <p>• <strong>Các role khác (ADMIN, GDV, KSV):</strong> Tất cả menu trừ RTL và Demo Mã Hóa</p>
            </div>
          }
          type="info"
          showIcon
        />

        {/* Current User Info */}
        <Card title="📋 Thông tin User hiện tại" size="small">
          <Descriptions column={1} size="small">
            <Descriptions.Item label="Username">
              {currentUser?.username || 'Chưa đăng nhập'}
            </Descriptions.Item>
            <Descriptions.Item label="Full Name">
              {currentUser?.fullName || 'N/A'}
            </Descriptions.Item>
            <Descriptions.Item label="Roles">
              {currentUser?.roles?.length ? (
                currentUser.roles.map(role => (
                  <Badge key={role} color="blue" text={role} style={{ marginRight: 8 }} />
                ))
              ) : (
                <Text type="secondary">Không có role</Text>
              )}
            </Descriptions.Item>
            <Descriptions.Item label="Token Status">
              <Badge 
                status={auth.isAuthenticated ? "success" : "error"} 
                text={auth.isAuthenticated ? "Đã đăng nhập" : "Chưa đăng nhập"} 
              />
            </Descriptions.Item>
          </Descriptions>
        </Card>

        {/* Mock User Selector */}
        <Card title="🎭 Test với Mock Users" size="small">
          <Space direction="vertical" style={{ width: '100%' }}>
            <div>
              <Text strong>Chọn user để test:</Text>
              <Select
                style={{ width: '100%', marginTop: 8 }}
                placeholder="Chọn mock user hoặc dùng user hiện tại"
                value={selectedMockRole}
                onChange={setSelectedMockRole}
                allowClear
              >
                {Object.entries(mockUsers).map(([key, user]) => (
                  <Option key={key} value={key}>
                    <Space>
                      {user.icon}
                      {user.name}
                      <Badge color={user.color} text={`${user.roles.length} role(s)`} />
                    </Space>
                  </Option>
                ))}
              </Select>
            </div>

            {selectedMockRole && (
              <Alert
                message={mockUsers[selectedMockRole].name}
                description={
                  <div>
                    <p>{mockUsers[selectedMockRole].description}</p>
                    <p><strong>Roles:</strong> {mockUsers[selectedMockRole].roles.join(', ') || 'Không có'}</p>
                  </div>
                }
                type="success"
                showIcon
              />
            )}
          </Space>
        </Card>

        <Divider />

        {/* Test Results */}
        <Card title="📊 Kết quả Test" size="small">
          <Space direction="vertical" style={{ width: '100%' }}>
            <div>
              <Text strong>Roles được test: </Text>
              {testRoles.length ? (
                testRoles.map(role => (
                  <Badge key={role} color="blue" text={role} style={{ marginRight: 8 }} />
                ))
              ) : (
                <Badge color="default" text="Không có role" />
              )}
            </div>

            <div>
              <Text strong>Phân loại user: </Text>
              <Badge 
                color={isRegular ? "green" : "orange"} 
                text={isRegular ? "User thường" : "Privileged User"} 
              />
            </div>

            <div>
              <Text strong>Menu items được phép truy cập:</Text>
              <div style={{ marginTop: 8, display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                {allowedMenuItems.map(item => (
                  <Badge 
                    key={item} 
                    color="green" 
                    text={menuItemLabels[item] || item}
                  />
                ))}
              </div>
            </div>

            <div>
              <Text strong>Menu items bị ẩn:</Text>
              <div style={{ marginTop: 8, display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                {Object.values(MENU_PERMISSIONS)
                  .filter(item => !allowedMenuItems.includes(item))
                  .map(item => (
                    <Badge 
                      key={item} 
                      color="red" 
                      text={menuItemLabels[item] || item}
                    />
                  ))}
              </div>
            </div>
          </Space>
        </Card>

        {/* Summary */}
        <Card title="📝 Tóm tắt Logic" size="small">
          <Descriptions column={1} bordered size="small">
            <Descriptions.Item label="User thường (USER hoặc không có role)">
              Dashboard, Billing, Tiền gửi, Profile, Log Out
            </Descriptions.Item>
            <Descriptions.Item label="Privileged users (ADMIN, GDV, KSV)">
              Tất cả menu trừ RTL và Demo Mã Hóa
            </Descriptions.Item>
            <Descriptions.Item label="Menu luôn bị ẩn">
              RTL, Demo Mã Hóa
            </Descriptions.Item>
          </Descriptions>
        </Card>

        {/* Quick Test Buttons */}
        <Card title="⚡ Quick Tests" size="small">
          <Space wrap>
            <Button 
              type="primary" 
              onClick={() => setSelectedMockRole('regular')}
              icon={<UserOutlined />}
            >
              Test User thường
            </Button>
            <Button 
              type="primary" 
              onClick={() => setSelectedMockRole('admin')}
              icon={<CrownOutlined />}
            >
              Test Admin
            </Button>
            <Button 
              type="primary" 
              onClick={() => setSelectedMockRole('gdv')}
              icon={<TeamOutlined />}
            >
              Test GDV
            </Button>
            <Button 
              type="primary" 
              onClick={() => setSelectedMockRole('ksv')}
              icon={<UserOutlined />}
            >
              Test KSV
            </Button>
            <Button 
              onClick={() => setSelectedMockRole('')}
            >
              Dùng user hiện tại
            </Button>
          </Space>
        </Card>
      </Space>
    </Card>
  );
};

export default RoleMenuTestComponent;
