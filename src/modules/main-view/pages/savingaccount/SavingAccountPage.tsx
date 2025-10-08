import {
  Button,
  Card,
  Col,
  DatePicker,
  Form,
  InputNumber,
  message,
  Row,
  Typography,
  Modal,
  Steps,
  Spin,
  Alert,
  Tag,
  Space,
  Tooltip,
  Progress
} from "antd";
import {
  CheckCircleOutlined,
  DollarOutlined,
  CalendarOutlined,
  SafetyOutlined,
  StarOutlined,
  InfoCircleOutlined,
  ExclamationCircleOutlined,
  LoadingOutlined
} from "@ant-design/icons";
import { useGetAllDepositQuery } from "../../../../service/deposit.api";
import { useCreateSavingAccountMutation } from "../../../../service/saving-account.api";
import { useEffect, useState } from "react";
import React from "react";
import dayjs, { Dayjs } from "dayjs";
import { useAppSelector } from "../../../../hooks/hooks";
import { ProfessionalHeader } from "../../../../components/common/ProfessionalHeader";
import "./SavingAccountPage.css";

const { Title, Text } = Typography;
const { Step } = Steps;
const { confirm } = Modal;

interface FormData {
  depositId: number;
  balance: number;
  term: number;
}

const CreateSavingAccountPage: React.FC = () => {
  const [form] = Form.useForm();
  const { data: depositList = [], isLoading: depositsLoading } = useGetAllDepositQuery();
  const [createSavingAccount, { isLoading: creatingAccount }] = useCreateSavingAccountMutation();

  // Form states
  const [selectedDeposit, setSelectedDeposit] = useState<any>(null);
  const [balance, setBalance] = useState<number>(0);
  const [term, setTerm] = useState<number>(12);
  const [currentStep, setCurrentStep] = useState(0);
  
  // UI states
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [formData, setFormData] = useState<FormData | null>(null);
  const [createdAccount, setCreatedAccount] = useState<any>(null);
  
  const auth = useAppSelector((state) => state.auth);
  const [customerInfo, setCustomerInfo] = useState<any>(null);

  // Utility functions
  const formatCurrency = (amount: number): string => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const calculateExpectedAmount = (): number => {
    if (!selectedDeposit || !balance || !term) return 0;
    const monthlyRate = (Number(selectedDeposit.interestRate) / 100) * (term / 12);
    const interest = balance * monthlyRate;
    return Math.round(balance + interest);
  };

  const validateForm = (): boolean => {
    if (!selectedDeposit) {
      message.warning("Vui lòng chọn gói lãi suất");
      return false;
    }
    if (!balance || balance < 1000000) {
      message.warning("Số tiền gửi tối thiểu là 1,000,000 VND");
      return false;
    }
    if (!term || term < 1 || term > 60) {
      message.warning("Kỳ hạn phải từ 1 đến 60 tháng");
      return false;
    }
    return true;
  };

  const handleFormSubmit = () => {
    if (!validateForm()) return;
    
    const data: FormData = {
      depositId: selectedDeposit.id,
      balance,
      term,
    };
    
    setFormData(data);
    setShowConfirmModal(true);
  };

  const handleConfirmSubmit = async () => {
    if (!formData) return;
    
    try {
      const response = await createSavingAccount(formData).unwrap();
      
      if (response.success) {
        setCreatedAccount(response);
        setShowConfirmModal(false);
        setShowSuccessModal(true);
        message.success(response.message);
        
        // Reset form
        form.resetFields();
        setSelectedDeposit(null);
        setBalance(0);
        setTerm(12);
        setCurrentStep(0);
      } else {
        message.error(response.message || "Có lỗi xảy ra");
      }
    } catch (error: any) {
      console.error("Error creating account:", error);
      message.error(error?.data?.message || "Có lỗi xảy ra khi tạo tài khoản");
    }
  };

  // Load customer info from token
  useEffect(() => {
    if (auth.accessToken) {
      try {
        const payload = JSON.parse(atob(auth.accessToken.split(".")[1]));
        setCustomerInfo({
          id: payload?.customerId || payload?.sub,
          cusCode: payload?.cusCode || payload?.preferred_username,
          fullName: payload?.name || payload?.given_name,
          email: payload?.email,
          identityNo: payload?.identityNo
        });
      } catch (error) {
        console.error("Error parsing token:", error);
        message.error("Không thể lấy thông tin khách hàng");
      }
    }
  }, [auth.accessToken]);

  // Update current step based on form progress
  useEffect(() => {
    if (selectedDeposit && balance >= 1000000 && term >= 1) {
      setCurrentStep(2);
    } else if (selectedDeposit) {
      setCurrentStep(1);
    } else {
      setCurrentStep(0);
    }
  }, [selectedDeposit, balance, term]);

  const steps = [
    {
      title: 'Chọn gói lãi suất',
      description: 'Lựa chọn gói phù hợp',
      icon: <StarOutlined />
    },
    {
      title: 'Nhập thông tin',
      description: 'Số tiền và kỳ hạn',
      icon: <DollarOutlined />
    },
    {
      title: 'Xác nhận',
      description: 'Kiểm tra và xác nhận',
      icon: <CheckCircleOutlined />
    }
  ];

  if (depositsLoading) {
    return (
      <div>
        <div style={{ textAlign: 'center', paddingTop: '200px' }}>
          <Spin size="large" indicator={<LoadingOutlined style={{ fontSize: 48 }} spin />} />
          <Title level={3} style={{ marginTop: 24, color: 'white' }}>
            Đang tải dữ liệu...
          </Title>
        </div>
      </div>
    );
  }

  return (
    <div>
      <Card className="savings-account-main-card">
        {/* Professional Header */}
        <ProfessionalHeader
          icon={<SafetyOutlined />}
          title="Tạo Tài Khoản Tiết Kiệm"
          subtitle="Gửi tiết kiệm an toàn, lãi suất cạnh tranh, cam kết bảo mật tuyệt đối"
          variant="success"
          size="large"
        >
          <div style={{ marginTop: 24 }}>
            <Steps current={currentStep} items={steps} />
          </div>
        </ProfessionalHeader>

        {/* Content */}
        <div className="savings-account-content">
          {/* Customer Info */}
          {customerInfo && (
            <Alert
              message={
                <Space>
                  <Text strong>Khách hàng:</Text>
                  <Text>{customerInfo.fullName || customerInfo.cusCode}</Text>
                  <Tag color="blue">{customerInfo.cusCode}</Tag>
                </Space>
              }
              type="info"
              showIcon
              style={{ marginBottom: 32 }}
            />
          )}

          {/* Step 1: Deposit Selection */}
          <div className="deposit-selection-section">
            <div className="section-header">
              <div className="section-number">1</div>
              <Title level={3} className="section-title">
                Chọn Gói Lãi Suất Phù Hợp
              </Title>
            </div>

            <div className="deposit-cards-grid">
              {depositList.map((deposit) => (
                <div
                  key={deposit.id}
                  className={`deposit-card ${selectedDeposit?.id === deposit.id ? 'selected' : ''}`}
                  onClick={() => setSelectedDeposit(deposit)}
                >
                  <div className="deposit-card-header">
                    <Title level={4} className="deposit-card-title">
                      {deposit.name}
                    </Title>
                    <div className="deposit-card-badge">
                      {deposit.code}
                    </div>
                  </div>
                  
                  <div className="deposit-card-info">
                    <div className="deposit-info-row">
                      <span className="deposit-info-label">Lãi suất:</span>
                      <span className="deposit-info-value interest-rate">
                        {deposit.interestRate}%/năm
                      </span>
                    </div>
                    <div className="deposit-info-row">
                      <span className="deposit-info-label">Mô tả:</span>
                      <span className="deposit-info-value">
                        {deposit.description || "Gói tiết kiệm cơ bản"}
                      </span>
                    </div>
                  </div>
                  
                  {selectedDeposit?.id === deposit.id && (
                    <div style={{ textAlign: 'center', marginTop: 16 }}>
                      <CheckCircleOutlined style={{ color: '#52c41a', fontSize: 24 }} />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Step 2: Form Input */}
          {selectedDeposit && (
            <div className="form-section">
              <div className="section-header">
                <div className="section-number">2</div>
                <Title level={3} className="section-title">
                  Thông Tin Gửi Tiết Kiệm
                </Title>
              </div>

              <div className="form-grid">
                <div className="form-item-enhanced">
                  <label className="form-label-enhanced">
                    <DollarOutlined style={{ marginRight: 8 }} />
                    Số Tiền Gửi
                  </label>
                  <div className="amount-input-container">
                    <InputNumber
                      className="amount-input"
                      min={1000000}
                      max={50000000000}
                      step={500000}
                      value={balance}
                      onChange={(val) => setBalance(Number(val) || 0)}
                      placeholder="Nhập số tiền (tối thiểu 1,000,000 VND)"
                      formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                      // parser={(value) => value!.replace(/\$\s?|(,*)/g, '')}
                    />
                    <span className="currency-label">VND</span>
                  </div>
                  {balance > 0 && balance < 1000000 && (
                    <div className="warning-message">
                      Số tiền gửi tối thiểu là 1,000,000 VND
                    </div>
                  )}
                </div>

                <div className="form-item-enhanced">
                  <label className="form-label-enhanced">
                    <CalendarOutlined style={{ marginRight: 8 }} />
                    Kỳ Hạn (tháng)
                  </label>
                  <InputNumber
                    className="amount-input"
                    min={1}
                    max={60}
                    value={term}
                    onChange={(val) => setTerm(Number(val) || 12)}
                    placeholder="Nhập kỳ hạn (1-60 tháng)"
                  />
                  {term > 0 && (term < 1 || term > 60) && (
                    <div className="warning-message">
                      Kỳ hạn phải từ 1 đến 60 tháng
                    </div>
                  )}
                </div>
              </div>

              {/* Calculation Summary */}
              {selectedDeposit && balance >= 1000000 && term >= 1 && (
                <div className="calculation-summary">
                  <Title level={4} className="calculation-title">
                    <InfoCircleOutlined className="calculation-icon" />
                    Thông Tin Chi Tiết
                  </Title>
                  
                  <div className="calculation-details">
                    <div className="calculation-item">
                      <span className="calculation-label">Gói lãi suất:</span>
                      <span className="calculation-value">{selectedDeposit.name}</span>
                    </div>
                    <div className="calculation-item">
                      <span className="calculation-label">Lãi suất:</span>
                      <span className="calculation-value">{selectedDeposit.interestRate}%/năm</span>
                    </div>
                    <div className="calculation-item">
                      <span className="calculation-label">Số tiền gửi:</span>
                      <span className="calculation-value">{formatCurrency(balance)}</span>
                    </div>
                    <div className="calculation-item">
                      <span className="calculation-label">Kỳ hạn:</span>
                      <span className="calculation-value">{term} tháng</span>
                    </div>
                    <div className="calculation-item">
                      <span className="calculation-label">Ngày đáo hạn dự kiến:</span>
                      <span className="calculation-value">
                        {dayjs().add(term, 'month').format('DD/MM/YYYY')}
                      </span>
                    </div>
                    <div className="calculation-item">
                      <span className="calculation-label">Số tiền nhận được:</span>
                      <span className="calculation-value expected-amount">
                        {formatCurrency(calculateExpectedAmount())}
                      </span>
                    </div>
                  </div>
                </div>
              )}

              <Button
                type="primary"
                size="large"
                className="submit-button"
                onClick={handleFormSubmit}
                disabled={!selectedDeposit || balance < 1000000 || term < 1 || term > 60}
                loading={creatingAccount}
              >
                {creatingAccount ? (
                  <>
                    <div className="loading-spinner" />
                    Đang Xử Lý...
                  </>
                ) : (
                  <>
                    <CheckCircleOutlined style={{ marginRight: 8 }} />
                    Tạo Tài Khoản Tiết Kiệm
                  </>
                )}
              </Button>
            </div>
          )}
        </div>
      </Card>

      {/* Confirmation Modal */}
      <Modal
        title={
          <Space>
            <ExclamationCircleOutlined style={{ color: '#faad14' }} />
            Xác Nhận Tạo Tài Khoản Tiết Kiệm
          </Space>
        }
        open={showConfirmModal}
        onOk={handleConfirmSubmit}
        onCancel={() => setShowConfirmModal(false)}
        okText="Xác Nhận Tạo"
        cancelText="Hủy Bỏ"
        confirmLoading={creatingAccount}
        width={600}
      >
        {formData && (
          <div style={{ padding: '16px 0' }}>
            <Alert
              message="Vui lòng kiểm tra kỹ thông tin trước khi xác nhận"
              type="warning"
              showIcon
              style={{ marginBottom: 24 }}
            />
            
            <Space direction="vertical" size={16} style={{ width: '100%' }}>
              <div>
                <Text strong>Khách hàng: </Text>
                <Text>{customerInfo?.fullName || customerInfo?.cusCode}</Text>
              </div>
              <div>
                <Text strong>CMND/CCCD: </Text>
                <Text>{customerInfo?.identityNo || '-'}</Text>
              </div>
              <div>
                <Text strong>Gói lãi suất: </Text>
                <Text>{selectedDeposit?.name}</Text>
              </div>
              <div>
                <Text strong>Lãi suất: </Text>
                <Text style={{ color: '#52c41a', fontWeight: 'bold' }}>
                  {selectedDeposit?.interestRate}%/năm
                </Text>
              </div>
              <div>
                <Text strong>Số tiền gửi: </Text>
                <Text style={{ fontSize: '16px', fontWeight: 'bold' }}>
                  {formatCurrency(formData.balance)}
                </Text>
              </div>
              <div>
                <Text strong>Kỳ hạn: </Text>
                <Text>{formData.term} tháng</Text>
              </div>
              <div>
                <Text strong>Số tiền dự kiến nhận: </Text>
                <Text style={{ color: '#52c41a', fontSize: '18px', fontWeight: 'bold' }}>
                  {formatCurrency(calculateExpectedAmount())}
                </Text>
              </div>
            </Space>
          </div>
        )}
      </Modal>

      {/* Success Modal */}
      <Modal
        title={
          <Space>
            <CheckCircleOutlined style={{ color: '#52c41a', fontSize: '24px' }} />
            Tạo Tài Khoản Thành Công
          </Space>
        }
        open={showSuccessModal}
        onOk={() => setShowSuccessModal(false)}
        cancelButtonProps={{ style: { display: 'none' } }}
        okText="Đóng"
        width={700}
      >
        {createdAccount && (
          <div className="success-message">
            <div className="success-icon">
              <CheckCircleOutlined />
            </div>
            <Space direction="vertical" size={16} style={{ width: '100%' }}>
              <Alert
                message="Tài khoản tiết kiệm đã được tạo thành công!"
                description="Tài khoản đang chờ phê duyệt. Bạn sẽ nhận được thông báo qua email khi tài khoản được kích hoạt."
                type="success"
                showIcon
              />
              
              <div style={{ background: '#f9f9f9', padding: '16px', borderRadius: '8px' }}>
                <Space direction="vertical" size={8} style={{ width: '100%' }}>
                  <div>
                    <Text strong>Số tài khoản: </Text>
                    <Text code style={{ fontSize: '16px' }}>{createdAccount.accountNumber}</Text>
                  </div>
                  <div>
                    <Text strong>Loại tiết kiệm: </Text>
                    <Text>{createdAccount.depositTypeName}</Text>
                  </div>
                  <div>
                    <Text strong>Số tiền gửi: </Text>
                    <Text>{formatCurrency(createdAccount.balance)}</Text>
                  </div>
                  <div>
                    <Text strong>Kỳ hạn: </Text>
                    <Text>{createdAccount.term} tháng</Text>
                  </div>
                  <div>
                    <Text strong>Ngày đáo hạn: </Text>
                    <Text>{dayjs(createdAccount.maturityDate).format('DD/MM/YYYY')}</Text>
                  </div>
                  <div>
                    <Text strong>Trạng thái: </Text>
                    <Tag color="orange">{createdAccount.approvalStatus}</Tag>
                  </div>
                </Space>
              </div>
            </Space>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default CreateSavingAccountPage;
