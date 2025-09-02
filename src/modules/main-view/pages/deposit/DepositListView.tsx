import React, { useEffect, useState } from "react";
import { 
  Button, 
  Modal, 
  Table, 
  message, 
  Typography, 
  Card, 
  Input,
  Select,
  Space,
  Tag,
  Tooltip,
  Spin,
  Alert,
  Statistic,
  Row,
  Col
} from "antd";
import {
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
  SearchOutlined,
  FilterOutlined,
  BankOutlined,
  TrophyOutlined,
  ClockCircleOutlined,
  CheckCircleOutlined,
  ExclamationCircleOutlined,
  ReloadOutlined,
  PercentageOutlined
} from "@ant-design/icons";
import { Deposit } from "../../../../shared/interface/Deposit";
import DepositDetailView from "./DepositDetailView";
import {
  useCreateDepositMutation,
  useDeleteDepositMutation,
  useGetAllDepositQuery,
  useUpdateDepositMutation,
} from "../../../../service/deposit.api";
import { DataDetailViewProps } from "../../../../shared/interface/DataDetailView";
import { useCreateSysPendingTaskMutation } from "../../../../service/sys-pending-task.api";
import { useAppSelector } from "../../../../hooks/hooks";
import "./DepositManagement.css";

const { Text, Title } = Typography;
const { Option } = Select;
const { confirm } = Modal;

interface DepositStats {
  total: number;
  pending: number;
  approved: number;
  rejected: number;
}

