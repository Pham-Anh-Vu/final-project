/*!
=========================================================
* Muse Ant Design Dashboard - v1.0.0
=========================================================
* Product Page: https://www.creative-tim.com/product/muse-ant-design-dashboard
* Copyright 2021 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/muse-ant-design-dashboard/blob/main/LICENSE.md)
* Coded by Creative Tim
=========================================================
* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/
import {
  Row,
  Col,
  Card,
  Radio,
  Table,
  Upload,
  message,
  Progress,
  Button,
  Avatar,
  Typography,
  Space,
  Input,
} from "antd";

import { SearchOutlined, ToTopOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";

// Images
import ava1 from "../assets/images/logo-shopify.svg";
import ava2 from "../assets/images/logo-atlassian.svg";
import ava3 from "../assets/images/logo-slack.svg";
import ava5 from "../assets/images/logo-jira.svg";
import ava6 from "../assets/images/logo-invision.svg";
import face from "../assets/images/face-1.jpg";
import face2 from "../assets/images/face-2.jpg";
import face3 from "../assets/images/face-3.jpg";
import face4 from "../assets/images/face-4.jpg";
import face5 from "../assets/images/face-5.jpeg";
import face6 from "../assets/images/face-6.jpeg";
import pencil from "../assets/images/pencil.svg";
import React, { useMemo, useState } from "react";
import { ColumnsType } from "antd/es/table";
import { styled } from "styled-components";
import { useGetAllCustomersQuery, Customer } from "../../../service/customer.api";

const { Title } = Typography;

const CenteredPlaceholderSearch = styled(Input.Search)`
  input::placeholder {
    text-align: center;
    height: 20px;
  }
  input {
    text-align: center;
  }
`;

const formProps = {
  name: "file",
  action: "https://www.mocky.io/v2/5cc8019d300000980a055e76",
  headers: {
    authorization: "authorization-text",
  },
  onChange(info) {
    if (info.file.status !== "uploading") {
      console.log(info.file, info.fileList);
    }
    if (info.file.status === "done") {
      message.success(`${info.file.name} file uploaded successfully`);
    } else if (info.file.status === "error") {
      message.error(`${info.file.name} file upload failed.`);
    }
  },
};
function Tables() {
  const { data: customers = [], isLoading } = useGetAllCustomersQuery();
  const [searchText, setSearchText] = useState("");

  const filteredData = useMemo(() => {
    if (!searchText) return customers;
    return customers.filter((item) =>
      [item.fullName, item.email, item.phone, item.cusCode]
        .some((field) =>
          field?.toLowerCase().includes(searchText.toLowerCase())
        )
    );
  }, [searchText, customers]);

  const columns: ColumnsType<Customer> = [
    {
      title: "Họ tên",
      dataIndex: "fullName",
      key: "fullName",
      sorter: (a, b) => a.fullName.localeCompare(b.fullName),
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      sorter: (a, b) => (a.email || "").localeCompare(b.email || ""),
    },
    {
      title: "Số điện thoại",
      dataIndex: "phone",
      key: "phone",
      sorter: (a, b) => (a.phone || "").localeCompare(b.phone || ""),
    },
    {
      title: "Mã KH",
      dataIndex: "cusCode",
      key: "cusCode",
      sorter: (a, b) => (a.cusCode || "").localeCompare(b.cusCode || ""),
    },
    {
      title: "Số dư",
      dataIndex: "totalBalance",
      key: "totalBalance",
      sorter: (a, b) => (a.totalBalance || 0) - (b.totalBalance || 0),
      render: (value) =>
        value != null ? new Intl.NumberFormat("vi-VN").format(value) + " ₫" : "-",
    },
    {
      title: "Ngày tạo",
      dataIndex: "createdAt",
      key: "createdAt",
      sorter: (a, b) =>
        new Date(a.createdAt || "").getTime() -
        new Date(b.createdAt || "").getTime(),
      render: (value) =>
        value ? new Date(value).toLocaleString("vi-VN") : "-",
    },
  ];

  return (
    <div
    >
      <Space
        direction="horizontal"
        size="middle"
        style={{ marginBottom: 16, width: "100%" }}
      >
        <Input
          placeholder="Tìm kiếm theo tên, email, số điện thoại, mã KH"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          allowClear
          style={{
            width: 400,
            height: 40,
            textAlign: "center",
            fontSize: 16,
            borderRadius: 8,
          }}
        />
        <Button
          type="primary"
          icon={<SearchOutlined />}
          style={{ height: 40, borderRadius: 8 }}
        >
          Tìm
        </Button>
      </Space>

      <Table
        loading={isLoading}
        dataSource={filteredData}
        columns={columns}
        rowKey="id"
        bordered
        pagination={{ pageSize: 7 }}
        style={{ background: "white", borderRadius: 12 }}
      />
    </div>
  );
}

export default Tables;
