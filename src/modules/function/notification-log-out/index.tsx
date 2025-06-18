import { useKeycloak } from '@react-keycloak/web';
import { Button, Modal } from 'antd';
import React from 'react';
import { useAppDispatch, useAppSelector } from '../../../hooks/hooks';

const NotificationLogOut = () => {
    const auth = useAppSelector((state) => state.auth);
    const dispatch = useAppDispatch();


    return (
        <Modal
            title="Thông báo đăng xuất"
            footer={null}
            centered
            width={400}
            className="notification-log-out-modal"
            style={{ top: '20vh' }}
            maskClosable={false}
            closable={false}
            bodyStyle={{ textAlign: 'center', padding: '20px' }}
            destroyOnClose={true}
        >
            <p>Phiên làm việc của bạn đã hết hạn do không hoạt động. Vui lòng đăng nhập lại để tiếp tục.</p>
            <div style={{ textAlign: 'center', marginTop: '20px' }}>
                <Button type="primary">
                    Xác nhận
                </Button>
            </div>
        </Modal>
    );
};

export default NotificationLogOut;