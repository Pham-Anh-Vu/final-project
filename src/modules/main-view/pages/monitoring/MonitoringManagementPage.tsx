import React, { useState } from 'react';
import {
  Card,
  Table,
  Tag,
  Button,
  Space,
  Tooltip,
  Modal,
  Input,
  DatePicker,
  Form,
  message,
  Typography,
  Row,
  Col,
  Statistic,
  Alert,
  Descriptions,
  Select,
  Divider,
} from 'antd';
import {
  EyeOutlined,
  EditOutlined,
  StopOutlined,
  ClockCircleOutlined,
  ExclamationCircleOutlined,
  CalendarOutlined,
  UserOutlined,
  DollarOutlined,
  WarningOutlined,
} from '@ant-design/icons';
import dayjs from 'dayjs';
import type { ColumnsType } from 'antd/es/table';
import {
  useGetAllMonitoredSavingAccountsQuery,
  useGetMonitoredAccountsByRiskLevelQuery,
  useGetExpiringSoonMonitoredAccountsQuery,
  useUpdateMonitoringNotesMutation,
  useExtendMonitoringMutation,
  useStopMonitoringMutation,
  useGetMonitoringStatisticsQuery,
  MonitoredSavingAccount,
} from '../../../../service/monitoring.api';

const { Title, Text } = Typography;
const { TextArea } = Input;
const { Option } = Select;

