import { useKeycloak } from '@react-keycloak/web';
import { Button, Modal } from 'antd';
import React from 'react';
import { useAppDispatch, useAppSelector } from '../../../hooks/hooks';
import { logout } from '../../../shared/reducers/authSlice';

interface NotificationLogOutProps {
    onConfirm?: () => void;
    visible?: boolean;
    onCancel?: () => void;
}

const NotificationLogOut: React.FC<NotificationLogOutProps> = ({ 
    onConfirm, 
    visible = true, 
    onCancel 
}) => {
    const auth = useAppSelector((state) => state.auth);
    const dispatch = useAppDispatch();

    const handleConfirm = () => {
        dispatch(logout());
        // Clear any stored tokens or user data
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        sessionStorage.clear();
        
        if (onConfirm) {
            onConfirm();
        }
        
        // Redirect to login page or refresh
        window.location.href = '/login';
    };

    const handleCancel = () => {
        if (onCancel) {
            onCancel();
        }
    };

    return (
        <Modal
            title="⚠️ Cảnh báo phiên làm việc"
            open={visible}
            footer={null}
            centered
            width={450}
            className="notification-log-out-modal"
            maskClosable={false}
            closable={false}
            bodyStyle={{ textAlign: 'center', padding: '30px' }}
            destroyOnClose={true}
        >
            <div style={{ marginBottom: '20px' }}>
                <p style={{ fontSize: '16px', marginBottom: '15px' }}>
                    Phiên làm việc của bạn đã hết hạn do không hoạt động trong 3 phút.
                </p>
                <p style={{ fontSize: '14px', color: '#666' }}>
                    Vui lòng xác nhận để đăng xuất và đăng nhập lại để tiếp tục sử dụng.
                </p>
            </div>
            
            <div style={{ textAlign: 'center', display: 'flex', gap: '10px', justifyContent: 'center' }}>
                <Button 
                    type="primary" 
                    danger
                    onClick={handleConfirm}
                    style={{ minWidth: '120px' }}
                >
                    Xác nhận đăng xuất
                </Button>
            </div>
        </Modal>
    );
};

export default NotificationLogOut;