const DepositListView: React.FC = () => {
  // State management
  const [selectedDeposit, setSelectedDeposit] = useState<Deposit | null>(null);
  const [isDetailVisible, setIsDetailVisible] = useState(false);
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [isLoading, setIsLoading] = useState(false);
  
  // API hooks
  const { data: fetchedDeposits, refetch: refetchDeposits, isLoading: depositsLoading } =
    useGetAllDepositQuery();
  const [createDeposit, { isLoading: isCreating }] = useCreateDepositMutation();
  const [updateDeposit] = useUpdateDepositMutation();
  const [deleteDeposit] = useDeleteDepositMutation();
  const [createPendingTask] = useCreateSysPendingTaskMutation();
  
  // Current user
  const auth = useAppSelector((state) => state.auth);
  const [currentUser, setCurrentUser] = useState<any>(null);

  // Utility functions
  const getCurrentUserInfo = () => {
    if (auth.accessToken) {
      try {
        const payload = JSON.parse(atob(auth.accessToken.split(".")[1]));
        return {
          username: payload?.preferred_username || payload?.sub,
          roles: payload?.realm_access?.roles || [],
          fullName: payload?.name || payload?.given_name
        };
      } catch (error) {
        console.error("Error parsing token:", error);
        return null;
      }
    }
    return null;
  };

  const calculateStats = (): DepositStats => {
    if (!fetchedDeposits || !Array.isArray(fetchedDeposits)) {
      return { total: 0, pending: 0, approved: 0, rejected: 0 };
    }
    
    return {
      total: fetchedDeposits.length,
      pending: fetchedDeposits.filter(d => d.apprStatus === 'N' || d.apprStatus === 'N').length,
      approved: fetchedDeposits.filter(d => d.apprStatus === 'A' || d.apprStatus === 'A').length,
      rejected: fetchedDeposits.filter(d => d.apprStatus === 'R' || d.apprStatus === 'R').length,
    };
  };

  const getFilteredDeposits = () => {
    if (!fetchedDeposits || !Array.isArray(fetchedDeposits)) return [];
    
    let filtered = fetchedDeposits;
    
    // Search filter
    if (searchText) {
      filtered = filtered.filter(deposit => 
        deposit.name?.toLowerCase().includes(searchText.toLowerCase()) ||
        deposit.code?.toLowerCase().includes(searchText.toLowerCase()) ||
        deposit.description?.toLowerCase().includes(searchText.toLowerCase())
      );
    }
    
    // Status filter
    if (statusFilter !== 'all') {
      filtered = filtered.filter(deposit => {
        const status = deposit.apprStatus || deposit.apprStatus;
        return status === statusFilter;
      });
    }
    
    return filtered;
  };

  const formatCurrency = (amount: number): string => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'percent',
      minimumFractionDigits: 2,
      maximumFractionDigits: 4,
    }).format(amount / 100);
  };

  const getStatusTag = (status: string) => {
    const statusMap = {
      'N': { text: 'Chờ phê duyệt', color: 'orange', icon: <ClockCircleOutlined /> },
      'A': { text: 'Đã phê duyệt', color: 'green', icon: <CheckCircleOutlined /> },
      'R': { text: 'Đã từ chối', color: 'red', icon: <ExclamationCircleOutlined /> },
    };
    
    const statusInfo = statusMap[status] || { text: 'Không xác định', color: 'default', icon: null };
    
    return (
      <Tag color={statusInfo.color} icon={statusInfo.icon} className="deposit-status-tag">
        {statusInfo.text}
      </Tag>
    );
  };

  // Event handlers
  const handleAdd = () => {
    setSelectedDeposit(null);
    setIsDetailVisible(true);
  };

  const handleEdit = () => {
    if (selectedDeposit) {
      setIsDetailVisible(true);
    } else {
      message.warning({
        content: "Vui lòng chọn một gói lãi suất để chỉnh sửa",
        icon: <ExclamationCircleOutlined style={{ color: '#faad14' }} />,
      });
    }
  };

  const handleShowDeleteModal = () => {
    if (!selectedDeposit) {
      message.warning({
        content: "Vui lòng chọn một gói lãi suất để xóa",
        icon: <ExclamationCircleOutlined style={{ color: '#faad14' }} />,
      });
      return;
    }
    
    confirm({
      title: 'Xác nhận xóa gói lãi suất',
      icon: <ExclamationCircleOutlined style={{ color: '#faad14' }} />,
      content: (
        <div>
          <p>Bạn có chắc chắn muốn xóa gói lãi suất <strong>{selectedDeposit.name}</strong> không?</p>
          <p style={{ color: '#666', fontSize: '14px' }}>
            Thao tác này sẽ tạo yêu cầu xóa và gửi đến bộ phận phê duyệt. 
            Gói lãi suất sẽ không thể sử dụng sau khi được phê duyệt.
          </p>
        </div>
      ),
      okText: 'Xác nhận xóa',
      cancelText: 'Hủy bỏ',
      okType: 'danger',
      onOk: handleDelete,
    });
  };

  const handleDelete = async () => {
    setIsLoading(true);
    try {
      // Use proper deleteDeposit API
      const result = await deleteDeposit(selectedDeposit.id).unwrap();
      
      // Create sysPendingTask for approval workflow
      const pendingTask = {
        entityId: result.id,
        identifyId: result.id,
        menuMappingName: "Lãi suất tiết kiệm",
        classCallBack: "DepositBpm",
        secretKey: "deposit",
        taskAction: "D",
        apprStatus: "N",
      };

      await createPendingTask(pendingTask);
      
      message.success({
        content: `Yêu cầu xóa gói lãi suất "${selectedDeposit?.name}" đã được gửi thành công và đang chờ phê duyệt`,
        icon: <CheckCircleOutlined style={{ color: '#52c41a' }} />,
        duration: 4,
      });
      
      setSelectedDeposit(null);
      refetchDeposits();
    } catch (error) {
      console.error("Error deleting deposit:", error);
      message.error({
        content: "Có lỗi xảy ra khi gửi yêu cầu xóa. Vui lòng thử lại sau.",
        icon: <ExclamationCircleOutlined style={{ color: '#ff4d4f' }} />,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleDetailSubmit = async (newDeposit: Deposit) => {
    setIsLoading(true);
    const userInfo = getCurrentUserInfo();
    
    try {
      if (newDeposit.id) {
        // Update existing deposit - Use proper updateDeposit API
        const result = await updateDeposit({ 
          id: newDeposit.id, 
          data: newDeposit 
        }).unwrap();
        
        // Create sysPendingTask for approval workflow
        const pendingTask = {
          entityId: result.id,
          identifyId: result.id,
          menuMappingName: "Lãi suất tiết kiệm",
          classCallBack: "DepositBpm",
          secretKey: "deposit",
          taskAction: "U",
          apprStatus: "N",
        };

        await createPendingTask(pendingTask);
        
        message.success({
          content: `Yêu cầu cập nhật gói lãi suất "${newDeposit.name}" đã được gửi thành công và đang chờ phê duyệt`,
          icon: <CheckCircleOutlined style={{ color: '#52c41a' }} />,
          duration: 4,
        });
      } else {
        // Create new deposit - Backend handles approval workflow
        const result = await createDeposit(newDeposit).unwrap();
        
        message.success({
          content: `Gói lãi suất "${newDeposit.name}" đã được tạo thành công và đang chờ phê duyệt`,
          icon: <CheckCircleOutlined style={{ color: '#52c41a' }} />,
          duration: 4,
        });
      }
      
      setIsDetailVisible(false);
      setSelectedDeposit(null);
      refetchDeposits();
    } catch (error) {
      console.error("Error submitting deposit:", error);
      message.error({
        content: newDeposit.id ? 
          "Có lỗi xảy ra khi gửi yêu cầu cập nhật. Vui lòng thử lại sau." :
          "Có lỗi xảy ra khi tạo gói lãi suất. Vui lòng thử lại sau.",
        icon: <ExclamationCircleOutlined style={{ color: '#ff4d4f' }} />,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const detailViewProps: DataDetailViewProps = {
    visible: isDetailVisible,
    data: selectedDeposit,
    onClose: () => setIsDetailVisible(false),
    onSubmit: handleDetailSubmit,
  };

  const stats = calculateStats();
  const filteredDeposits = getFilteredDeposits();

  // Table columns
  const columns = [
    {
      title: 'Mã gói',
      dataIndex: 'code',
      key: 'code',
      width: 120,
      render: (code: string) => <span className="deposit-code">{code}</span>,
    },
    {
      title: 'Tên gói lãi suất',
      dataIndex: 'name',
      key: 'name',
      render: (name: string) => <span className="deposit-name">{name}</span>,
    },
    {
      title: 'Mô tả',
      dataIndex: 'description',
      key: 'description',
      render: (description: string) => (
        <Tooltip title={description}>
          <span className="deposit-description">{description || 'Không có mô tả'}</span>
        </Tooltip>
      ),
    },
    {
      title: 'Lãi suất',
      dataIndex: 'interestRate',
      key: 'interestRate',
      width: 120,
      render: (rate: number) => (
        <span className="deposit-interest-rate">
          <PercentageOutlined style={{ marginRight: 4 }} />
          {rate}%/năm
        </span>
      ),
    },
    {
      title: 'Trạng thái',
      dataIndex: 'apprStatus',
      key: 'apprStatus',
      width: 140,
      render: (status: any) => {
        const statusCode = status?.getCode?.() || status;
        return getStatusTag(statusCode);
      },
    },
    {
      title: 'Thời gian tạo',
      dataIndex: 'createdAt',
      key: 'createdAt',
      width: 120,
      render: (date: string) => (
        <span className="deposit-time-ago">
          {new Date(date).toLocaleDateString('vi-VN')}
        </span>
      ),
    },
  ];

  // Load user info
  useEffect(() => {
    setCurrentUser(getCurrentUserInfo());
  }, [auth.accessToken]);

  useEffect(() => {
    refetchDeposits();
  }, []);

  if (depositsLoading && !fetchedDeposits) {
    return (
      <div >
        <div className="deposit-loading">
          <Spin size="large" indicator={<ReloadOutlined className="deposit-loading-spinner" spin />} />
          <Title level={3} style={{ marginTop: 24, color: 'white' }}>
            Đang tải dữ liệu...
          </Title>
        </div>
      </div>
    );
  }

  return (
    <div>
      <Card className="deposit-management-main-card">
        {/* Header */}
        <div className="deposit-management-header">
          <Title level={1}>
            <BankOutlined style={{ marginRight: 12 }} />
            Quản Lý Gói Lãi Suất Tiết Kiệm
          </Title>
          <Text>
            Tạo và quản lý các gói lãi suất tiết kiệm với quy trình phê duyệt chuyên nghiệp
          </Text>
        </div>

        {/* Content */}
        <div className="deposit-management-content">
          {/* Statistics */}
          <Row gutter={[20, 20]} className="deposit-stats-grid">
            <Col>
              <div className="deposit-stat-card">
                <div className="deposit-stat-icon total">
                  <TrophyOutlined />
                </div>
                <div className="deposit-stat-number">{stats.total}</div>
                <div className="deposit-stat-label">Tổng gói lãi suất</div>
              </div>
            </Col>
            <Col>
              <div className="deposit-stat-card">
                <div className="deposit-stat-icon pending">
                  <ClockCircleOutlined />
                </div>
                <div className="deposit-stat-number">{stats.pending}</div>
                <div className="deposit-stat-label">Chờ phê duyệt</div>
              </div>
            </Col>
            <Col>
              <div className="deposit-stat-card">
                <div className="deposit-stat-icon approved">
                  <CheckCircleOutlined />
                </div>
                <div className="deposit-stat-number">{stats.approved}</div>
                <div className="deposit-stat-label">Đã phê duyệt</div>
              </div>
            </Col>
            <Col>
              <div className="deposit-stat-card">
                <div className="deposit-stat-icon rejected">
                  <ExclamationCircleOutlined />
                </div>
                <div className="deposit-stat-number">{stats.rejected}</div>
                <div className="deposit-stat-label">Đã từ chối</div>
              </div>
            </Col>
          </Row>

          {/* Actions Bar */}
          <div className="deposit-actions-bar">
            <div className="deposit-actions-left">
              <div className="deposit-search-bar">
                <Input
                  className="deposit-search-input"
                  placeholder="Tìm kiếm theo tên, mã hoặc mô tả..."
                  value={searchText}
                  onChange={(e) => setSearchText(e.target.value)}
                  allowClear
                />
                <SearchOutlined className="deposit-search-icon" />
              </div>
              <Select
                className="deposit-filter-dropdown"
                placeholder="Lọc theo trạng thái"
                value={statusFilter}
                onChange={setStatusFilter}
              >
                <Option value="all">Tất cả trạng thái</Option>
                <Option value="N">Chờ phê duyệt</Option>
                <Option value="A">Đã phê duyệt</Option>
                <Option value="R">Đã từ chối</Option>
              </Select>
            </div>
            <div className="deposit-actions-right">
              <Button
                className="deposit-action-button default"
                icon={<ReloadOutlined />}
                onClick={() => refetchDeposits()}
                loading={depositsLoading}
              >
                Làm mới
              </Button>
              <Button
                className="deposit-action-button default"
                icon={<EditOutlined />}
                onClick={handleEdit}
                disabled={!selectedDeposit}
              >
                Chỉnh sửa
              </Button>
              <Button
                className="deposit-action-button danger"
                icon={<DeleteOutlined />}
                onClick={handleShowDeleteModal}
                disabled={!selectedDeposit}
                loading={isLoading}
              >
                Xóa
              </Button>
              <Button
                className="deposit-action-button primary"
                icon={<PlusOutlined />}
                onClick={handleAdd}
                loading={isCreating}
              >
                Tạo gói mới
              </Button>
            </div>
          </div>

          {/* Table */}
          <div className="deposit-table-container">
            <div className="deposit-table-header">
              <Title level={4} className="deposit-table-title">
                <FilterOutlined style={{ marginRight: 8 }} />
                Danh Sách Gói Lãi Suất
                {searchText || statusFilter !== 'all' ? (
                  <Text style={{ fontWeight: 'normal', marginLeft: 8 }}>
                    ({filteredDeposits.length} kết quả)
                  </Text>
                ) : null}
              </Title>
            </div>
            
            <Table
              className="deposit-table"
              dataSource={filteredDeposits}
              columns={columns}
              rowKey="id"
              rowSelection={{
                type: "radio",
                selectedRowKeys: selectedDeposit ? [selectedDeposit.id] : [],
                onChange: (_, selectedRows) => setSelectedDeposit(selectedRows[0] || null),
              }}
              pagination={{
                pageSize: 10,
                showSizeChanger: true,
                showQuickJumper: true,
                showTotal: (total, range) => 
                  `${range[0]}-${range[1]} trong ${total} gói lãi suất`,
                className: "deposit-pagination"
              }}
              locale={{
                emptyText: (
                  <div className="deposit-empty-state">
                    <div className="deposit-empty-icon">
                      <BankOutlined />
                    </div>
                    <div className="deposit-empty-title">
                      Không có gói lãi suất nào
                    </div>
                    <div className="deposit-empty-description">
                      {searchText || statusFilter !== 'all' 
                        ? 'Không tìm thấy kết quả phù hợp với bộ lọc hiện tại'
                        : 'Hãy tạo gói lãi suất đầu tiên của bạn'
                      }
                    </div>
                    {!searchText && statusFilter === 'all' && (
                      <Button
                        type="primary"
                        icon={<PlusOutlined />}
                        onClick={handleAdd}
                        style={{ marginTop: 16 }}
                      >
                        Tạo gói lãi suất mới
                      </Button>
                    )}
                  </div>
                )
              }}
            />
          </div>
        </div>
      </Card>

      {/* Detail Modal */}
      <DepositDetailView {...detailViewProps} />
    </div>
  );
};

export default DepositListView;
