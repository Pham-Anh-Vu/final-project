import {
  Button,
  Form,
  Input,
  Row,
  Spin,
  Col,
  message,
  notification,
  Checkbox,
  Card,
} from "antd";
import { ChangeEvent, useCallback, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import * as yup from "yup";
import "./SignUp2.css";
import { DeleteOutlined } from "@ant-design/icons";
import React from "react";

export default function RegistrationPage() {
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [token, setToken] = useState<string | null>(null);

  const [allValid, setAllValid] = useState(false);
  const [formEntity, setFormEntity] = useState("");
  const emailRegex =
    /^(?=.{6,50}$)(?!.*\.\.)(?!.*\.$)(?!^\.)[a-zA-Z0-9._%+\-!#$%^&*()=]+@([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,4}$/;

  const [hasError, setHasError] = useState(false);

  const handleClearInput = (fieldName: any) => {
    form.setFieldsValue({ [fieldName]: "" });
  };

  const onFinish = async (values) => {
    const requestBody = {
      username: values.email,
      email: values.email,
      firstName: values.firstName,
      lastName: values.lastName,
      phone: values.phone,
      enabled: false,
      credentials: [
        {
          type: "password",
          value: values.password,
          temporary: false,
        },
      ],
      requiredActions: [],
    };

    navigate("/confirm-email", {
      state: { requestBody: requestBody },
    });
  };

  const onFinishFailed = () => {};

  return (
    <Spin spinning={false} tip="Đang tải...">
      {!allValid && (
        <Row className="registration">
          <Col
            lg={{ span: 12, order: 1 }}
            md={{ span: 24, order: 2 }}
            xs={{ span: 24, order: 2 }}
            sm={{ span: 24, order: 2 }}
          >
            <div
              className="SECTION-LEFT"
              style={{ paddingTop: "30%", height: "100%" }}
            >
              <Row
                justify={"center"}
                align={"middle"}
                style={{ height: "100%" }}
              >
                <Card
                  className="card-signup header-solid h-full ant-card pt-0"
                  title={<h5>Đăng ký</h5>}
                >
                  <Form
                    name="basic"
                    initialValues={{ remember: true }}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    className="row-col"
                  >
                    <Form.Item
                      name="email"
                      rules={[
                        {
                          required: true,
                          message: "Vui lòng nhập email!",
                        },
                        {
                          type: "email",
                          message: "Email không hợp lệ!",
                        },
                      ]}
                    >
                      <Input placeholder="Email" />
                    </Form.Item>

                    <Form.Item
                      name="firstName"
                      rules={[
                        {
                          required: true,
                          message: "Vui lòng nhập họ!",
                        },
                      ]}
                    >
                      <Input placeholder="Họ" />
                    </Form.Item>

                    <Form.Item
                      name="lastName"
                      rules={[
                        {
                          required: true,
                          message: "Vui lòng nhập tên!",
                        },
                      ]}
                    >
                      <Input placeholder="Tên" />
                    </Form.Item>

                    <Form.Item
                      name="phone"
                      rules={[
                        {
                          required: true,
                          message: "Vui lòng nhập số điện thoại!",
                        },
                        {
                          pattern: /^(03|05|07|08|09)\d{8}$/,
                          message: "Số điện thoại không hợp lệ!",
                        },
                      ]}
                    >
                      <Input placeholder="Số điện thoại" />
                    </Form.Item>

                    <Form.Item
                      name="password"
                      rules={[
                        {
                          required: true,
                          message: "Vui lòng nhập mật khẩu!",
                        },
                      ]}
                    >
                      <Input.Password placeholder="Mật khẩu" />
                    </Form.Item>

                    <Form.Item
                      name="rePassword"
                      dependencies={["password"]}
                      rules={[
                        {
                          required: true,
                          message: "Vui lòng nhập lại mật khẩu!",
                        },
                        ({ getFieldValue }) => ({
                          validator(_, value) {
                            if (!value || getFieldValue("password") === value) {
                              return Promise.resolve();
                            }
                            return Promise.reject(
                              new Error("Mật khẩu nhập lại không khớp!")
                            );
                          },
                        }),
                      ]}
                    >
                      <Input.Password placeholder="Nhập lại mật khẩu" />
                    </Form.Item>

                    <Form.Item name="remember" valuePropName="checked">
                      <Checkbox>
                        Tôi đồng ý với{" "}
                        <a href="#pablo" className="font-bold text-dark">
                          điều khoản và điều kiện
                        </a>
                      </Checkbox>
                    </Form.Item>

                    <Form.Item>
                      <Button
                        style={{ width: "100%" }}
                        type="primary"
                        htmlType="submit"
                      >
                        ĐĂNG KÝ
                      </Button>
                    </Form.Item>
                  </Form>

                  <p className="font-semibold text-muted text-center">
                    Already have an account?{" "}
                    <Link to="/sign-in" className="font-bold text-dark">
                      Sign In
                    </Link>
                  </p>
                </Card>
              </Row>
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
              src={
                "images/440973907_1509936859960278_2734526752135319129_n.png"
              }
              alt="Registration Image"
            />
          </Col>
        </Row>
      )}

      {/* {
        allValid && <ConfirmEmail loadingSendEmail={loadingCreateOtp} emailToCheck={emailToCheck} entity={formEntity} />
      } */}
    </Spin>
  );
}
