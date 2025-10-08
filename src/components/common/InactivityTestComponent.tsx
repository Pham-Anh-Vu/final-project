import React, { useState } from 'react';
import { Button, Card, Typography, Space } from 'antd';
import { useInactivityDetector } from '../../hooks/useInactivityDetector';

const { Title, Text } = Typography;

interface InactivityTestComponentProps {
  testMode?: boolean; // true = 10 seconds, false = 3 minutes
}

export const InactivityTestComponent: React.FC<InactivityTestComponentProps> = ({ 
  testMode = true 
}) => {
  const [showTestModal, setShowTestModal] = useState(false);
  const [lastActivity, setLastActivity] = useState<Date>(new Date());

  // For testing: 10 seconds, for production: 3 minutes
  const TIMEOUT = testMode ? 10 * 1000 : 3 * 60 * 1000;

  const handleInactivity = () => {
    setShowTestModal(true);
  };

  const { resetInactivityTimer } = useInactivityDetector({
    onInactive: handleInactivity,
    delay: TIMEOUT,
    events: [
      'mousedown',
      'mousemove',
      'keypress',
      'scroll',
      'touchstart',
      'click',
      'wheel'
    ]
  });

  const handleActivity = () => {
    setLastActivity(new Date());
    if (showTestModal) {
      setShowTestModal(false);
    }
    resetInactivityTimer();
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('vi-VN');
  };

  return (
    <Card 
      title="🧪 Test Inactivity Detection" 
      style={{ maxWidth: 500, margin: '20px auto' }}
      size="small"
    >
      <Space direction="vertical" style={{ width: '100%' }}>
        <div>
          <Text strong>Thời gian timeout: </Text>
          <Text type="warning">
            {testMode ? '10 giây' : '3 phút'}
          </Text>
        </div>
        
        <div>
          <Text strong>Hoạt động cuối: </Text>
          <Text>{formatTime(lastActivity)}</Text>
        </div>

        <div>
          <Text strong>Trạng thái: </Text>
          <Text type={showTestModal ? 'danger' : 'success'}>
            {showTestModal ? '❌ Không hoạt động - Modal hiện' : '✅ Đang hoạt động'}
          </Text>
        </div>

        <Space>
          <Button type="primary" onClick={handleActivity}>
            Tạo hoạt động
          </Button>
          <Button onClick={() => setShowTestModal(false)} disabled={!showTestModal}>
            Đóng modal test
          </Button>
        </Space>

        <div style={{ padding: '10px', background: '#f6f6f6', borderRadius: '4px' }}>
          <Text type="secondary" style={{ fontSize: '12px' }}>
            💡 <strong>Hướng dẫn test:</strong><br/>
            1. Ngừng di chuyển chuột và không click gì trong {testMode ? '10 giây' : '3 phút'}<br/>
            2. Modal cảnh báo sẽ xuất hiện<br/>
            3. Click "Tạo hoạt động" để reset timer
          </Text>
        </div>
      </Space>

      {showTestModal && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(0,0,0,0.5)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000
        }}>
          <Card 
            title="🚨 Test Modal - Phát hiện không hoạt động" 
            style={{ width: 400 }}
            actions={[
              <Button key="activity" type="primary" onClick={handleActivity}>
                Tôi vẫn ở đây
              </Button>
            ]}
          >
            <Text>
              Bạn đã không hoạt động trong {testMode ? '10 giây' : '3 phút'}. 
              Trong ứng dụng thật, đây sẽ là modal đăng xuất.
            </Text>
          </Card>
        </div>
      )}
    </Card>
  );
};

export default InactivityTestComponent;














