import React, { useState } from 'react';
import { Button, Modal, Table, message, Typography } from 'antd';
import { Deposit } from '../../../../shared/interface/Deposit';
import DepositDetailView from './DepositDetailView';
import { useGetAllDepositQuery } from '../../../../service/deposit.api';
import { DataDetailViewProps } from '../../../../shared/interface/DataDetailView';

const { Text } = Typography;

const DepositListView: React.FC = () => {
  const [selectedDeposit, setSelectedDeposit] = useState<Deposit | null>(null);
  const [isDetailVisible, setIsDetailVisible] = useState(false);
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);

  const { data: fetchedDeposits } = useGetAllDepositQuery();

  const handleAdd = () => {
    setSelectedDeposit(null);
    setIsDetailVisible(true);
  };

  const handleEdit = () => {
    if (selectedDeposit) {
      setIsDetailVisible(true);
    } else {
      message.warning('Vui lòng chọn một dòng để chỉnh sửa.');
    }
  };

  const handleShowDeleteModal = () => {
    if (!selectedDeposit) {
      message.warning('Vui lòng chọn một dòng để xoá.');
      return;
    }
    setIsDeleteModalVisible(true);
  };

  const handleDelete = async () => {
    try {
      // Giả định xoá ở local, thay thế bằng gọi API sau
      message.success(`Đã xoá loại tiền gửi "${selectedDeposit?.name}" thành công.`);
      setSelectedDeposit(null);
      setIsDeleteModalVisible(false);
    } catch (error) {
      message.error('Đã xảy ra lỗi khi xoá.');
    }
  };

  const detailViewProps: DataDetailViewProps = {
    visible: isDetailVisible,
    data: selectedDeposit,
    onClose: () => setIsDetailVisible(false),
    onSubmit: () => setIsDetailVisible(false),
  };

  return (
    <div style={{ padding: 24 }}>
      <h2>Quản lý loại tiền gửi</h2>

      <div style={{ marginBottom: 16, display: 'flex', gap: 8 }}>
        <Button type="primary" onClick={handleAdd}>
          Thêm mới
        </Button>
        <Button onClick={handleEdit} disabled={!selectedDeposit}>
          Chỉnh sửa
        </Button>
        <Button danger onClick={handleShowDeleteModal} disabled={!selectedDeposit}>
          Xoá
        </Button>
      </div>

      <Table
        dataSource={fetchedDeposits}
        rowKey="id"
        rowSelection={{
          type: 'radio',
          selectedRowKeys: selectedDeposit ? [selectedDeposit.id] : [],
          onChange: (_, selectedRows) => setSelectedDeposit(selectedRows[0] || null),
        }}
        columns={[
          { title: 'Mã loại', dataIndex: 'code' },
          { title: 'Tên loại', dataIndex: 'name' },
          { title: 'Mô tả', dataIndex: 'description' },
          { title: 'Lãi suất (%/năm)', dataIndex: 'interestRate' },
        ]}
      />

      <DepositDetailView {...detailViewProps} />

      <Modal
        title="Xác nhận xoá loại tiền gửi"
        open={isDeleteModalVisible}
        onOk={handleDelete}
        onCancel={() => setIsDeleteModalVisible(false)}
        okText="Xoá"
        cancelText="Huỷ"
        okButtonProps={{ danger: true }}
      >
        <p>
          Bạn có chắc chắn muốn xoá loại tiền gửi{' '}
          <Text strong>{selectedDeposit?.name}</Text> không?
        </p>
        <p>
          Thao tác này không thể hoàn tác. Vui lòng xác nhận lại trước khi thực hiện.
        </p>
      </Modal>
    </div>
  );
};

export default DepositListView;