const MonitoringManagementPage: React.FC = () => {
  const [viewMode, setViewMode] = useState<'all' | 'expiring' | 'by-risk'>('all');
  const [selectedRiskLevel, setSelectedRiskLevel] = useState<string>('HIGH');
  const [selectedAccount, setSelectedAccount] = useState<MonitoredSavingAccount | null>(null);
  const [modalType, setModalType] = useState<'view' | 'edit' | 'extend' | 'stop' | null>(null);
  const [form] = Form.useForm();

  // API Queries
  const { data: allAccounts = [], isLoading: loadingAll, refetch: refetchAll } = useGetAllMonitoredSavingAccountsQuery();
  const { data: riskAccounts = [], isLoading: loadingRisk, refetch: refetchRisk } = useGetMonitoredAccountsByRiskLevelQuery(selectedRiskLevel, {
    skip: viewMode !== 'by-risk',
  });
  const { data: expiringAccounts = [], isLoading: loadingExpiring, refetch: refetchExpiring } = useGetExpiringSoonMonitoredAccountsQuery(undefined, {
    skip: viewMode !== 'expiring',
  });
  const { data: statistics } = useGetMonitoringStatisticsQuery();

  // API Mutations
  const [updateNotes] = useUpdateMonitoringNotesMutation();
  const [extendMonitoring] = useExtendMonitoringMutation();
  const [stopMonitoring] = useStopMonitoringMutation();

  // Get current data based on view mode
  const getCurrentData = () => {
    switch (viewMode) {
      case 'expiring':
        return expiringAccounts;
      case 'by-risk':
        return riskAccounts;
      default:
        return allAccounts;
    }
  };

  const getCurrentLoading = () => {
    switch (viewMode) {
      case 'expiring':
        return loadingExpiring;
      case 'by-risk':
        return loadingRisk;
      default:
        return loadingAll;
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
    }).format(amount);
  };

  const getRiskLevelColor = (level: string) => {
    switch (level) {
      case 'LOW': return 'green';
      case 'MEDIUM': return 'orange';
      case 'HIGH': return 'red';
      case 'CRITICAL': return 'purple';
      default: return 'default';
    }
  };

  const handleViewDetails = (account: MonitoredSavingAccount) => {
    setSelectedAccount(account);
    setModalType('view');
  };

  const handleEditNotes = (account: MonitoredSavingAccount) => {
    setSelectedAccount(account);
    setModalType('edit');
    form.setFieldsValue({ notes: account.notes });
  };

  const handleExtend = (account: MonitoredSavingAccount) => {
    setSelectedAccount(account);
    setModalType('extend');
    form.resetFields();
  };

  const handleStop = (account: MonitoredSavingAccount) => {
    setSelectedAccount(account);
    setModalType('stop');
    form.resetFields();
  };

  const handleModalOk = async () => {
    if (!selectedAccount) return;

    try {
      const values = await form.validateFields();

      switch (modalType) {
        case 'edit':
          await updateNotes({
            monitoringId: selectedAccount.monitoringId,
            notes: values.notes,
          }).unwrap();
          message.success('Cập nhật ghi chú thành công');
          break;

        case 'extend':
          await extendMonitoring({
            monitoringId: selectedAccount.monitoringId,
            endDate: values.endDate.format('YYYY-MM-DDTHH:mm:ss'),
            reason: values.reason,
          }).unwrap();
          message.success('Gia hạn giám sát thành công');
          break;

        case 'stop':
          await stopMonitoring({
            monitoringId: selectedAccount.monitoringId,
            reason: values.reason,
          }).unwrap();
          message.success('Dừng giám sát thành công');
          break;
      }

      handleModalCancel();
      refetchData();
    } catch (error: any) {
      message.error(error?.data?.message || 'Có lỗi xảy ra');
    }
  };

  const handleModalCancel = () => {
    setSelectedAccount(null);
    setModalType(null);
    form.resetFields();
  };

  const refetchData = () => {
    refetchAll();
    refetchRisk();
    refetchExpiring();
  };

  const columns: ColumnsType<MonitoredSavingAccount> = [
    {
      title: 'Thông tin tài khoản',
      key: 'account',
      render: (_, record) => (
        <div>
          <div style={{ fontWeight: 'bold' }}>{record.accountNumber}</div>
          <div style={{ fontSize: '12px', color: '#666' }}>
            {record.customerName} ({record.cusCode})
          </div>
          <div style={{ fontSize: '12px', color: '#999' }}>
            CMND: {record.identityNo || 'N/A'}
          </div>
        </div>
      ),
    },
    {
      title: 'Số dư',
      dataIndex: 'balance',
      render: (balance) => (
        <Text strong style={{ color: '#1890ff' }}>
          {formatCurrency(balance)}
        </Text>
      ),
      sorter: (a, b) => a.balance - b.balance,
    },
    {
      title: 'Mức độ rủi ro',
      dataIndex: 'riskLevel',
      render: (riskLevel) => (
        <Tag color={getRiskLevelColor(riskLevel)}>{riskLevel}</Tag>
      ),
      filters: [
        { text: 'LOW', value: 'LOW' },
        { text: 'MEDIUM', value: 'MEDIUM' },
        { text: 'HIGH', value: 'HIGH' },
        { text: 'CRITICAL', value: 'CRITICAL' },
      ],
      onFilter: (value, record) => record.riskLevel === value,
    },
    {
      title: 'Thời gian giám sát',
      key: 'monitoring',
      render: (_, record) => (
        <div>
          <div style={{ fontSize: '12px' }}>
            Bắt đầu: {dayjs(record.monitoringStartDate).format('DD/MM/YYYY')}
          </div>
          {record.monitoringEndDate && (
            <div style={{ fontSize: '12px' }}>
              Kết thúc: {dayjs(record.monitoringEndDate).format('DD/MM/YYYY')}
            </div>
          )}
          <div style={{ fontSize: '12px', color: '#666' }}>
            Đã giám sát: {record.daysMonitored} ngày
            {record.daysRemaining && (
              <span style={{ color: record.isExpiringSoon ? '#f5222d' : '#666' }}>
                {' | Còn lại: '}{record.daysRemaining} ngày
              </span>
            )}
          </div>
        </div>
      ),
    },
    {
      title: 'Trạng thái',
      key: 'status',
      render: (_, record) => (
        <div>
          <Tag color={record.isMonitoringActive ? 'green' : 'red'}>
            {record.isMonitoringActive ? 'Đang giám sát' : 'Đã dừng'}
          </Tag>
          {record.isExpiringSoon && (
            <Tag color="orange" icon={<ClockCircleOutlined />}>
              Sắp hết hạn
            </Tag>
          )}
        </div>
      ),
    },
    {
      title: 'Thao tác',
      key: 'actions',
      render: (_, record) => (
        <Space>
          <Tooltip title="Xem chi tiết">
            <Button
              type="primary"
              ghost
              size="small"
              icon={<EyeOutlined />}
              onClick={() => handleViewDetails(record)}
            />
          </Tooltip>
          <Tooltip title="Sửa ghi chú">
            <Button
              type="default"
              size="small"
              icon={<EditOutlined />}
              onClick={() => handleEditNotes(record)}
            />
          </Tooltip>
          <Tooltip title="Gia hạn">
            <Button
              type="default"
              size="small"
              icon={<CalendarOutlined />}
              onClick={() => handleExtend(record)}
            />
          </Tooltip>
          <Tooltip title="Dừng giám sát">
            <Button
              danger
              size="small"
              icon={<StopOutlined />}
              onClick={() => handleStop(record)}
            />
          </Tooltip>
        </Space>
      ),
    },
  ];

  return (
    <div style={{ padding: '24px' }}>
      <Title level={2}>
        <UserOutlined style={{ marginRight: 8 }} />
        Quản lý tài khoản giám sát
      </Title>

      {/* Statistics */}
      {statistics && (
        <Row gutter={16} style={{ marginBottom: 24 }}>
          <Col span={6}>
            <Card>
              <Statistic
                title="Tổng số tài khoản giám sát"
                value={statistics.totalMonitoredCustomers}
                prefix={<UserOutlined />}
              />
            </Card>
          </Col>
          <Col span={6}>
            <Card>
              <Statistic
                title="Rủi ro cao"
                value={statistics.riskDistribution?.HIGH || 0}
                prefix={<WarningOutlined />}
                valueStyle={{ color: '#f5222d' }}
              />
            </Card>
          </Col>
          <Col span={6}>
            <Card>
              <Statistic
                title="Rủi ro nghiêm trọng"
                value={statistics.riskDistribution?.CRITICAL || 0}
                prefix={<ExclamationCircleOutlined />}
                valueStyle={{ color: '#722ed1' }}
              />
            </Card>
          </Col>
          <Col span={6}>
            <Card>
              <Statistic
                title="Sắp hết hạn"
                value={expiringAccounts.length}
                prefix={<ClockCircleOutlined />}
                valueStyle={{ color: '#fa8c16' }}
              />
            </Card>
          </Col>
        </Row>
      )}

      {/* Controls */}
      <Card style={{ marginBottom: 16 }}>
        <Row gutter={16} align="middle">
          <Col>
            <Text strong>Hiển thị: </Text>
          </Col>
          <Col>
            <Select
              value={viewMode}
              onChange={setViewMode}
              style={{ width: 200 }}
            >
              <Option value="all">Tất cả tài khoản</Option>
              <Option value="expiring">Sắp hết hạn</Option>
              <Option value="by-risk">Theo mức độ rủi ro</Option>
            </Select>
          </Col>
          {viewMode === 'by-risk' && (
            <Col>
              <Select
                value={selectedRiskLevel}
                onChange={setSelectedRiskLevel}
                style={{ width: 120 }}
              >
                <Option value="LOW">LOW</Option>
                <Option value="MEDIUM">MEDIUM</Option>
                <Option value="HIGH">HIGH</Option>
                <Option value="CRITICAL">CRITICAL</Option>
              </Select>
            </Col>
          )}
          <Col>
            <Button onClick={refetchData}>Làm mới</Button>
          </Col>
        </Row>
      </Card>

      {/* Alert for expiring accounts */}
      {viewMode === 'expiring' && expiringAccounts.length > 0 && (
        <Alert
          message={`Có ${expiringAccounts.length} tài khoản sắp hết hạn giám sát`}
          description="Các tài khoản này sẽ hết hạn giám sát trong vòng 30 ngày tới. Vui lòng xem xét gia hạn nếu cần thiết."
          type="warning"
          showIcon
          style={{ marginBottom: 16 }}
        />
      )}

      {/* Main Table */}
      <Card>
        <Table
          columns={columns}
          dataSource={getCurrentData()}
          loading={getCurrentLoading()}
          rowKey="monitoringId"
          pagination={{
            pageSize: 10,
            showSizeChanger: true,
            showQuickJumper: true,
            showTotal: (total) => `Tổng ${total} tài khoản`,
          }}
          scroll={{ x: 1200 }}
        />
      </Card>

      {/* Modals */}
      {/* View Details Modal */}
      <Modal
        title="Chi tiết tài khoản giám sát"
        open={modalType === 'view'}
        onCancel={handleModalCancel}
        footer={[
          <Button key="close" onClick={handleModalCancel}>
            Đóng
          </Button>,
        ]}
        width={800}
      >
        {selectedAccount && (
          <div>
            <Descriptions title="Thông tin tài khoản tiết kiệm" bordered column={2}>
              <Descriptions.Item label="Số tài khoản">{selectedAccount.accountNumber}</Descriptions.Item>
              <Descriptions.Item label="Tên khách hàng">{selectedAccount.customerName}</Descriptions.Item>
              <Descriptions.Item label="Mã khách hàng">{selectedAccount.cusCode}</Descriptions.Item>
              <Descriptions.Item label="CMND/CCCD">{selectedAccount.identityNo || 'N/A'}</Descriptions.Item>
              <Descriptions.Item label="Loại gói">{selectedAccount.depositTypeName}</Descriptions.Item>
              <Descriptions.Item label="Lãi suất">{selectedAccount.interestRate}%/năm</Descriptions.Item>
              <Descriptions.Item label="Số dư">{formatCurrency(selectedAccount.balance)}</Descriptions.Item>
              <Descriptions.Item label="Kỳ hạn">{selectedAccount.term} tháng</Descriptions.Item>
            </Descriptions>

            <Divider />

            <Descriptions title="Thông tin giám sát" bordered column={2}>
              <Descriptions.Item label="Mức độ rủi ro">
                <Tag color={getRiskLevelColor(selectedAccount.riskLevel)}>
                  {selectedAccount.riskLevel}
                </Tag>
              </Descriptions.Item>
              <Descriptions.Item label="Loại giám sát">{selectedAccount.monitoringType}</Descriptions.Item>
              <Descriptions.Item label="Ngày bắt đầu">
                {dayjs(selectedAccount.monitoringStartDate).format('DD/MM/YYYY HH:mm')}
              </Descriptions.Item>
              <Descriptions.Item label="Ngày kết thúc">
                {selectedAccount.monitoringEndDate 
                  ? dayjs(selectedAccount.monitoringEndDate).format('DD/MM/YYYY HH:mm')
                  : 'Không giới hạn'
                }
              </Descriptions.Item>
              <Descriptions.Item label="Đã giám sát">{selectedAccount.daysMonitored} ngày</Descriptions.Item>
              <Descriptions.Item label="Còn lại">
                {selectedAccount.daysRemaining ? `${selectedAccount.daysRemaining} ngày` : 'Không giới hạn'}
              </Descriptions.Item>
              <Descriptions.Item label="Lý do giám sát" span={2}>
                {selectedAccount.monitoringReason}
              </Descriptions.Item>
              <Descriptions.Item label="Ghi chú" span={2}>
                {selectedAccount.notes || 'Không có ghi chú'}
              </Descriptions.Item>
            </Descriptions>
          </div>
        )}
      </Modal>

      {/* Edit Notes Modal */}
      <Modal
        title="Cập nhật ghi chú"
        open={modalType === 'edit'}
        onOk={handleModalOk}
        onCancel={handleModalCancel}
      >
        <Form form={form} layout="vertical">
          <Form.Item
            name="notes"
            label="Ghi chú"
            rules={[{ required: true, message: 'Vui lòng nhập ghi chú' }]}
          >
            <TextArea rows={4} placeholder="Nhập ghi chú..." />
          </Form.Item>
        </Form>
      </Modal>

      {/* Extend Modal */}
      <Modal
        title="Gia hạn giám sát"
        open={modalType === 'extend'}
        onOk={handleModalOk}
        onCancel={handleModalCancel}
      >
        <Form form={form} layout="vertical">
          <Form.Item
            name="endDate"
            label="Ngày kết thúc mới"
            rules={[{ required: true, message: 'Vui lòng chọn ngày kết thúc' }]}
          >
            <DatePicker
              style={{ width: '100%' }}
              showTime
              disabledDate={(current) => current && current < dayjs().endOf('day')}
            />
          </Form.Item>
          <Form.Item
            name="reason"
            label="Lý do gia hạn"
            rules={[{ required: true, message: 'Vui lòng nhập lý do gia hạn' }]}
          >
            <TextArea rows={3} placeholder="Nhập lý do gia hạn..." />
          </Form.Item>
        </Form>
      </Modal>

      {/* Stop Modal */}
      <Modal
        title="Dừng giám sát"
        open={modalType === 'stop'}
        onOk={handleModalOk}
        onCancel={handleModalCancel}
      >
        <Alert
          message="Cảnh báo"
          description="Việc dừng giám sát sẽ không thể hoàn tác. Tài khoản sẽ không còn được theo dõi nữa."
          type="warning"
          showIcon
          style={{ marginBottom: 16 }}
        />
        <Form form={form} layout="vertical">
          <Form.Item
            name="reason"
            label="Lý do dừng giám sát"
            rules={[{ required: true, message: 'Vui lòng nhập lý do dừng giám sát' }]}
          >
            <TextArea rows={3} placeholder="Nhập lý do dừng giám sát..." />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default MonitoringManagementPage;
