import React, { useEffect, useState } from "react";
import {
  Form,
  Input,
  Button,
  Typography,
  Alert,
  Space,
  Spin,
  Row,
  Col,
  notification,
} from "antd";
import { useLocation, useNavigate } from "react-router-dom";
import { RegisterRequestBody } from "../../../../shared/interface/RegisterRequestBody";
import axios from "axios";
import { QRResponse } from "../../../../shared/interface/QRResponse";
import { VerifyGARequest } from "../../../../shared/interface/VerifyGARequest";

const { Title, Paragraph, Text, Link } = Typography;

const GoogleAuthenticatorSetup: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [loading, setLoading] = useState(false);
  const [qrLink, setQrLink] = useState<string | null>(null);

  const requestBody = location.state?.requestBody as
    | RegisterRequestBody
    | undefined;

  const onFinish = async (values: any) => {
    await verifyQRCode({
      email: requestBody?.email || "",
      qrCode: values.otpCode,
    })
  };

  const fetchQRCode = async (email: string): Promise<string | null> => {
    setLoading(true);
    try {
      const response = await axios.post<QRResponse>(
        "http://localhost:8081/totp/qrcode",
        { email },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      setLoading(false);

      if (response.status === 200 && response.data.qrCode) {
        setQrLink(response.data.qrCode);
        return response.data.qrCode;
      } else {
        notification.warning({
          message: "Không thể tạo mã xác thực",
          description:
            "Hệ thống không trả về thông tin mã QR. Vui lòng thử lại hoặc liên hệ bộ phận hỗ trợ.",
        });
        return null;
      }
    } catch (error: any) {
      setLoading(false);

      if (error.response) {
        const { status, data } = error.response;
        notification.error({
          message: `Lỗi ${status} - Không thể lấy mã xác thực`,
          description:
            data?.message || "Đã xảy ra lỗi từ hệ thống. Vui lòng thử lại sau.",
        });
      } else if (error.request) {
        notification.error({
          message: "Lỗi kết nối đến hệ thống",
          description:
            "Không nhận được phản hồi từ máy chủ. Vui lòng kiểm tra kết nối mạng hoặc thử lại sau.",
        });
      } else {
        notification.error({
          message: "Lỗi không xác định",
          description:
            error.message ||
            "Hệ thống gặp sự cố bất ngờ. Vui lòng thử lại sau.",
        });
      }
      return null;
    }
  };

  const verifyQRCode = async (data: VerifyGARequest): Promise<boolean> => {
    setLoading(true);
    try {
      const response = await axios.post(
        "http://localhost:8081/totp/verify",
        data,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      setLoading(false);

      if (response.status === 200 && response.data) {
        if( response.data === "true" || response.data === true) {
          navigate("/registration-success")
        }
        else{
          notification.warning({
            message: "Xác thực không thành công",
            description:
              "Mã xác thực không đúng. Vui lòng kiểm tra lại và thử lại.",
          });
          return false;
        }
        // Chuyển hướng đến trang đăng nhập hoặc trang chính
      } else {
        notification.warning({
          message: "Không thể xác thực",
          description:
            "Hệ thống không xác minh được mã. Vui lòng thử lại hoặc yêu cầu mã mới.",
        });
        return false;
      }
    } catch (error: any) {
      setLoading(false);

      if (error.response) {
        const { status, data } = error.response;
        notification.error({
          message: `Lỗi ${status} - Xác thực thất bại`,
          description:
            data?.message ||
            "Hệ thống không thể xác minh mã. Vui lòng kiểm tra lại thông tin.",
        });
      } else if (error.request) {
        notification.error({
          message: "Lỗi kết nối",
          description:
            "Không thể kết nối đến hệ thống xác thực. Vui lòng kiểm tra lại kết nối mạng.",
        });
      } else {
        notification.error({
          message: "Lỗi hệ thống",
          description:
            error.message ||
            "Đã xảy ra sự cố không xác định. Vui lòng thử lại sau.",
        });
      }
      return false;
    }
  };

  useEffect(() => {
    fetchQRCode(requestBody?.email || "");
  }, []);

  return (
    <Spin spinning={loading}>
      <Row className="success">
        <Col
          className="SECTION-LEFT"
          lg={{ span: 12, order: 1 }}
          md={{ span: 24, order: 2 }}
          xs={{ span: 24, order: 2 }}
          sm={{ span: 24, order: 2 }}
          style={{ paddingTop: "4%", height: "100%" }}
        >
          <div
            style={{
              maxWidth: 500,
              margin: "auto",
              padding: 24,
              border: "1px solid #d9d9d9",
              borderRadius: 8,
              background: "#fff",
            }}
          >
            <Title level={3}>Thiết lập Xác thực bằng Di động</Title>

            <Alert
              message="Bạn cần thiết lập Xác thực bằng Di động để kích hoạt tài khoản."
              type="warning"
              showIcon
              style={{ marginBottom: 24 }}
            />

            <Typography>
              <Paragraph>
                1. Cài đặt một trong các ứng dụng sau trên điện thoại của bạn:
              </Paragraph>
              <ul>
                <li>FreeOTP</li>
                <li>Google Authenticator</li>
              </ul>

              <Paragraph>2. Mở ứng dụng và quét mã QR bên dưới:</Paragraph>

              <div style={{ textAlign: "center", marginBottom: 16 }}>
                <img
                  src={qrLink} // ← thay bằng đường dẫn ảnh QR thực tế
                  alt="Mã QR"
                  style={{ width: 200, height: 200 }}
                />
              </div>

              <Paragraph>
                <Link href="#">Không quét được?</Link>
              </Paragraph>

              <Paragraph>
                3. Nhập mã xác thực một lần (OTP) do ứng dụng cung cấp và nhấn
                Gửi để hoàn tất thiết lập.
              </Paragraph>

              <Paragraph>
                Vui lòng nhập Tên thiết bị để dễ dàng quản lý các thiết bị OTP
                của bạn.
              </Paragraph>
            </Typography>

            <Form layout="vertical" onFinish={onFinish}>
              <Form.Item
                label="Mã xác thực một lần"
                name="otpCode"
                rules={[
                  { required: true, message: "Vui lòng nhập mã xác thực." },
                ]}
              >
                <Input placeholder="Nhập mã OTP" />
              </Form.Item>

              <Form.Item>
                <Button type="primary" htmlType="submit">
                  Gửi
                </Button>
              </Form.Item>
            </Form>
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
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
            src={"../images/registration.jpg"}
            alt="Registration Image"
          />
        </Col>
      </Row>
    </Spin>
  );
};

export default GoogleAuthenticatorSetup;
