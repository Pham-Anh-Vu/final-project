import {
  Col,
  Row,
  Space,
  Input,
  Button,
  notification,
  Spin,
  message,
} from "antd";
import { InfoCircleFilled } from "@ant-design/icons";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { InputOTP } from "antd-input-otp";
import React from "react";
import axios from "axios";
import "./ConfirmEmail.css"; // Assuming you have a CSS file for styles
import { API_BASE_URL } from "../../../../config/config";
import { RegisterRequestBody } from "../../../../shared/interface/RegisterRequestBody";

interface ConfirmEmailProps {
  requestBody: RegisterRequestBody;
}

type NotificationType = "success" | "info" | "warning" | "error";

export default function ConfirmEmail() {
  const navigate = useNavigate();
  const location = useLocation();

  // Lấy dữ liệu từ navigate(..., { state: ... })
  const requestBody = location.state?.requestBody as
    | RegisterRequestBody
    | undefined;
  const [requestCheckValid, setRequestCheckValid] = useState(0);
  const [inputNumber, setInputNumber] = useState([""]);

  const [clickSendEmailAgain, setClickSendEmailAgain] = useState(false);
  const [timeLeft, setTimeLeft] = useState(180);
  const [timeOTP, setTimeOTP] = useState(300);

  const [newTimeOtp, setNewTimeOtp] = useState(false);
  const [loading, setLoading] = useState(false);
  const [api, contextHolder] = notification.useNotification();

  const openNotification = (
    type: NotificationType,
    message: String,
    description: String
  ) => {
    api[type]({
      message: message,
      description: description,
    });
  };

  const handleSendOtp = async () => {
    setLoading(true);
    try {
      const response = await axios.post(
        "http://localhost:8081/otp/send-token",
        {
          email: requestBody?.email,
        }
      );

      if (response.status === 200) {
        notification.success({
          message: "Gửi mã OTP thành công",
          description:
            "Mã xác thực đã được gửi tới địa chỉ email của Quý khách. Vui lòng kiểm tra hộp thư.",
        });
      } else {
        notification.error({
          message: "Không thể gửi mã OTP",
          description:
            "Đã xảy ra sự cố khi gửi mã OTP. Quý khách vui lòng thử lại sau.",
        });
      }
    } catch (error) {
      console.error("Lỗi gửi OTP:", error);
      notification.error({
        message: "Lỗi kết nối",
        description:
          "Không thể gửi mã OTP do lỗi hệ thống hoặc kết nối mạng. Vui lòng thử lại sau.",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleAuthOtp = async () => {
    setLoading(true);

    try {
      const otp = inputNumber.join("");
      const email = requestBody?.email;

      if (!email || otp.length === 0) {
        notification.warning({
          message: "Thiếu thông tin",
          description: "Vui lòng nhập đầy đủ mã OTP trước khi xác thực.",
        });
        return;
      }

      const verifyResponse = await axios.post(`${API_BASE_URL}/otp/verify`, {
        email,
        otp,
      });

      if (verifyResponse.status === 200) {
        const signUpResponse = await axios.post(
          `${API_BASE_URL}/auth/sign-up`,
          requestBody
        );

        console.log("SignUp Response:", signUpResponse);

        if (signUpResponse.status === 200 || signUpResponse.status === 201) {
          notification.success({
            message: "Xác thực thành công",
            description: "Tài khoản của Quý khách đã được đăng ký thành công.",
          });

          navigate("/authenticate-google", {
            state: { requestBody: requestBody },
          });
        } else {
          notification.error({
            message: "Đăng ký thất bại",
            description:
              "Đã xác thực OTP nhưng không thể hoàn tất đăng ký. Vui lòng thử lại sau.",
          });
        }
      } else {
        notification.error({
          message: "OTP không hợp lệ",
          description:
            "Mã xác thực đã nhập không hợp lệ hoặc đã hết hạn. Vui lòng kiểm tra lại.",
        });
      }
    } catch (error: any) {
      console.error("Lỗi xác thực OTP:", error);

      if (error.response?.status === 400) {
        notification.error({
          message: "Mã OTP sai",
          description:
            "Mã OTP không chính xác. Quý khách vui lòng kiểm tra lại và nhập lại mã.",
        });
      } else if (error.response?.status === 410) {
        notification.error({
          message: "Mã OTP đã hết hạn",
          description:
            "Mã OTP đã hết hạn. Quý khách vui lòng yêu cầu gửi lại mã mới.",
        });
      } else {
        notification.error({
          message: "Lỗi xác thực",
          description:
            "Đã xảy ra lỗi trong quá trình xác thực. Vui lòng thử lại sau.",
        });
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (timeLeft <= 0) {
      setClickSendEmailAgain(false);
      setTimeLeft(180);
      return;
    }

    const intervalId = setInterval(() => {
      if (clickSendEmailAgain) {
        setTimeLeft(timeLeft - 1);
      }
    }, 1000);

    return () => clearInterval(intervalId);
  }, [timeLeft, clickSendEmailAgain]);

  useEffect(() => {
    console.log(newTimeOtp);
    if (newTimeOtp && timeOTP > 0) {
      const intervalId = setInterval(() => {
        if (newTimeOtp) {
          setTimeOTP((prevTime) => prevTime - 1);
        }
      }, 1000);
      return () => clearInterval(intervalId);
    } else if (timeOTP <= 0) {
      setTimeOTP(300);
      setNewTimeOtp(false);
    }
  }, [newTimeOtp, timeOTP]);

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? "0" : ""}${remainingSeconds}`;
  };

  useEffect(() => {
    if (requestCheckValid != 0) {
      notification.success({
        message: (
          <div style={{ fontWeight: 600, fontFamily: "Lexend" }}>
            Xác thực email thành công
          </div>
        ),
      });
    } else if (requestCheckValid != 0) {
      notification.error({
        message: (
          <div style={{ fontWeight: 600, fontFamily: "Lexend" }}>
            Xác thực email không thành công
          </div>
        ),
      });
    }
  }, [requestCheckValid, clickSendEmailAgain]);

  // useEffect(() => {
  //   if (successCreateOtp && clickSendEmailAgain) {
  //     console.log(checkCodeEmailValid)
  //     notification.success({
  //       message: "Đã gửi email",
  //       description: (
  //         <>
  //           Hệ thống đã gửi email cho bạn.
  //           <br />
  //           Vui lòng kiểm tra email để xác nhận.
  //         </>
  //       )
  //     })
  //   }

  //   if (errorCreateOtp && clickSendEmailAgain) {
  //     notification.error({
  //       message:
  //       (
  //         <div style={{ fontWeight: 600, fontFamily: 'Lexend' }}>
  //           Gửi email không thành công
  //         </div>
  //       )
  //     })
  //   }
  // }, [createOtp, loadingCreateOtp, successCreateOtp, errorCreateOtp, clickSendEmailAgain])

  // useEffect(() => {
  //   if (successCreateOtp) {
  //     setNewTimeOtp(false);
  //     setTimeOTP(300);
  //     setNewTimeOtp(true);
  //   }

  // }, [errorCreateOtp, clickSendEmailAgain, successCreateOtp, createOtp])

  useEffect(() => {
    handleSendOtp();
  }, []);

  const onSubmit = async () => {};

  return (
    <Spin spinning={loading}>
      <Row className="success">
        <Col
          className="SECTION-LEFT"
          lg={{ span: 12, order: 1 }}
          md={{ span: 24, order: 2 }}
          xs={{ span: 24, order: 2 }}
          sm={{ span: 24, order: 2 }}
          style={{ paddingTop: "12%", height: "100%" }}
        >
          <Row justify={"center"} align={"middle"}>
            <section className="card">
              <h1 style={{ textAlign: "center" }}>Xác thực OTP</h1>
              <div style={{ marginBottom: 20, textAlign: "center" }}>
                OTP hết hạn {formatTime(timeOTP)}
              </div>
              <InputOTP
                inputType="custom"
                inputRegex="[0-9]"
                onChange={setInputNumber}
                value={inputNumber}
              />
              <Button
                block
                type="primary"
                onClick={handleAuthOtp}
                style={{ margin: "20px 0", maxWidth: "352px", height: 40 }}
              >
                Xác thực
              </Button>
              <div>
                Bạn không nhận được mã OTP?{" "}
                {clickSendEmailAgain && formatTime(timeLeft)}
                {!clickSendEmailAgain && (
                  <Button
                    onClick={handleSendOtp}
                    type="link"
                    style={{ padding: 0 }}
                  >
                    Gửi lại
                  </Button>
                )}
              </div>
            </section>
          </Row>
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
          />
        </Col>
      </Row>
    </Spin>
  );
}
