import React, { useEffect, useState } from "react";
import { useGetAllSysPendingTasksQuery } from "../../../../service/sys-pending-task.api";
import { ColumnsType } from "antd/es/table";
import { SysPendingTask } from "../../../../shared/interface/SysPendingTask";
import { Button, Card, Col, message, Modal, Row, Tag } from "antd";
import { screenMap } from "../../../../shared/mapping-view/screenMap";
import {
  approveEntity,
  useApproveEntityMutation,
} from "../../../../service/approval.api";
import { useGetDepositByIdQuery } from "../../../../service/deposit.api";
import { useAppSelector } from "../../../../hooks/hooks";
import { Table } from "antd/lib";
import { ClockCircleOutlined } from "@ant-design/icons";
import { ProfessionalHeader } from "../../../../components/common/ProfessionalHeader";
import "./index.css";

function SysPendingTaskListView() {
  const [currentScreenKey, setCurrentScreenKey] = useState<string | null>(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [dataSyspendingTask, setDataSysPendingTask] =
    useState<SysPendingTask | null>(null);
  const [isUser, setIsUser] = useState(true);

  const auth = useAppSelector((state) => state.auth);
  const { data: pendingTasks, refetch } = useGetAllSysPendingTasksQuery();
  const {
    data: deposit,
    isLoading,
    isError,
    isSuccess,
  } = useGetDepositByIdQuery(dataSyspendingTask?.identifyId!, {
    skip: !dataSyspendingTask?.identifyId,
  });

  const [
    approveEntity,
    {
      isLoading: isLoadingApprovalEntity,
      isSuccess: isSuccessApprovalEntity,
      isError: isErrorApprovalEntity,
      error,
    },
  ] = useApproveEntityMutation();
  const columns: ColumnsType<SysPendingTask> = [
    {
      title: "Tên tác vụ",
      dataIndex: "menuMappingName",
      key: "menuMappingName",
    },
    {
      title: "Mã tác vụ",
      dataIndex: "identifyId",
      key: "identifyId",
    },
    {
      title: "Hành động",
      dataIndex: "taskAction",
      key: "taskAction",
    },
    {
      title: "Người tạo",
      dataIndex: "createdBy",
      key: "createdBy",
    },
    {
      title: "Thời gian tạo",
      dataIndex: "createdAt",
      key: "createdAt",
    },
    {
      title: "Trạng thái",
      dataIndex: "apprStatus",
      key: "apprStatus",
      render: (status) => {
        const color =
          status === "N" ? "gold" : status === "A" ? "green" : "red";
        const label =
          status === "N" ? "Đang chờ" : status === "A" ? "Đã duyệt" : "Từ chối";
        return <Tag color={color}>{label}</Tag>;
      },
    },
    {
      key: "action",
      render: (_, record) => (
        <Button
          type="primary"
          size="small"
          onClick={() => {
            console.log("Selected Task:", record);
            setDataSysPendingTask(record);
            handleOpenModal(record.secretKey);
          }}
        >
          Xem chi tiết
        </Button>
      ),
    },
  ];

  const handleOpenModal = (screenKey: string) => {
    setCurrentScreenKey(screenKey);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
    setCurrentScreenKey(null);
    setDataSysPendingTask(null);
  };

  const ScreenComponent = currentScreenKey ? screenMap[currentScreenKey] : null;
  const screenData = {
    onClose: closeModal,
    onSubmit: () => {
      const approvalData = {
        delegateName: dataSyspendingTask?.classCallBack || "",
        id: dataSyspendingTask?.entityId || 0,
      };
      approveEntity(approvalData)
        .unwrap()
        .then(() => {
          message.success("Duyệt thành công");
          closeModal();
          refetch(); // Refresh the pending tasks list
        })
        .catch((error) => {
          console.error("Error approving entity:", error);
          message.error("Duyệt thất bại");
        });
    },
    visible: modalVisible,
    data: deposit,
    taskData: dataSyspendingTask, // Pass task data for AML approval
  };

  const RenderScreen = () => {
    if (!ScreenComponent) return <p>Không tìm thấy màn hình</p>;
    return ScreenComponent(screenData);
  };

  useEffect(() => {
    refetch();
  }, []);
  useEffect(() => {
    console.log("auth", auth.accessToken);
    const payload = JSON.parse(atob(auth.accessToken.split(".")[1]));
    const roles = payload.realm_access?.roles || [];
    // Kiểm tra xem người dùng có phải là ADMIN, GDV và KSV không
    if (
      roles.includes("ADMIN") ||
      roles.includes("GDV") ||
      roles.includes("KSV")
    ) {
      setIsUser(false);
    }
  }, [auth]);

  useEffect(() => {
    console.log("Screen Data:", screenData);
  }, [screenData]);
  return (
    <div>
      {!isUser && (
        <Row gutter={[24, 0]}>
          <Col
            xs={24}
            sm={24}
            md={12}
            lg={12}
            xl={24}
            style={{ width: "100%" }}
          >
            <Card style={{ borderRadius: 12, overflow: 'hidden', marginBottom: 24 }}>
              <ProfessionalHeader
                icon={<ClockCircleOutlined />}
                title="Tác Vụ Chờ Duyệt"
                subtitle="Danh sách các tác vụ đang chờ phê duyệt từ quản lý"
                variant="warning"
                size="medium"
              />
            </Card>
          </Col>

          <Col
            xs={24}
            sm={24}
            md={12}
            lg={12}
            xl={24}
            style={{ width: "100%" }}
            className="mb-24"
          >
            <Card
              title="Danh sách tác vụ chờ duyệt"
              bordered
              style={{ borderRadius: 12 }}
            >
              <Table columns={columns} dataSource={pendingTasks} rowKey="id" />

              <Modal
                open={modalVisible}
                onCancel={closeModal}
                footer={null}
                width={300}
                destroyOnClose={true}
              >
                <RenderScreen />
              </Modal>
            </Card>
          </Col>
        </Row>
      )}
    </div>
  );
}

export default SysPendingTaskListView;
