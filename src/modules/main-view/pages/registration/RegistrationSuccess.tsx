import React from "react";
import { CheckCircleOutlined } from "@ant-design/icons";
import { Button, Card, Col, Row, Spin, Typography } from "antd";

const { Title, Paragraph } = Typography;

const RegistrationSuccess: React.FC = () => {
  const handleContinue = () => {
    // Ví dụ: chuyển hướng về trang đăng nhập
    window.location.href = "/sign-in";
  };

  return (
    <Row className="success">
      <Col
        className="SECTION-LEFT"
        lg={{ span: 12, order: 1 }}
        md={{ span: 24, order: 2 }}
        xs={{ span: 24, order: 2 }}
        sm={{ span: 24, order: 2 }}
        style={{ paddingTop: "3%", height: "100%" }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            minHeight: "100vh",
            backgroundColor: "#f0f2f5",
            padding: 16,
          }}
        >
          <Card
            style={{
              maxWidth: 500,
              width: "100%",
              textAlign: "center",
              borderRadius: 12,
              boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
            }}
          >
            <CheckCircleOutlined
              style={{ fontSize: 64, color: "#52c41a", marginBottom: 16 }}
            />

            <Title level={3}>Đăng ký thành công</Title>

            <Paragraph>
              Quý khách đã hoàn tất đăng ký tài khoản thành công.
              <br />
              Vui lòng đăng nhập để bắt đầu sử dụng các dịch vụ ngân hàng trực
              tuyến.
            </Paragraph>

            <Button
              type="primary"
              size="large"
              style={{ marginTop: 24 }}
              onClick={handleContinue}
            >
              Đăng nhập ngay
            </Button>
          </Card>
        </div>
      </Col>
      <Col
        lg={{ span: 12, order: 2 }}
        md={{ span: 24, order: 1 }}
        xs={{ span: 24, order: 1 }}
        sm={{ span: 24, order: 1 }}
      >
        <img
          className="SECTION-RIGHT"
          src={"../images/registration.jpg"}
          alt="Registration Image"
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
      </Col>
    </Row>
  );
};

export default RegistrationSuccess;
