import React, { useState } from 'react';
import { Card, Tabs } from 'antd';
import { UserOutlined, SettingOutlined, SecurityScanOutlined } from '@ant-design/icons';
import { PersonalInfoTab } from './PersonalInfoTab';
import { SystemSettingsTab } from './SystemSettingsTab';
import { SecurityTab } from './SecurityTab';
import { ProfileResponse } from '../../../../service/profile.api';

const { TabPane } = Tabs;

interface ProfileTabsProps {
  profile: ProfileResponse;
  refetch: () => void;
}

export const ProfileTabs: React.FC<ProfileTabsProps> = ({ profile, refetch }) => {
  const [activeTab, setActiveTab] = useState('personal');

  return (
    <Card bordered={false} className="profile-tabs">
      <Tabs activeKey={activeTab} onChange={setActiveTab} size="large">
        <TabPane 
          tab={<span><UserOutlined />Thông tin cá nhân</span>} 
          key="personal"
        >
          <PersonalInfoTab profile={profile} refetch={refetch} />
        </TabPane>

        <TabPane 
          tab={<span><SettingOutlined />Cài đặt hệ thống</span>} 
          key="system"
        >
          <SystemSettingsTab profile={profile} refetch={refetch} />
        </TabPane>

        <TabPane 
          tab={<span><SecurityScanOutlined />Bảo mật</span>} 
          key="security"
        >
          <SecurityTab profile={profile} refetch={refetch} />
        </TabPane>
      </Tabs>
    </Card>
  );
};

