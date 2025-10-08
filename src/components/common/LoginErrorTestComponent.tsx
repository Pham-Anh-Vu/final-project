import React, { useState } from 'react';
import { Button, Card, Typography, Space, Alert, message, Divider } from 'antd';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import { login } from '../../shared/reducers/authSlice';

const { Title, Text, Paragraph } = Typography;

interface TestCase {
  name: string;
  description: string;
  username: string;
  password: string;
  expectedError: string;
  color: string;
}

export const LoginErrorTestComponent: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [testResults, setTestResults] = useState<Array<{test: string, result: string, success: boolean}>>([]);
  const dispatch = useAppDispatch();
  const auth = useAppSelector((state) => state.auth);

  const testCases: TestCase[] = [
    {
      name: "Sai mật khẩu",
      description: "Test với username đúng nhưng password sai",
      username: "testuser@example.com",
      password: "wrongpassword",
      expectedError: "Tên đăng nhập hoặc mật khẩu không đúng",
      color: "#ff4d4f"
    },
    {
      name: "Tài khoản không tồn tại",
      description: "Test với username không tồn tại",
      username: "nonexistent@example.com", 
      password: "password123",
      expectedError: "Tài khoản không tồn tại",
      color: "#fa8c16"
    },
    {
      name: "Thông tin rỗng",
      description: "Test với thông tin trống",
      username: "",
      password: "",
      expectedError: "Thông tin đăng nhập không hợp lệ",
      color: "#faad14"
    },
    {
      name: "Server không phản hồi",
      description: "Test khi server down (sẽ có network error)",
      username: "test@example.com",
      password: "test123",
      expectedError: "Không thể kết nối đến server",
      color: "#722ed1"
    }
  ];

  const runSingleTest = async (testCase: TestCase) => {
    setLoading(true);
    message.info(`🧪 Đang test: ${testCase.name}`);
    
    try {
      await dispatch(login({ 
        username: testCase.username, 
        password: testCase.password 
      })).unwrap();
      
      // Nếu đăng nhập thành công (không mong đợi)
      setTestResults(prev => [...prev, {
        test: testCase.name,
        result: "Đăng nhập thành công (không mong đợi)",
        success: false
      }]);
      message.success("✅ Đăng nhập thành công!");
      
    } catch (error: any) {
      // Đây là kết quả mong đợi
      const errorMessage = error || "Unknown error";
      setTestResults(prev => [...prev, {
        test: testCase.name,
        result: errorMessage,
        success: true
      }]);
      message.error(`❌ ${errorMessage}`);
    } finally {
      setLoading(false);
    }
  };

  const runAllTests = async () => {
    setTestResults([]);
    message.info("🚀 Bắt đầu chạy tất cả test cases...");
    
    for (const testCase of testCases) {
      await runSingleTest(testCase);
      // Delay nhỏ giữa các test
      await new Promise(resolve => setTimeout(resolve, 1000));
    }
    
    message.success("🎉 Hoàn thành tất cả test cases!");
  };

  const clearResults = () => {
    setTestResults([]);
    message.info("🗑️ Đã xóa kết quả test");
  };

  return (
    <Card 
      title="🧪 Test Login Error Messages" 
      style={{ maxWidth: 800, margin: '20px auto' }}
      extra={
        <Space>
          <Button 
            type="primary" 
            onClick={runAllTests}
            loading={loading}
            disabled={loading}
          >
            Chạy tất cả test
          </Button>
          <Button onClick={clearResults}>
            Xóa kết quả
          </Button>
        </Space>
      }
    >
      <div style={{ marginBottom: 24 }}>
        <Alert
          message="Hướng dẫn sử dụng"
          description={
            <div>
              <p>• Component này test các trường hợp lỗi đăng nhập khác nhau</p>
              <p>• Mỗi test case sẽ gửi request với thông tin sai để nhận lỗi</p>
              <p>• Kết quả sẽ hiển thị thông báo lỗi tương ứng</p>
              <p>• <strong>Lưu ý:</strong> Đảm bảo backend đang chạy ở localhost:8081</p>
            </div>
          }
          type="info"
          showIcon
        />
      </div>

      <Divider>Test Cases</Divider>
      
      <Space direction="vertical" style={{ width: '100%' }}>
        {testCases.map((testCase, index) => (
          <Card 
            key={index}
            size="small"
            title={
              <span style={{ color: testCase.color }}>
                {testCase.name}
              </span>
            }
            extra={
              <Button 
                size="small" 
                onClick={() => runSingleTest(testCase)}
                loading={loading}
                disabled={loading}
              >
                Test
              </Button>
            }
          >
            <Text type="secondary">{testCase.description}</Text>
            <br />
            <Text code>Username: {testCase.username || '(empty)'}</Text>
            <br />
            <Text code>Password: {testCase.password || '(empty)'}</Text>
            <br />
            <Text type="warning">Lỗi mong đợi: {testCase.expectedError}</Text>
          </Card>
        ))}
      </Space>

      {testResults.length > 0 && (
        <>
          <Divider>Kết quả Test</Divider>
          <Space direction="vertical" style={{ width: '100%' }}>
            {testResults.map((result, index) => (
              <Alert
                key={index}
                message={result.test}
                description={result.result}
                type={result.success ? "error" : "success"}
                showIcon
              />
            ))}
          </Space>
        </>
      )}

      {auth.error && (
        <>
          <Divider>Auth State Error</Divider>
          <Alert
            message="Current Auth Error"
            description={auth.error}
            type="error"
            showIcon
          />
        </>
      )}
    </Card>
  );
};

export default LoginErrorTestComponent;














