import React, { useState } from 'react';
import { Modal, Form, Input, Checkbox, Typography, Alert, Button, Divider, Row, Col, Statistic } from 'antd';
import { useCloseSavingAccountEarlyMutation } from '../../service/saving-account.api';
import { SavingAccountDetail } from '../../service/customer.api';

const { Text, Title } = Typography;
const { TextArea } = Input;

interface EarlyClosureModalProps {
  visible: boolean;
  onCancel: () => void;
  onSuccess: () => void;
  account: SavingAccountDetail | null;
}

interface EarlyClosureCalculation {
  originalBalance: number;
  interestEarned: number;
  penaltyRate: number;
  penaltyAmount: number;
  finalInterest: number;
  totalWithdrawal: number;
  lossFromEarlyClosure: number;
}

const EarlyClosureModal: React.FC<EarlyClosureModalProps> = ({
  visible,
  onCancel,
  onSuccess,
  account
}) => {
  const [form] = Form.useForm();
  const [confirmed, setConfirmed] = useState(false);
  const [calculation, setCalculation] = useState<EarlyClosureCalculation | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [closeSavingAccount, { isLoading }] = useCloseSavingAccountEarlyMutation();

  // Reset state khi modal đóng
  React.useEffect(() => {
    if (!visible) {
      setIsSubmitting(false);
      setConfirmed(false);
      form.resetFields();
    }
  }, [visible, form]);

  // Tính toán preview số tiền nhận được
  React.useEffect(() => {
    if (account) {
      const now = new Date();
      const startDate = new Date(account.startDate);
      const actualDays = Math.floor((now.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24));
      
      // Tính lãi đã tích lũy
      const yearlyRate = account.interestRate / 100;
      const dailyRate = yearlyRate / 365;
      const interestEarned = Math.floor(account.balance * dailyRate * actualDays);
      
      // Tính penalty
      let penaltyRate = 0;
      if (actualDays < 180) {
        penaltyRate = 0.20; // 20% penalty dưới 6 tháng
      } else if (actualDays < 365) {
        penaltyRate = 0.10; // 10% penalty từ 6 tháng đến 1 năm
      }
      
      const penaltyAmount = Math.floor(interestEarned * penaltyRate);
      const finalInterest = interestEarned - penaltyAmount;
      const totalWithdrawal = account.balance + finalInterest;
      
      // Tính lãi dự kiến nếu đến hạn
      const projectedInterest = account.projectedAmount - account.balance;
      const lossFromEarlyClosure = projectedInterest - finalInterest;
      
      setCalculation({
        originalBalance: account.balance,
        interestEarned,
        penaltyRate: penaltyRate * 100,
        penaltyAmount,
        finalInterest,
        totalWithdrawal,
        lossFromEarlyClosure: Math.max(lossFromEarlyClosure, 0)
      });
    }
  }, [account]);

  const formatCurrency = (amount: number): string => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const handleSubmit = async () => {
    if (!account || !confirmed || isSubmitting || isLoading) return;
    
    setIsSubmitting(true);
    
    console.log("Submitting early closure for account:", account.id);

    try {
      const values = await form.validateFields();
      
      const response = await closeSavingAccount({
        savingAccountId: account.id,
        reason: values.reason,
        confirmed: true
      }).unwrap();
      
      if (response.success) {
        Modal.success({
          title: 'Tất toán thành công',
          content: (
            <div>
              <p>Tài khoản tiết kiệm đã được tất toán thành công.</p>
              <p><strong>Số tiền nhận được:</strong> {formatCurrency(response.totalWithdrawal)}</p>
              <p><strong>Số tài khoản:</strong> {response.accountNumber}</p>
            </div>
          ),
          onOk: () => {
            form.resetFields();
            setConfirmed(false);
            setIsSubmitting(false);
            onSuccess();
          }
        });
      } else {
        setIsSubmitting(false);
      }
    } catch (error: any) {
      setIsSubmitting(false);
      Modal.error({
        title: 'Lỗi tất toán',
        content: error?.message || 'Có lỗi xảy ra khi tất toán tài khoản.'
      });
    }
  };

  const handleCancel = () => {
    if (isSubmitting || isLoading) return; // Ngăn đóng modal khi đang submit
    
    form.resetFields();
    setConfirmed(false);
    setIsSubmitting(false);
    onCancel();
  };

  if (!account || !calculation) return null;

  const actualDays = Math.floor((new Date().getTime() - new Date(account.startDate).getTime()) / (1000 * 60 * 60 * 24));
  const remainingDays = account.daysRemaining || 0;

  return (
    <Modal
      title="Tất toán tài khoản tiết kiệm trước hạn"
      open={visible}
      onCancel={handleCancel}
      width={800}
      footer={[
        <Button 
          key="cancel" 
          onClick={handleCancel}
          disabled={isSubmitting || isLoading}
        >
          Hủy bỏ
        </Button>,
        <Button
          key="submit"
          type="primary"
          danger
          onClick={handleSubmit}
          loading={isSubmitting || isLoading}
          disabled={!confirmed || isSubmitting || isLoading}
        >
          {isSubmitting || isLoading ? 'Đang xử lý...' : 'Xác nhận tất toán'}
        </Button>
      ]}
    >
      <div style={{ maxHeight: '70vh', overflowY: 'auto' }}>
        {/* Thông tin tài khoản */}
        <Alert
          message="Thông tin tài khoản tiết kiệm"
          description={
            <Row gutter={16}>
              <Col span={12}>
                <Text strong>Số tài khoản:</Text> {account.accountNumber}
              </Col>
              <Col span={12}>
                <Text strong>Gói lãi suất:</Text> {account.depositTypeName}
              </Col>
              <Col span={12}>
                <Text strong>Số dư gốc:</Text> {formatCurrency(account.balance)}
              </Col>
              <Col span={12}>
                <Text strong>Lãi suất:</Text> {account.interestRate}%/năm
              </Col>
              <Col span={12}>
                <Text strong>Ngày mở:</Text> {new Date(account.startDate).toLocaleDateString('vi-VN')}
              </Col>
              <Col span={12}>
                <Text strong>Ngày đáo hạn:</Text> {new Date(account.maturityDate).toLocaleDateString('vi-VN')}
              </Col>
              <Col span={12}>
                <Text strong>Đã gửi:</Text> {actualDays} ngày
              </Col>
              <Col span={12}>
                <Text strong>Còn lại:</Text> {remainingDays} ngày
              </Col>
            </Row>
          }
          type="info"
          style={{ marginBottom: 16 }}
        />

        {/* Tính toán tất toán */}
        <Title level={5}>Chi tiết tính toán tất toán trước hạn</Title>
        <Row gutter={16} style={{ marginBottom: 16 }}>
          <Col span={12}>
            <Statistic
              title="Số dư gốc"
              value={calculation.originalBalance}
              formatter={(value) => formatCurrency(Number(value))}
            />
          </Col>
          <Col span={12}>
            <Statistic
              title="Lãi đã tích lũy"
              value={calculation.interestEarned}
              formatter={(value) => formatCurrency(Number(value))}
              valueStyle={{ color: '#52c41a' }}
            />
          </Col>
          {calculation.penaltyRate > 0 && (
            <>
              <Col span={12}>
                <Statistic
                  title={`Phí phạt (${calculation.penaltyRate}%)`}
                  value={calculation.penaltyAmount}
                  formatter={(value) => formatCurrency(Number(value))}
                  valueStyle={{ color: '#ff4d4f' }}
                />
              </Col>
              <Col span={12}>
                <Statistic
                  title="Lãi thực nhận"
                  value={calculation.finalInterest}
                  formatter={(value) => formatCurrency(Number(value))}
                  valueStyle={{ color: '#1890ff' }}
                />
              </Col>
            </>
          )}
        </Row>

        <Divider />

        {/* Kết quả cuối cùng */}
        <Row gutter={16} style={{ marginBottom: 16 }}>
          <Col span={12}>
            <Statistic
              title="Tổng số tiền nhận được"
              value={calculation.totalWithdrawal}
              formatter={(value) => formatCurrency(Number(value))}
              valueStyle={{ color: '#52c41a', fontSize: '20px', fontWeight: 'bold' }}
            />
          </Col>
          {calculation.lossFromEarlyClosure > 0 && (
            <Col span={12}>
              <Statistic
                title="Thiệt hại do tất toán sớm"
                value={calculation.lossFromEarlyClosure}
                formatter={(value) => formatCurrency(Number(value))}
                valueStyle={{ color: '#ff4d4f' }}
              />
            </Col>
          )}
        </Row>

        {/* Cảnh báo */}
        {calculation.penaltyRate > 0 && (
          <Alert
            message="Lưu ý về phí phạt"
            description={`Vì tài khoản chưa đến hạn (còn ${remainingDays} ngày), bạn sẽ bị phạt ${calculation.penaltyRate}% trên lãi đã tích lũy. Số tiền phạt: ${formatCurrency(calculation.penaltyAmount)}`}
            type="warning"
            style={{ marginBottom: 16 }}
          />
        )}

        {/* Form lý do và xác nhận */}
        <Form form={form} layout="vertical">
          <Form.Item
            name="reason"
            label="Lý do tất toán trước hạn"
            rules={[
              { required: true, message: 'Vui lòng nhập lý do tất toán' },
              { max: 500, message: 'Lý do không được vượt quá 500 ký tự' }
            ]}
          >
            <TextArea
              rows={3}
              placeholder="Nhập lý do bạn muốn tất toán trước hạn..."
              showCount
              maxLength={500}
            />
          </Form.Item>
          
          <Form.Item>
            <Checkbox
              checked={confirmed}
              onChange={(e) => setConfirmed(e.target.checked)}
            >
              Tôi hiểu và đồng ý với các điều khoản tất toán trước hạn, bao gồm việc chịu phí phạt nếu có.
            </Checkbox>
          </Form.Item>
        </Form>

        <Alert
          message="Lưu ý quan trọng"
          description="Sau khi tất toán, tài khoản tiết kiệm sẽ bị đóng vĩnh viễn và không thể khôi phục. Số tiền sẽ được chuyển về tài khoản chính của bạn."
          type="error"
          style={{ marginTop: 16 }}
        />
      </div>
    </Modal>
  );
};

export default EarlyClosureModal;
