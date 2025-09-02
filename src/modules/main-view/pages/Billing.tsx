import React, { useState, useEffect } from 'react';
import {
  Row,
  Col,
  Card,
  Button,
  Typography,
  Spin,
  Alert,
  Progress,
  Space,
  Tooltip,
  Empty,
  message
} from 'antd';
import {
  EyeOutlined,
  EyeInvisibleOutlined,
  WalletOutlined,
  PieChartOutlined,
  BankOutlined,
  ClockCircleOutlined,
  DollarOutlined,
  TrophyOutlined,
  HistoryOutlined,
  PlusCircleOutlined,
  MinusCircleOutlined,
  PercentageOutlined,
  ReloadOutlined,
  ArrowUpOutlined,
  ArrowDownOutlined
} from '@ant-design/icons';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip as RechartsTooltip } from 'recharts';
import {
  useGetCustomerBalanceQuery,
  useGetCustomerSavingAccountsQuery,
  useGetSavingTransactionsQuery,
  useGetAssetAllocationQuery,
  CustomerBalance,
  SavingAccountDetail,
  SavingTransaction,
  AssetAllocation
} from '../../../service/customer.api';
import { useAppSelector } from '../../../hooks/hooks';
import './Billing.css';

const { Title, Text } = Typography;

interface ChartData {
  name: string;
  value: number;
  color: string;
}

