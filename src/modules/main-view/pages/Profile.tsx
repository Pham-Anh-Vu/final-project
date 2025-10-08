import React from 'react';
import { Card, Spin, Alert } from 'antd';
import { ProfileHeader } from './Profile/ProfileHeader';
import { ProfileTabs } from './Profile/ProfileTabs';
import { useProfileQuery } from '../../../service/profile.api';
import './Profile.css';

const Profile: React.FC = () => {
  const { data: profileData, isLoading, refetch } = useProfileQuery();
  const profile = profileData?.data;

  if (isLoading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '60vh' }}>
        <Spin size="large" />
      </div>
    );
  }

  if (!profile) {
    return (
      <Alert
        message="Không thể tải thông tin profile"
        description="Vui lòng thử lại sau"
        type="error"
        showIcon
      />
    );
  }

  return (
    <div className="profile-container">
      <ProfileHeader profile={profile} />
      <ProfileTabs profile={profile} refetch={refetch} />
    </div>
  );
};

export default Profile;





























