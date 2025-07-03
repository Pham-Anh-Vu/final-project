import React, { useEffect } from 'react';
import { Modal, Form, Input, InputNumber, message } from 'antd';
import { Deposit } from '../../../../shared/interface/Deposit';
import { DataDetailViewProps } from '../../../../shared/interface/DataDetailView';

const DepositDetailView: React.FC<DataDetailViewProps> = (props) => {
  const { visible = false, data = null, onClose, onSubmit } = props;
  const [form] = Form.useForm();

  useEffect(() => {
    if (visible) {
      if (data) form.setFieldsValue(data);
      else form.resetFields();
    }
  }, [visible, data, form]);

  const handleSave = async () => {
    try {
      const values = await form.validateFields();
      const newRecord: Deposit = {
        id: data?.id || Date.now(),
        ...data,
        ...values,
      };

      if (onSubmit) onSubmit(newRecord);
      message.success('Đã lưu loại tiền gửi');
    } catch {
      // validation failed
    }
  };

  return (
    <Modal
      title={data ? 'Chỉnh sửa loại tiền gửi' : 'Thêm loại tiền gửi'}
      open={visible}
      onCancel={onClose}
      onOk={handleSave}
      okText="Lưu"
      cancelText="Huỷ"
      destroyOnClose
    >
      <Form layout="vertical" form={form}>
        <Form.Item name="code" label="Mã loại" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item name="name" label="Tên loại" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item name="description" label="Mô tả">
          <Input.TextArea rows={3} />
        </Form.Item>
        <Form.Item
          name="interestRate"
          label="Lãi suất (%/năm)"
          rules={[{ required: true }]}
        >
          <InputNumber min={0} max={100} step={0.0001} style={{ width: '100%' }} />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default DepositDetailView;
