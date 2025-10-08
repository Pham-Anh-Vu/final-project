import React, { useEffect, useState } from 'react';
import {
  Modal,
  Card,
  Descriptions,
  Button,
  Space,
  Tag,
  Alert,
  Typography,
  Row,
  Col,
  Divider,
  message,
} from 'antd';
import {
  ExclamationCircleOutlined,
  CheckCircleOutlined,
  CloseCircleOutlined,
} from '@ant-design/icons';
import dayjs from 'dayjs';
import { useGetSavingAccountByIdQuery } from '../../../../service/customer.api';
import { useApproveEntityMutation, useCancelEntityMutation } from '../../../../service/approval.api';

const { Title, Text } = Typography;

interface AmlSavingAccountApprovalProps {
  visible: boolean;
  onClose: () => void;
  taskData?: {
    id: number;
    entityId: number;
    identifyId: number;
    menuMappingName: string;
    classCallBack: string;
    secretKey: string;
    taskAction: string;
    apprStatus: string;
    createdBy?: string;
    createdAt?: string;
    auditNumber?: string;
  };
  savingAccountData?: any;
}

const AmlSavingAccountApproval: React.FC<AmlSavingAccountApprovalProps> = ({
  visible,
  onClose,
  taskData,
  savingAccountData,
}) => {
  const [isApproving, setIsApproving] = useState(false);
  const [isRejecting, setIsRejecting] = useState(false);

  const [approveEntity] = useApproveEntityMutation();
  const [cancelEntity] = useCancelEntityMutation();
  
  // Fetch saving account details when modal opens
  const { 
    data: fetchedSavingAccountData, 
    isLoading: isFetchingAccount,
    error: fetchError 
  } = useGetSavingAccountByIdQuery(taskData?.entityId || 0, {
    skip: !visible || !taskData?.entityId,
  });
  
  // Use fetched data or fallback to props data
  const currentSavingAccountData = fetchedSavingAccountData || savingAccountData;

  // Handle approve
  const handleApprove = async () => {
    if (!taskData) return;

    setIsApproving(true);
    try {
      const approvalData = {
        delegateName: taskData.classCallBack,
        id: taskData.entityId,
      };

      await approveEntity(approvalData).unwrap();
      message.success('Phê duyệt tài khoản AML thành công');
      onClose();
    } catch (error: any) {
      console.error('Error approving AML account:', error);
      message.error(error?.data?.message || 'Có lỗi xảy ra khi phê duyệt');
    } finally {
      setIsApproving(false);
    }
  };

  // Handle reject
  const handleReject = async () => {
    if (!taskData) return;

    setIsRejecting(true);
    try {
      const rejectionData = {
        delegateName: taskData.classCallBack,
        id: taskData.entityId,
      };

      await cancelEntity(rejectionData).unwrap();
      message.success('Từ chối tài khoản AML thành công');
      onClose();
    } catch (error: any) {
      console.error('Error rejecting AML account:', error);
      message.error(error?.data?.message || 'Có lỗi xảy ra khi từ chối');
    } finally {
      setIsRejecting(false);
    }
  };

  const getRiskLevelColor = (level?: string) => {
    switch (level?.toUpperCase()) {
      case 'LOW': return 'green';
      case 'MEDIUM': return 'orange';
      case 'HIGH': return 'red';
      case 'CRITICAL': return 'purple';
      default: return 'default';
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
    }).format(amount);
  };

  return (
    <Modal
      title={
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <ExclamationCircleOutlined style={{ color: '#faad14', marginRight: 8 }} />
          <span>Phê duyệt tài khoản tiết kiệm AML</span>
        </div>
      }
      open={visible}
      onCancel={onClose}
      footer={null}
      width={800}
      maskClosable={false}
    >
      <div style={{ padding: '0 24px' }}>
        {/* Warning Alert */}
        <Alert
          message="Cảnh báo AML"
          description="Khách hàng này đã được phát hiện trong danh sách AML. Vui lòng xem xét kỹ lưỡng trước khi quyết định phê duyệt hay từ chối tài khoản tiết kiệm."
          type="warning"
          icon={<ExclamationCircleOutlined />}
          showIcon
          style={{ marginBottom: 24 }}
        />

        {/* Task Information */}
        <Card title="Thông tin yêu cầu" style={{ marginBottom: 24 }}>
          <Descriptions column={2} bordered size="small">
            <Descriptions.Item label="Mã audit">{taskData?.auditNumber}</Descriptions.Item>
            <Descriptions.Item label="Loại yêu cầu">{taskData?.menuMappingName}</Descriptions.Item>
            <Descriptions.Item label="Người tạo">{taskData?.createdBy}</Descriptions.Item>
            <Descriptions.Item label="Ngày tạo">
              {taskData?.createdAt ? dayjs(taskData.createdAt).format('DD/MM/YYYY HH:mm') : '-'}
            </Descriptions.Item>
            <Descriptions.Item label="Trạng thái" span={2}>
              <Tag color="orange">Chờ phê duyệt AML</Tag>
            </Descriptions.Item>
          </Descriptions>
        </Card>

        {/* Saving Account Information */}
        <Card title="Thông tin tài khoản tiết kiệm" style={{ marginBottom: 24 }}>
          {isFetchingAccount ? (
            <div style={{ textAlign: 'center', padding: '20px' }}>
              <Typography.Text>Đang tải thông tin tài khoản...</Typography.Text>
            </div>
          ) : fetchError ? (
            <Alert
              message="Lỗi tải dữ liệu"
              description="Không thể tải thông tin tài khoản tiết kiệm. Vui lòng thử lại."
              type="error"
              style={{ marginBottom: 16 }}
            />
          ) : currentSavingAccountData ? (
            <Descriptions column={2} bordered size="small">
              <Descriptions.Item label="Số tài khoản">
                <Text strong>{currentSavingAccountData.accountNumber}</Text>
              </Descriptions.Item>
              <Descriptions.Item label="Tên khách hàng">
                <Text strong>{currentSavingAccountData.customerName || '-'}</Text>
              </Descriptions.Item>
              <Descriptions.Item label="Mã khách hàng">{currentSavingAccountData.cusCode || '-'}</Descriptions.Item>
              <Descriptions.Item label="CMND/CCCD">{currentSavingAccountData.identityNo || '-'}</Descriptions.Item>
              <Descriptions.Item label="Loại gói tiết kiệm" span={2}>{currentSavingAccountData.depositTypeName}</Descriptions.Item>
              <Descriptions.Item label="Số tiền gửi">
                <Text strong style={{ color: '#1890ff' }}>
                  {formatCurrency(currentSavingAccountData.balance)}
                </Text>
              </Descriptions.Item>
              <Descriptions.Item label="Lãi suất">
                <Text strong style={{ color: '#52c41a' }}>
                  {currentSavingAccountData.interestRate}%/năm
                </Text>
              </Descriptions.Item>
              <Descriptions.Item label="Kỳ hạn">{currentSavingAccountData.term} tháng</Descriptions.Item>
              <Descriptions.Item label="Ngày đáo hạn">
                {dayjs(currentSavingAccountData.maturityDate).format('DD/MM/YYYY')}
              </Descriptions.Item>
              <Descriptions.Item label="Trạng thái" span={2}>
                <Tag color={currentSavingAccountData.status === 'ACTIVE' ? 'green' : 'orange'}>
                  {currentSavingAccountData.status === 'PENDING' ? 'Chờ phê duyệt' : 
                   currentSavingAccountData.status === 'ACTIVE' ? 'Đang hoạt động' : 
                   currentSavingAccountData.status}
                </Tag>
              </Descriptions.Item>
            </Descriptions>
          ) : (
            <Alert
              message="Không có dữ liệu"
              description="Không tìm thấy thông tin tài khoản tiết kiệm."
              type="warning"
            />
          )}
        </Card>

        {/* AML Risk Information */}
        <Card 
          title={
            <span style={{ color: '#faad14' }}>
              <ExclamationCircleOutlined style={{ marginRight: 8 }} />
              Thông tin rủi ro AML
            </span>
          } 
          style={{ marginBottom: 24 }}
        >
          <Alert
            message="Khách hàng này có thông tin trùng khớp với danh sách AML"
            description="Hệ thống đã phát hiện thông tin khách hàng (CMND/CCCD, số điện thoại hoặc email) trùng khớp với danh sách chống rửa tiền (AML). Vui lòng kiểm tra kỹ lưỡng và đưa ra quyết định phù hợp."
            type="error"
            showIcon
          />
        </Card>

        {/* Action Instructions */}
        <Card title="Hướng dẫn xử lý">
          <div style={{ marginBottom: 16 }}>
            <Title level={5}>Các bước kiểm tra cần thực hiện:</Title>
            <ol style={{ paddingLeft: 20 }}>
              <li>Xác minh danh tính khách hàng bằng các giấy tờ hợp lệ</li>
              <li>Kiểm tra nguồn gốc tài sản và mục đích gửi tiết kiệm</li>
              <li>Đối chiếu với các danh sách đen khác</li>
              <li>Liên hệ với khách hàng để làm rõ thông tin nếu cần</li>
              <li>Đưa ra quyết định cuối cùng dựa trên kết quả kiểm tra</li>
            </ol>
          </div>

          <div style={{ background: '#f6ffed', padding: 16, borderRadius: 8, border: '1px solid #b7eb8f' }}>
            <Text strong style={{ color: '#389e0d' }}>
              <CheckCircleOutlined style={{ marginRight: 8 }} />
              Phê duyệt:
            </Text>
            <div style={{ marginTop: 8 }}>
              Chọn "Phê duyệt" nếu sau khi kiểm tra, xác định khách hàng không có rủi ro AML và có thể mở tài khoản tiết kiệm.
            </div>
          </div>

          <div style={{ background: '#fff2f0', padding: 16, borderRadius: 8, border: '1px solid #ffccc7', marginTop: 16 }}>
            <Text strong style={{ color: '#cf1322' }}>
              <CloseCircleOutlined style={{ marginRight: 8 }} />
              Từ chối:
            </Text>
            <div style={{ marginTop: 8 }}>
              Chọn "Từ chối" nếu xác định khách hàng có rủi ro AML cao và không thể mở tài khoản tiết kiệm.
            </div>
          </div>
        </Card>

        {/* Action Buttons */}
        <div style={{ textAlign: 'center', marginTop: 32, paddingTop: 24, borderTop: '1px solid #f0f0f0' }}>
          <Space size="large">
            <Button
              size="large"
              onClick={onClose}
            >
              Hủy
            </Button>
            <Button
              type="primary"
              danger
              size="large"
              icon={<CloseCircleOutlined />}
              loading={isRejecting}
              onClick={handleReject}
            >
              Từ chối tài khoản
            </Button>
            <Button
              type="primary"
              size="large"
              icon={<CheckCircleOutlined />}
              loading={isApproving}
              onClick={handleApprove}
            >
              Phê duyệt tài khoản
            </Button>
          </Space>
        </div>
      </div>
    </Modal>
  );
};

export default AmlSavingAccountApproval;