function Billing() {
  // State management
  const [isBalanceVisible, setIsBalanceVisible] = useState(false);
  const [currentUser, setCurrentUser] = useState<any>(null);
  
  // API hooks
  const { data: balanceData, isLoading: balanceLoading, refetch: refetchBalance } = useGetCustomerBalanceQuery();
  const { data: savingAccounts, isLoading: savingsLoading, refetch: refetchSavings } = useGetCustomerSavingAccountsQuery();
  const { data: transactions, isLoading: transactionsLoading } = useGetSavingTransactionsQuery({ limit: 10 });
  const { data: assetAllocation, isLoading: allocationLoading } = useGetAssetAllocationQuery();
  
  const auth = useAppSelector((state) => state.auth);

  // Utility functions
  const getCurrentUserInfo = () => {
    if (auth.accessToken) {
      try {
        const payload = JSON.parse(atob(auth.accessToken.split(".")[1]));
        return {
          id: payload?.customerId || payload?.sub,
          username: payload?.preferred_username || payload?.sub,
          fullName: payload?.name || payload?.given_name,
          email: payload?.email
        };
      } catch (error) {
        console.error("Error parsing token:", error);
        return null;
      }
    }
    return null;
  };

  const formatCurrency = (amount: number): string => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const calculateCurrentInterest = (account: SavingAccountDetail): number => {
    const now = new Date();
    const startDate = new Date(account.startDate);
    const daysPassed = Math.floor((now.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24));
    const yearlyRate = account.interestRate / 100;
    const dailyRate = yearlyRate / 365;
    return account.balance * dailyRate * daysPassed;
  };

  const calculateMaturityProgress = (account: SavingAccountDetail): number => {
    const now = new Date();
    const startDate = new Date(account.startDate);
    const maturityDate = new Date(account.maturityDate);
    const totalDays = Math.floor((maturityDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24));
    const daysPassed = Math.floor((now.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24));
    return Math.min(Math.max((daysPassed / totalDays) * 100, 0), 100);
  };

  const getDaysRemaining = (maturityDate: string): number => {
    const now = new Date();
    const maturity = new Date(maturityDate);
    const daysRemaining = Math.floor((maturity.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
    return Math.max(daysRemaining, 0);
  };

  const getChartData = (): ChartData[] => {
    if (!assetAllocation) return [];
    
    return [
      {
        name: 'Tiền mặt',
        value: assetAllocation.cashAmount,
        color: '#1890ff'
      },
      {
        name: 'Tiết kiệm',
        value: assetAllocation.savingsAmount,
        color: '#52c41a'
      }
    ];
  };

  const getTransactionIcon = (type: string) => {
    switch (type.toLowerCase()) {
      case 'deposit':
        return <PlusCircleOutlined />;
      case 'withdrawal':
        return <MinusCircleOutlined />;
      case 'interest':
        return <PercentageOutlined />;
      default:
        return <DollarOutlined />;
    }
  };

  const getTransactionType = (type: string): string => {
    switch (type.toLowerCase()) {
      case 'deposit':
        return 'Gửi tiết kiệm';
      case 'withdrawal':
        return 'Rút tiết kiệm';
      case 'interest':
        return 'Lãi tiết kiệm';
      default:
        return type;
    }
  };

  const handleBalanceToggle = () => {
    setIsBalanceVisible(!isBalanceVisible);
  };

  const handleRefresh = () => {
    refetchBalance();
    refetchSavings();
    message.success('Dữ liệu đã được cập nhật');
  };

  // Load user info
  useEffect(() => {
    setCurrentUser(getCurrentUserInfo());
  }, [auth.accessToken]);

  // Loading state
  if (balanceLoading && !balanceData) {
    return (
      <div>
        <div className="dashboard-loading">
          <Spin size="large" indicator={<ReloadOutlined className="dashboard-loading-spinner" spin />} />
          <Title level={3} style={{ marginTop: 24, color: 'white' }}>
            Đang tải dữ liệu tài khoản...
          </Title>
        </div>
      </div>
    );
  }

  const chartData = getChartData();

  return (
    <div>
      <Card className="banking-dashboard-main-card">
        {/* Header */}
        <div className="banking-dashboard-header">
          <Title level={1}>
            <WalletOutlined style={{ marginRight: 12 }} />
            Dashboard Tài Chính
          </Title>
          <Text>
            Quản lý tài khoản và theo dõi tài sản một cách chuyên nghiệp
          </Text>
        </div>

        {/* Content */}
        <div className="banking-dashboard-content">
          {/* Account Balance Section */}
          <div className="balance-section">
            <Card className="balance-card">
              <div className="balance-header">
                <div>
                  <Title level={4} className="balance-title">
                    Tổng số dư tài khoản
                  </Title>
                  {currentUser && (
                    <Text style={{ opacity: 0.8 }}>
                      {currentUser.fullName || currentUser.username}
                    </Text>
                  )}
                </div>
                <Button 
                  className="balance-toggle"
                  onClick={handleBalanceToggle}
                  icon={isBalanceVisible ? <EyeInvisibleOutlined /> : <EyeOutlined />}
                />
              </div>
              
              <div className="balance-amount">
                {isBalanceVisible ? (
                  formatCurrency(balanceData?.totalBalance || 0)
                ) : (
                  <span className="balance-hidden">••••••••••</span>
                )}
              </div>
              
              <div className="balance-subtitle">
                Số dư khả dụng: {isBalanceVisible ? formatCurrency(balanceData?.availableBalance || 0) : '••••••••'}
              </div>
              
              <div className="balance-last-updated">
                Cập nhật lần cuối: {balanceData?.lastUpdated ? 
                  new Date(balanceData.lastUpdated).toLocaleString('vi-VN') : 
                  'Chưa có dữ liệu'
                }
              </div>
              
              <Button 
                type="text" 
                icon={<ReloadOutlined />} 
                onClick={handleRefresh}
                style={{ 
                  position: 'absolute', 
                  bottom: 16, 
                  right: 16,
                  color: 'white',
                  opacity: 0.8
                }}
              >
                Làm mới
              </Button>
            </Card>
          </div>

          {/* Asset Allocation Chart */}
          {assetAllocation && (
            <div className="asset-allocation-section">
              <Card className="asset-allocation-card">
                <div className="asset-allocation-header">
                  <Title level={3} className="asset-allocation-title">
                    <PieChartOutlined />
                    Phân Bổ Tài Sản
                  </Title>
                </div>
                
                <div className="asset-allocation-content">
                  <div className="chart-container">
                    <ResponsiveContainer width={250} height={250}>
                      <PieChart>
                        <Pie
                          data={chartData}
                          cx="50%"
                          cy="50%"
                          innerRadius={60}
                          outerRadius={100}
                          paddingAngle={5}
                          dataKey="value"
                        >
                          {chartData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <RechartsTooltip 
                          formatter={(value: any) => [formatCurrency(value), '']}
                        />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                  
                  <div className="allocation-legend">
                    <div className="legend-item">
                      <div className="legend-label">
                        <div className="legend-color cash"></div>
                        <span>Tiền mặt</span>
                      </div>
                      <div className="legend-info">
                        <div className="legend-amount">
                          {formatCurrency(assetAllocation.cashAmount)}
                        </div>
                        <div className="legend-percentage">
                          {assetAllocation.cashPercentage.toFixed(1)}%
                        </div>
                      </div>
                    </div>
                    
                    <div className="legend-item">
                      <div className="legend-label">
                        <div className="legend-color savings"></div>
                        <span>Tiết kiệm</span>
                      </div>
                      <div className="legend-info">
                        <div className="legend-amount">
                          {formatCurrency(assetAllocation.savingsAmount)}
                        </div>
                        <div className="legend-percentage">
                          {assetAllocation.savingsPercentage.toFixed(1)}%
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          )}

          <Row gutter={[24, 24]}>
            {/* Savings Accounts Section */}
            <Col xs={24} lg={14}>
              <div className="savings-accounts-section">
                <Card>
                  <div style={{ marginBottom: 24 }}>
                    <Title level={3} style={{ margin: 0, display: 'flex', alignItems: 'center', gap: 8 }}>
                      <BankOutlined />
                      Tài Khoản Tiết Kiệm
                      {savingAccounts && (
                        <Text style={{ fontSize: 16, fontWeight: 'normal', marginLeft: 8 }}>
                          ({savingAccounts.length} tài khoản)
                        </Text>
                      )}
                    </Title>
                  </div>
                  
                  {savingsLoading ? (
                    <div style={{ textAlign: 'center', padding: 40 }}>
                      <Spin size="large" />
                    </div>
                  ) : !savingAccounts || savingAccounts.length === 0 ? (
                    <Empty
                      image={Empty.PRESENTED_IMAGE_SIMPLE}
                      description="Chưa có tài khoản tiết kiệm nào"
                      style={{ padding: 40 }}
                    >
                      <Button type="primary" icon={<PlusCircleOutlined />}>
                        Mở tài khoản tiết kiệm
                      </Button>
                    </Empty>
                  ) : (
                    <div className="savings-accounts-grid">
                      {savingAccounts.map((account) => {
                        const currentInterest = calculateCurrentInterest(account);
                        const maturityProgress = calculateMaturityProgress(account);
                        const daysRemaining = getDaysRemaining(account.maturityDate);
                        
                        return (
                          <Card key={account.id} className="savings-account-card">
                            <div className="savings-account-header">
                              <span className="account-number">
                                {account.accountNumber}
                              </span>
                              <span className={`account-status ${account.status.toLowerCase()}`}>
                                {account.status === 'ACTIVE' ? 'Đang hoạt động' : 'Chờ xử lý'}
                              </span>
                            </div>
                            
                            <div className="account-info-grid">
                              <div className="account-info-item">
                                <span className="account-info-label">Loại tiết kiệm</span>
                                <span className="account-info-value">
                                  {account.depositTypeName}
                                </span>
                              </div>
                              
                              <div className="account-info-item">
                                <span className="account-info-label">Lãi suất</span>
                                <span className="account-info-value account-interest-rate">
                                  {account.interestRate}%/năm
                                </span>
                              </div>
                              
                              <div className="account-info-item">
                                <span className="account-info-label">Số dư</span>
                                <span className="account-info-value account-balance">
                                  {formatCurrency(account.balance)}
                                </span>
                              </div>
                              
                              <div className="account-info-item">
                                <span className="account-info-label">Kỳ hạn</span>
                                <span className="account-info-value">
                                  {account.term} tháng
                                </span>
                              </div>
                              
                              <div className="account-info-item">
                                <span className="account-info-label">Ngày đáo hạn</span>
                                <span className="account-info-value">
                                  {new Date(account.maturityDate).toLocaleDateString('vi-VN')}
                                </span>
                              </div>
                              
                              <div className="account-info-item">
                                <span className="account-info-label">Số ngày còn lại</span>
                                <span className="account-info-value">
                                  {daysRemaining} ngày
                                </span>
                              </div>
                            </div>
                            
                            <div className="account-progress-section">
                              <div className="progress-header">
                                <span className="progress-label">Tiến độ đáo hạn</span>
                                <span className="progress-value">
                                  {maturityProgress.toFixed(1)}%
                                </span>
                              </div>
                              <Progress 
                                percent={maturityProgress} 
                                strokeColor={{
                                  '0%': '#108ee9',
                                  '100%': '#87d068',
                                }}
                                className="account-progress"
                              />
                              
                              <div className="expected-return">
                                <span className="expected-return-label">
                                  Lãi hiện tại:
                                </span>
                                <span className="expected-return-value">
                                  {formatCurrency(currentInterest)}
                                </span>
                              </div>
                            </div>
                          </Card>
                        );
                      })}
                    </div>
                  )}
                </Card>
              </div>
            </Col>

            {/* Transactions Section */}
            <Col xs={24} lg={10}>
              <Card className="transactions-card">
                <div className="transactions-header">
                  <Title level={3} className="transactions-title">
                    <HistoryOutlined />
                    Giao Dịch Gần Đây
                  </Title>
                  <Button className="view-all-button">
                    Xem tất cả
                  </Button>
                </div>
                
                {transactionsLoading ? (
                  <div style={{ textAlign: 'center', padding: 40 }}>
                    <Spin size="large" />
                  </div>
                ) : !transactions || transactions.length === 0 ? (
                  <Empty
                    image={Empty.PRESENTED_IMAGE_SIMPLE}
                    description="Chưa có giao dịch nào"
                    style={{ padding: 40 }}
                  />
                ) : (
                  <div>
                    {transactions.map((transaction) => (
                      <div key={transaction.id} className="transaction-item">
                        <div className="transaction-content">
                          <div className="transaction-info">
                            <div className="transaction-main">
                              <div className={`transaction-icon ${transaction.transactionType.toLowerCase()}`}>
                                {getTransactionIcon(transaction.transactionType)}
                              </div>
                              <div className="transaction-details">
                                <div className="transaction-type">
                                  {getTransactionType(transaction.transactionType)}
                                </div>
                                <div className="transaction-account">
                                  {transaction.accountNumber}
                                </div>
                                <div className="transaction-date">
                                  {new Date(transaction.transactionDate).toLocaleString('vi-VN')}
                                </div>
                              </div>
                            </div>
                          </div>
                          
                          <div className="transaction-amount-section">
                            <div className={`transaction-amount ${transaction.transactionType.toLowerCase() === 'deposit' || transaction.transactionType.toLowerCase() === 'interest' ? 'positive' : 'negative'}`}>
                              {transaction.transactionType.toLowerCase() === 'deposit' || transaction.transactionType.toLowerCase() === 'interest' ? '+' : '-'}
                              {formatCurrency(Math.abs(transaction.amount))}
                            </div>
                            <div className="transaction-status">
                              {transaction.status === 'completed' ? 'Hoàn thành' : 'Đang xử lý'}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </Card>
            </Col>
          </Row>
        </div>
      </Card>
    </div>
  );
}

export default Billing;
