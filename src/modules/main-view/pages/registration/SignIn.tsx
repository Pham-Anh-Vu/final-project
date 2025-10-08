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
import React, { Component, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Layout,
  Menu,
  Button,
  Row,
  Col,
  Typography,
  Form,
  Input,
  Switch,
  Card,
  message,
  Alert,
} from "antd";
import signinbg from "../assets/images/img-signin.jpg";
import {
  DribbbleOutlined,
  TwitterOutlined,
  InstagramOutlined,
  GithubOutlined,
  LockOutlined,
  UserOutlined,
  BankOutlined,
} from "@ant-design/icons";
import { useAppDispatch, useAppSelector } from "../../../../hooks/hooks";
import { login, clearError } from "../../../../shared/reducers/authSlice";
import "./SignIn.css";

function onChange(checked) {
  console.log(`switch to ${checked}`);
}
const { Title } = Typography;
const { Header, Footer, Content } = Layout;
const template = [
  <svg
    data-v-4ebdc598=""
    width="20"
    height="20"
    viewBox="0 0 20 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      data-v-4ebdc598=""
      d="M3 4C3 3.44772 3.44772 3 4 3H16C16.5523 3 17 3.44772 17 4V6C17 6.55228 16.5523 7 16 7H4C3.44772 7 3 6.55228 3 6V4Z"
      fill="#111827"
      className="fill-muted"
    ></path>
    <path
      data-v-4ebdc598=""
      d="M3 10C3 9.44771 3.44772 9 4 9H10C10.5523 9 11 9.44771 11 10V16C11 16.5523 10.5523 17 10 17H4C3.44772 17 3 16.5523 3 16V10Z"
      fill="#111827"
      className="fill-muted"
    ></path>
    <path
      data-v-4ebdc598=""
      d="M14 9C13.4477 9 13 9.44771 13 10V16C13 16.5523 13.4477 17 14 17H16C16.5523 17 17 16.5523 17 16V10C17 9.44771 16.5523 9 16 9H14Z"
      fill="#111827"
      className="fill-muted"
    ></path>
  </svg>,
];
const profile = [
  <svg
    data-v-4ebdc598=""
    width="20"
    height="20"
    viewBox="0 0 20 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      data-v-4ebdc598=""
      fillRule="evenodd"
      clipRule="evenodd"
      d="M18 10C18 14.4183 14.4183 18 10 18C5.58172 18 2 14.4183 2 10C2 5.58172 5.58172 2 10 2C14.4183 2 18 5.58172 18 10ZM12 7C12 8.10457 11.1046 9 10 9C8.89543 9 8 8.10457 8 7C8 5.89543 8.89543 5 10 5C11.1046 5 12 5.89543 12 7ZM9.99993 11C7.98239 11 6.24394 12.195 5.45374 13.9157C6.55403 15.192 8.18265 16 9.99998 16C11.8173 16 13.4459 15.1921 14.5462 13.9158C13.756 12.195 12.0175 11 9.99993 11Z"
      fill="#111827"
      className="fill-muted"
    ></path>
  </svg>,
];
const signup = [
  <svg
    data-v-4ebdc598=""
    width="20"
    height="20"
    viewBox="0 0 20 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      data-v-4ebdc598=""
      fillRule="evenodd"
      clipRule="evenodd"
      d="M6 2C5.44772 2 5 2.44772 5 3V4H4C2.89543 4 2 4.89543 2 6V16C2 17.1046 2.89543 18 4 18H16C17.1046 18 18 17.1046 18 16V6C18 4.89543 17.1046 4 16 4H15V3C15 2.44772 14.5523 2 14 2C13.4477 2 13 2.44772 13 3V4H7V3C7 2.44772 6.55228 2 6 2ZM6 7C5.44772 7 5 7.44772 5 8C5 8.55228 5.44772 9 6 9H14C14.5523 9 15 8.55228 15 8C15 7.44772 14.5523 7 14 7H6Z"
      fill="#111827"
      className="fill-muted"
    ></path>
  </svg>,
];
const signin = [
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="14"
    height="14"
    viewBox="0 0 14 14"
  >
    <path
      className="fill-muted"
      d="M12.25,14H1.75A1.752,1.752,0,0,1,0,12.25V3.5A1.752,1.752,0,0,1,1.75,1.75h.876V.875a.875.875,0,0,1,1.75,0V1.75h5.25V.875a.875.875,0,0,1,1.75,0V1.75h.875A1.752,1.752,0,0,1,14,3.5v8.75A1.752,1.752,0,0,1,12.25,14ZM3.5,4.375a.875.875,0,0,0,0,1.75h7a.875.875,0,0,0,0-1.75Z"
    />
  </svg>,
];
const SignIn = () => {
  const dispatch = useAppDispatch();
  const auth = useAppSelector((state) => state.auth);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const ACCESS_TOKEN_KEY = "access_token";

  useEffect(() => {
    if (!auth.isAuthenticated) {
      return;
    }
    localStorage.setItem(ACCESS_TOKEN_KEY, auth.accessToken);
  }, [auth]);

  const onFinish = (values: any) => {
    setLoading(true);
    // Clear previous errors
    dispatch(clearError());
    
    dispatch(login({ username: values.username, password: values.password }))
      .unwrap()
      .then(() => {
        // Đăng nhập thành công
        message.success("Đăng nhập thành công!");
        navigate("/dashboard");
      })
      .catch((error) => {
        console.error("Login failed:", error);
        // Hiển thị thông báo lỗi
        message.error(error || "Đăng nhập thất bại. Vui lòng thử lại!");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  // Clear error when user starts typing
  const handleInputChange = () => {
    if (auth.error) {
      dispatch(clearError());
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
    message.warning("Vui lòng kiểm tra thông tin đăng nhập!");
  };
  return (
    <>
      <div
        className="login-container"
        style={{
          backgroundImage: `url("/images/anh-viet-nam-11.jpg")`,
        }}
      >
        <div className="overlay">
          <Card className="login-card">
            <div style={{ textAlign: "center", marginBottom: 24 }}>
              <BankOutlined style={{ fontSize: 40, color: "#1890ff" }} />
              <Title level={3} style={{ marginTop: 12 }}>
                Đăng nhập
              </Title>
            </div>
            {/* Hiển thị lỗi đăng nhập */}
            {auth.error && (
              <Alert
                message="Đăng nhập thất bại"
                description={auth.error}
                type="error"
                showIcon
                style={{ marginBottom: 16 }}
                closable
              />
            )}
            
            <Form
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
              layout="vertical"
              className="row-col"
            >
              <Form.Item
                className="username"
                label="Tên đăng nhập"
                name="username"
                rules={[
                  {
                    required: true,
                    message: "Hãy nhập tên đăng nhập!",
                  },
                ]}
              >
                <Input 
                  placeholder="Tên đăng nhập" 
                  onChange={handleInputChange}
                />
              </Form.Item>

              <Form.Item
                className="username"
                label="Mật khẩu"
                name="password"
                rules={[
                  {
                    required: true,
                    message: "Hãy nhập mật khẩu!",
                  },
                ]}
              >
                <Input.Password 
                  placeholder="Mật khẩu" 
                  onChange={handleInputChange}
                />
              </Form.Item>

              <Form.Item className="aligin-center" valuePropName="checked">
                <Switch defaultChecked onChange={onChange} style={{marginRight: 5}} />
                Ghi nhớ đăng nhập
              </Form.Item>

              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  style={{ width: "100%" }}
                  loading={loading}
                >
                  Đăng nhập
                </Button>
              </Form.Item>
              <p className="font-semibold text-muted">
                Chưa có tài khoản?{" "}
                <Link to="/sign-up" className="text-dark font-bold">
                  Đăng ký ngay
                </Link>
              </p>
            </Form>
          </Card>
        </div>
      </div>
      {/* <Layout className="layout-default layout-signin">
        <Header>
          <div className="header-col header-brand">
            <h5>Muse Dashboard</h5>
          </div>
          <div className="header-col header-nav">
            <Menu mode="horizontal" defaultSelectedKeys={["1"]}>
              <Menu.Item key="1">
                <Link to="/dashboard">
                  {template}
                  <span> Dashboard</span>
                </Link>
              </Menu.Item>
              <Menu.Item key="2">
                <Link to="/profile">
                  {profile}
                  <span>Profile</span>
                </Link>
              </Menu.Item>
              <Menu.Item key="3">
                <Link to="/sign-up">
                  {signup}
                  <span> Sign Up</span>
                </Link>
              </Menu.Item>
              <Menu.Item key="4">
                <Link to="/sign-in">
                  {signin}
                  <span> Sign In</span>
                </Link>
              </Menu.Item>
            </Menu>
          </div>
          <div className="header-col header-btn">
            <Button type="primary">FREE DOWNLOAD</Button>
          </div>
        </Header>
        <Content className="signin">
          <Row gutter={[24, 0]} justify="space-around">
            <Col
              xs={{ span: 24, offset: 0 }}
              lg={{ span: 6, offset: 2 }}
              md={{ span: 12 }}
            >
              <Title className="mb-15">Sign In</Title>
              <Title className="font-regular text-muted" level={5}>
                Enter your email and password to sign in
              </Title>
          
            </Col>
            <Col
              className="sign-img"
              style={{ padding: 12 }}
              xs={{ span: 24 }}
              lg={{ span: 12 }}
              md={{ span: 12 }}
            >
              <img src={signinbg} alt="" />
            </Col>
          </Row>
        </Content>
      </Layout> */}
    </>
  );
};
export default SignIn;
