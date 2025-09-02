import React, { useEffect, useState } from 'react';
import { 
  Modal, 
  Form, 
  Input, 
  InputNumber, 
  message, 
  Button,
  Space,
  Alert,
  Tooltip,
  Progress,
  Divider
} from 'antd';
import {
  BankOutlined,
  PercentageOutlined,
  InfoCircleOutlined,
  SaveOutlined,
  CloseOutlined,
  CheckCircleOutlined,
  ExclamationCircleOutlined
} from '@ant-design/icons';
import { Deposit } from '../../../../shared/interface/Deposit';
import { DataDetailViewProps } from '../../../../shared/interface/DataDetailView';
import { useCreateSysPendingTaskMutation } from '../../../../service/sys-pending-task.api';
import "./DepositManagement.css";

interface FormData {
  code: string;
  name: string;
  description?: string;
  interestRate: number;
}

const DepositDetailView: React.FC<DataDetailViewProps> = (props) => {
  const { visible = false, data = null, onClose, onSubmit } = props;
  
  const [form] = Form.useForm();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [validationProgress, setValidationProgress] = useState(0);
  const [formErrors, setFormErrors] = useState<string[]>([]);
  const isEdit = !!data;

  // Form validation rules
  const validationRules = {
    code: [
      { required: true, message: 'Mã gói lãi suất không được để trống' },
      { min: 2, max: 50, message: 'Mã gói phải từ 2-50 ký tự' },
      { pattern: /^[A-Z0-9_]+$/, message: 'Mã chỉ được chứa chữ hoa, số và dấu gạch dưới' }
    ],
    name: [
      { required: true, message: 'Tên gói lãi suất không được để trống' },
      { min: 5, max: 255, message: 'Tên gói phải từ 5-255 ký tự' }
    ],
    description: [
      { max: 1000, message: 'Mô tả không được vượt quá 1000 ký tự' }
    ],
    interestRate: [
      { required: true, message: 'Lãi suất không được để trống' },
      { type: 'number' as const, min: 0.0001, message: 'Lãi suất phải lớn hơn 0' },
      { type: 'number' as const, max: 50, message: 'Lãi suất không được vượt quá 50%/năm' }
    ]
  };

  // Calculate form validation progress
  const calculateValidationProgress = () => {
    const values = form.getFieldsValue();
    const fields = ['code', 'name', 'interestRate'];
    const completedFields = fields.filter(field => {
      const value = values[field];
      return value && value.toString().trim() !== '';
    });
    return Math.round((completedFields.length / fields.length) * 100);
  };

  // Real-time validation
  const handleFieldChange = () => {
    const progress = calculateValidationProgress();
    setValidationProgress(progress);
    
    // Check for errors
    const fieldErrors = form.getFieldsError();
    const errorMessages = fieldErrors
      .filter(field => field.errors.length > 0)
      .map(field => field.errors[0]);
    setFormErrors(errorMessages);
  };

  const formatInterestRate = (value: number) => {
    if (!value) return '';
    return `${value}%/năm`;
  };

  const validateForm = async (): Promise<boolean> => {
    try {
      await form.validateFields();
      return true;
    } catch (error) {
      const fieldErrors = form.getFieldsError();
      const errorMessages = fieldErrors
        .filter(field => field.errors.length > 0)
        .map(field => field.errors[0]);
      setFormErrors(errorMessages);
      return false;
    }
  };

  const handleSave = async () => {
    const isValid = await validateForm();
    if (!isValid) {
      message.error({
        content: 'Vui lòng kiểm tra và sửa các lỗi trong form',
        icon: <ExclamationCircleOutlined style={{ color: '#ff4d4f' }} />
      });
      return;
    }

    setIsSubmitting(true);
    try {
      const values = await form.validateFields();
      const newRecord: Deposit = {
        ...data,
        ...values,
        code: values.code.toUpperCase(),
        name: values.name.trim(),
        description: values.description?.trim(),
      };

      if (onSubmit) {
        await onSubmit(newRecord);
      }
      
      if (onClose) onClose();
    } catch (error) {
      console.error('Form submission error:', error);
      message.error({
        content: 'Có lỗi xảy ra khi lưu dữ liệu',
        icon: <ExclamationCircleOutlined style={{ color: '#ff4d4f' }} />
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    form.resetFields();
    setValidationProgress(0);
    setFormErrors([]);
    if (onClose) onClose();
  };

  useEffect(() => {
    if (visible) {
      if (data) {
        form.setFieldsValue(data);
        setValidationProgress(100);
      } else {
        form.resetFields();
        setValidationProgress(0);
      }
      setFormErrors([]);
    }
  }, [visible, data, form]);

  return (
    <Modal
      title={
        <Space>
          <BankOutlined style={{ color: '#1890ff' }} />
          {isEdit ? 'Chỉnh sửa gói lãi suất' : 'Tạo gói lãi suất mới'}
        </Space>
      }
      open={visible}
      onCancel={handleCancel}
      footer={null}
      width={600}
      className="deposit-modal"
      destroyOnClose
    >
      <div className="deposit-form-section">
        {/* Progress indicator */}
        <div style={{ marginBottom: 24 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
            <span style={{ color: '#666', fontSize: '14px' }}>Tiến độ hoàn thành</span>
            <span style={{ color: '#1890ff', fontSize: '14px', fontWeight: 600 }}>
              {validationProgress}%
            </span>
          </div>
          <Progress 
            percent={validationProgress} 
            showInfo={false}
            strokeColor={{
              '0%': '#108ee9',
              '100%': '#87d068',
            }}
          />
        </div>

        {/* Form errors alert */}
        {formErrors.length > 0 && (
          <Alert
            message="Cần khắc phục các lỗi sau:"
            description={
              <ul style={{ margin: 0, paddingLeft: 20 }}>
                {formErrors.map((error, index) => (
                  <li key={index}>{error}</li>
                ))}
              </ul>
            }
            type="error"
            showIcon
            style={{ marginBottom: 24 }}
          />
        )}

        {/* Form */}
        <Form 
          layout="vertical" 
          form={form}
          onValuesChange={handleFieldChange}
          autoComplete="off"
        >
          <div className="deposit-form-section">
            <h4 className="deposit-form-section-title">Thông tin cơ bản</h4>
            
            <Form.Item 
              name="code" 
              label={<span className="deposit-form-label required">Mã gói lãi suất</span>}
              rules={validationRules.code}
              help="Mã gói chỉ được chứa chữ hoa, số và dấu gạch dưới (VD: SAVE_6M, TERM_12M)"
            >
              <Input 
                className="deposit-form-input"
                placeholder="Nhập mã gói lãi suất (VD: SAVE_6M)"
                maxLength={50}
                style={{ textTransform: 'uppercase' }}
              />
            </Form.Item>

            <Form.Item 
              name="name" 
              label={<span className="deposit-form-label required">Tên gói lãi suất</span>}
              rules={validationRules.name}
            >
              <Input 
                className="deposit-form-input"
                placeholder="Nhập tên gói lãi suất (VD: Tiết kiệm 6 tháng)"
                maxLength={255}
              />
            </Form.Item>

            <Form.Item 
              name="description" 
              label={<span className="deposit-form-label">Mô tả chi tiết</span>}
              rules={validationRules.description}
            >
              <Input.TextArea 
                className="deposit-form-textarea"
                rows={4}
                placeholder="Mô tả chi tiết về gói lãi suất này..."
                maxLength={1000}
                showCount
              />
            </Form.Item>
          </div>

          <Divider />

          <div className="deposit-form-section">
            <h4 className="deposit-form-section-title">Thông tin lãi suất</h4>
            
            <Form.Item 
              name="interestRate" 
              label={<span className="deposit-form-label required">Lãi suất (%/năm)</span>}
              rules={validationRules.interestRate}
              help={
                <Space>
                  <InfoCircleOutlined style={{ color: '#1890ff' }} />
                  <span>Lãi suất từ 0.0001% đến 50%/năm, tối đa 4 chữ số thập phân</span>
                </Space>
              }
            >
              <InputNumber 
                className="deposit-form-number"
                style={{ width: '100%' }}
                min={0.0001}
                max={50}
                step={0.0001}
                precision={4}
                placeholder="Nhập lãi suất (VD: 7.5)"
                formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                parser={(value) => value!.replace(/\$\s?|(,*)/g, '') as any}
              />
            </Form.Item>
          </div>

          {/* Preview section */}
          {validationProgress > 50 && (
            <div className="deposit-preview-section">
              <h4 className="deposit-preview-title">
                <CheckCircleOutlined style={{ color: '#52c41a', marginRight: 8 }} />
                Xem trước thông tin
              </h4>
              <div className="deposit-preview-grid">
                <div className="deposit-preview-item">
                  <span className="deposit-preview-label">Mã gói:</span>
                  <span className="deposit-preview-value">
                    {form.getFieldValue('code')?.toUpperCase() || 'Chưa nhập'}
                  </span>
                </div>
                <div className="deposit-preview-item">
                  <span className="deposit-preview-label">Tên gói:</span>
                  <span className="deposit-preview-value">
                    {form.getFieldValue('name') || 'Chưa nhập'}
                  </span>
                </div>
                <div className="deposit-preview-item">
                  <span className="deposit-preview-label">Lãi suất:</span>
                  <span className="deposit-preview-value" style={{ color: '#52c41a', fontWeight: 'bold' }}>
                    {form.getFieldValue('interestRate') ? 
                      `${form.getFieldValue('interestRate')}%/năm` : 'Chưa nhập'}
                  </span>
                </div>
              </div>
            </div>
          )}
        </Form>

        {/* Footer */}
        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 12, marginTop: 32 }}>
          <Button 
            icon={<CloseOutlined />}
            onClick={handleCancel}
            disabled={isSubmitting}
          >
            Hủy bỏ
          </Button>
          <Button 
            type="primary"
            icon={<SaveOutlined />}
            onClick={handleSave}
            loading={isSubmitting}
            disabled={validationProgress < 75}
          >
            {isEdit ? 'Cập nhật gói lãi suất' : 'Tạo gói lãi suất'}
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default DepositDetailView;
