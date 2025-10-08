import React, { useState } from 'react';
import {
  Table,
  Button,
  Card,
  Space,
  Tag,
  Modal,
  Form,
  Input,
  Select,
  DatePicker,
  message,
  Popconfirm,
  Typography,
  Row,
  Col,
} from 'antd';
import {
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
  ExclamationCircleOutlined,
  ClearOutlined,
} from '@ant-design/icons';
import type { ColumnsType } from 'antd/es/table';
import dayjs from 'dayjs';
import {
  useGetAllAmlRecordsQuery,
  useCreateAmlRecordMutation,
  useUpdateAmlRecordMutation,
  useDeactivateAmlRecordMutation,
  useCleanupExpiredRecordsMutation,
  AmlRecord,
  AmlRecordCreateRequest,
  AmlRecordUpdateRequest,
} from '../../../../service/aml.api';

const { Title } = Typography;
const { Option } = Select;
const { TextArea } = Input;

interface AmlModalData extends Partial<AmlRecord> {
  isEdit?: boolean;
}

const AmlManagementPage: React.FC = () => {
  const [form] = Form.useForm();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [modalData, setModalData] = useState<AmlModalData | null>(null);

  // RTK Query hooks
  const { data: amlRecords = [], isLoading, refetch } = useGetAllAmlRecordsQuery();
  const [createAmlRecord, { isLoading: isCreating }] = useCreateAmlRecordMutation();
  const [updateAmlRecord, { isLoading: isUpdating }] = useUpdateAmlRecordMutation();
  const [deactivateAmlRecord] = useDeactivateAmlRecordMutation();
  const [cleanupExpiredRecords] = useCleanupExpiredRecordsMutation();

  // Risk level colors
  const getRiskLevelColor = (level: string) => {
    switch (level) {
      case 'LOW': return 'green';
      case 'MEDIUM': return 'orange';
      case 'HIGH': return 'red';
      case 'CRITICAL': return 'purple';
      default: return 'default';
    }
  };

  // Table columns
  const columns: ColumnsType<AmlRecord> = [
    {
      title: 'Họ tên',
      dataIndex: 'fullName',
      key: 'fullName',
      width: 200,
    },
    {
      title: 'CMND/CCCD',
      dataIndex: 'identityNo',
      key: 'identityNo',
      width: 150,
      render: (text) => text || '-',
    },
    {
      title: 'Số điện thoại',
      dataIndex: 'phone',
      key: 'phone',
      width: 150,
      render: (text) => text || '-',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
      width: 200,
      render: (text) => text || '-',
    },
    {
      title: 'Mức độ rủi ro',
      dataIndex: 'riskLevel',
      key: 'riskLevel',
      width: 120,
      render: (level) => (
        <Tag color={getRiskLevelColor(level)}>
          {level}
        </Tag>
      ),
    },
    {
      title: 'Lý do',
      dataIndex: 'reason',
      key: 'reason',
      width: 250,
      ellipsis: true,
    },
    {
      title: 'Hết hạn',
      dataIndex: 'expiresAt',
      key: 'expiresAt',
      width: 150,
      render: (date) => date ? dayjs(date).format('DD/MM/YYYY') : 'Không giới hạn',
    },
    {
      title: 'Trạng thái',
      dataIndex: 'isActive',
      key: 'isActive',
      width: 100,
      render: (isActive) => (
        <Tag color={isActive ? 'green' : 'red'}>
          {isActive ? 'Hoạt động' : 'Vô hiệu'}
        </Tag>
      ),
    },
    {
      title: 'Ngày tạo',
      dataIndex: 'createdAt',
      key: 'createdAt',
      width: 150,
      render: (date) => date ? dayjs(date).format('DD/MM/YYYY HH:mm') : '-',
    },
    {
      title: 'Thao tác',
      key: 'action',
      width: 150,
      fixed: 'right',
      render: (_, record) => (
        <Space>
          <Button
            type="link"
            icon={<EditOutlined />}
            onClick={() => openEditModal(record)}
            size="small"
          >
            Sửa
          </Button>
          <Popconfirm
            title="Xác nhận"
            description="Bạn có chắc muốn vô hiệu hóa bản ghi này?"
            onConfirm={() => handleDeactivate(record.id!)}
            okText="Đồng ý"
            cancelText="Hủy"
          >
            <Button
              type="link"
              danger
              icon={<DeleteOutlined />}
              size="small"
            >
              Vô hiệu
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  // Open create modal
  const openCreateModal = () => {
    setModalData({ isEdit: false });
    setIsModalVisible(true);
    form.resetFields();
  };

  // Open edit modal
  const openEditModal = (record: AmlRecord) => {
    setModalData({ ...record, isEdit: true });
    setIsModalVisible(true);
    form.setFieldsValue({
      ...record,
      expiresAt: record.expiresAt ? dayjs(record.expiresAt) : null,
    });
  };

  // Close modal
  const closeModal = () => {
    setIsModalVisible(false);
    setModalData(null);
    form.resetFields();
  };

  // Handle form submit
  const handleSubmit = async (values: any) => {
    try {
      const formData = {
        ...values,
        expiresAt: values.expiresAt ? values.expiresAt.toISOString() : null,
      };

      if (modalData?.isEdit) {
        // Update
        const updateData: AmlRecordUpdateRequest = {
          id: modalData.id!,
          reason: formData.reason,
          riskLevel: formData.riskLevel,
          isActive: formData.isActive,
          expiresAt: formData.expiresAt,
        };
        await updateAmlRecord(updateData).unwrap();
        message.success('Cập nhật bản ghi AML thành công');
      } else {
        // Create
        const createData: AmlRecordCreateRequest = {
          fullName: formData.fullName,
          identityNo: formData.identityNo,
          phone: formData.phone,
          email: formData.email,
          reason: formData.reason,
          riskLevel: formData.riskLevel,
          expiresAt: formData.expiresAt,
        };
        await createAmlRecord(createData).unwrap();
        message.success('Tạo bản ghi AML thành công');
      }

      closeModal();
      refetch();
    } catch (error: any) {
      message.error(error?.data?.message || 'Có lỗi xảy ra');
    }
  };

  // Handle deactivate
  const handleDeactivate = async (id: number) => {
    try {
      await deactivateAmlRecord(id).unwrap();
      message.success('Vô hiệu hóa bản ghi thành công');
      refetch();
    } catch (error: any) {
      message.error(error?.data?.message || 'Có lỗi xảy ra');
    }
  };

  // Handle cleanup expired records
  const handleCleanupExpired = async () => {
    try {
      await cleanupExpiredRecords().unwrap();
      message.success('Dọn dẹp bản ghi hết hạn thành công');
      refetch();
    } catch (error: any) {
      message.error(error?.data?.message || 'Có lỗi xảy ra');
    }
  };

  return (
    <div style={{ padding: '24px' }}>
      <Card>
        <div style={{ marginBottom: '16px' }}>
          <Row justify="space-between" align="middle">
            <Col>
              <Title level={3}>Quản lý danh sách AML</Title>
            </Col>
            <Col>
              <Space>
                <Button
                  type="default"
                  icon={<ClearOutlined />}
                  onClick={handleCleanupExpired}
                >
                  Dọn dẹp hết hạn
                </Button>
                <Button
                  type="primary"
                  icon={<PlusOutlined />}
                  onClick={openCreateModal}
                >
                  Thêm bản ghi AML
                </Button>
              </Space>
            </Col>
          </Row>
        </div>

        <Table
          columns={columns}
          dataSource={amlRecords}
          rowKey="id"
          loading={isLoading}
          scroll={{ x: 1400 }}
          pagination={{
            showSizeChanger: true,
            showQuickJumper: true,
            showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} items`,
          }}
        />
      </Card>

      {/* Add/Edit Modal */}
      <Modal
        title={modalData?.isEdit ? 'Chỉnh sửa bản ghi AML' : 'Thêm bản ghi AML'}
        open={isModalVisible}
        onCancel={closeModal}
        footer={null}
        width={600}
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={handleSubmit}
        >
          {!modalData?.isEdit && (
            <>
              <Form.Item
                name="fullName"
                label="Họ tên"
                rules={[{ required: true, message: 'Vui lòng nhập họ tên' }]}
              >
                <Input placeholder="Nhập họ tên" />
              </Form.Item>

              <Row gutter={16}>
                <Col span={12}>
                  <Form.Item
                    name="identityNo"
                    label="CMND/CCCD"
                  >
                    <Input placeholder="Nhập số CMND/CCCD" />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    name="phone"
                    label="Số điện thoại"
                  >
                    <Input placeholder="Nhập số điện thoại" />
                  </Form.Item>
                </Col>
              </Row>

              <Form.Item
                name="email"
                label="Email"
                rules={[{ type: 'email', message: 'Email không đúng định dạng' }]}
              >
                <Input placeholder="Nhập email" />
              </Form.Item>
            </>
          )}

          <Form.Item
            name="reason"
            label="Lý do đưa vào blacklist"
            rules={[{ required: true, message: 'Vui lòng nhập lý do' }]}
          >
            <TextArea rows={3} placeholder="Nhập lý do" />
          </Form.Item>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="riskLevel"
                label="Mức độ rủi ro"
                rules={[{ required: true, message: 'Vui lòng chọn mức độ rủi ro' }]}
              >
                <Select placeholder="Chọn mức độ rủi ro">
                  <Option value="LOW">Thấp</Option>
                  <Option value="MEDIUM">Trung bình</Option>
                  <Option value="HIGH">Cao</Option>
                  <Option value="CRITICAL">Rất cao</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="expiresAt"
                label="Ngày hết hạn"
              >
                <DatePicker
                  style={{ width: '100%' }}
                  placeholder="Chọn ngày hết hạn"
                  format="DD/MM/YYYY"
                />
              </Form.Item>
            </Col>
          </Row>

          {modalData?.isEdit && (
            <Form.Item
              name="isActive"
              label="Trạng thái"
              rules={[{ required: true, message: 'Vui lòng chọn trạng thái' }]}
            >
              <Select>
                <Option value={true}>Hoạt động</Option>
                <Option value={false}>Vô hiệu</Option>
              </Select>
            </Form.Item>
          )}

          <Form.Item style={{ textAlign: 'right', marginBottom: 0 }}>
            <Space>
              <Button onClick={closeModal}>
                Hủy
              </Button>
              <Button
                type="primary"
                htmlType="submit"
                loading={isCreating || isUpdating}
              >
                {modalData?.isEdit ? 'Cập nhật' : 'Tạo mới'}
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default AmlManagementPage;













