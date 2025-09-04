import React, { useState } from 'react';
import {
  Card,
  Button,
  Form,
  Input,
  Typography,
  Space,
  Divider,
  Alert,
  Spin,
  Row,
  Col,
  Tag,
  Collapse,
  message,
  Table
} from 'antd';
import {
  LockOutlined,
  UnlockOutlined,
  ExperimentOutlined,
  SafetyOutlined,
  EyeOutlined,
  PlayCircleOutlined,
  CheckCircleOutlined,
  CloseCircleOutlined
} from '@ant-design/icons';
import axios from 'axios';

const { Title, Text, Paragraph } = Typography;
const { Panel } = Collapse;
const { TextArea } = Input;

interface EncryptionResult {
  original: string;
  encrypted: string;
  decrypted: string;
  hash: string;
  masked: string;
  data_type: string;
  integrity_check: boolean;
}

function EncryptionDemo() {
  const [loading, setLoading] = useState(false);
  const [basicResults, setBasicResults] = useState<any>(null);
  const [batchResults, setBatchResults] = useState<any>(null);
  const [customerResults, setCustomerResults] = useState<any>(null);
  const [searchResults, setSearchResults] = useState<any>(null);
  const [customerForm] = Form.useForm();

  const API_BASE = 'http://localhost:8081';

  // Test Basic Encryption
  const testBasicEncryption = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${API_BASE}/demo/encryption/test-basic`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      setBasicResults(response.data.data);
      message.success('Basic encryption test completed!');
    } catch (error: any) {
      message.error('Test failed: ' + error.response?.data?.message || error.message);
    } finally {
      setLoading(false);
    }
  };

  // Test Batch Encryption
  const testBatchEncryption = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${API_BASE}/demo/encryption/test-batch`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      setBatchResults(response.data.data);
      message.success('Batch encryption test completed!');
    } catch (error: any) {
      message.error('Test failed: ' + error.response?.data?.message || error.message);
    } finally {
      setLoading(false);
    }
  };

  // Test Customer Encryption
  const testCustomerEncryption = async (values: any) => {
    setLoading(true);
    try {
      const response = await axios.post(`${API_BASE}/demo/encryption/test-customer`, values, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json'
        }
      });
      setCustomerResults(response.data.data);
      message.success('Customer encryption test completed!');
    } catch (error: any) {
      message.error('Test failed: ' + error.response?.data?.message || error.message);
    } finally {
      setLoading(false);
    }
  };

  // Test Searchable Hash
  const testSearchableHash = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${API_BASE}/demo/encryption/test-search`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      setSearchResults(response.data.data);
      message.success('Searchable hash test completed!');
    } catch (error: any) {
      message.error('Test failed: ' + error.response?.data?.message || error.message);
    } finally {
      setLoading(false);
    }
  };

  // Run Full Test Suite
  const runFullTest = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${API_BASE}/demo/encryption/run-full-test`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      message.success('Full test suite completed! Check browser console for details.');
    } catch (error: any) {
      message.error('Test failed: ' + error.response?.data?.message || error.message);
    } finally {
      setLoading(false);
    }
  };

  // Render Basic Test Results
  const renderBasicResults = () => {
    if (!basicResults) return null;

    const dataTypeTests = ['email_test', 'phone_test', 'identity_test', 'fullname_test', 'balance_test'];
    const columns = [
      {
        title: 'Data Type',
        dataIndex: 'dataType',
        key: 'dataType',
        render: (text: string) => <Tag color="blue">{text}</Tag>
      },
      {
        title: 'Original',
        dataIndex: 'original',
        key: 'original',
        render: (text: string) => <Text code>{text}</Text>
      },
      {
        title: 'Encrypted',
        dataIndex: 'encrypted',
        key: 'encrypted',
        render: (text: string) => (
          <Text code style={{ fontSize: '10px', wordBreak: 'break-all' }}>
            {text.length > 50 ? text.substring(0, 50) + '...' : text}
          </Text>
        )
      },
      {
        title: 'Masked',
        dataIndex: 'masked',
        key: 'masked',
        render: (text: string) => <Text>{text}</Text>
      },
      {
        title: 'Integrity',
        dataIndex: 'integrity',
        key: 'integrity',
        render: (check: boolean) => (
          check ? 
            <CheckCircleOutlined style={{ color: 'green' }} /> : 
            <CloseCircleOutlined style={{ color: 'red' }} />
        )
      }
    ];

    const tableData = dataTypeTests.map((testKey, index) => {
      const testResult = basicResults[testKey];
      return {
        key: index,
        dataType: testResult.data_type,
        original: testResult.original,
        encrypted: testResult.encrypted,
        masked: testResult.masked,
        integrity: testResult.integrity_check
      };
    });

    return (
      <Table 
        columns={columns} 
        dataSource={tableData} 
        size="small"
        pagination={false}
      />
    );
  };

  return (
    <div style={{ padding: '24px', background: '#f0f2f5', minHeight: '100vh' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <Card>
          <div style={{ textAlign: 'center', marginBottom: '32px' }}>
            <Title level={2}>
              <SafetyOutlined style={{ marginRight: '12px' }} />
              Demo Mã Hóa Thông Tin User
            </Title>
            <Paragraph>
              Hệ thống sử dụng <Tag color="gold">AES-GCM-256</Tag> để mã hóa dữ liệu nhạy cảm
              và <Tag color="green">HMAC-SHA256</Tag> để tạo hash tìm kiếm.
            </Paragraph>
          </div>

          <Row gutter={[16, 16]}>
            {/* Control Panel */}
            <Col xs={24} lg={8}>
              <Card title="🎮 Control Panel" size="small">
                <Space direction="vertical" style={{ width: '100%' }}>
                  <Button 
                    type="primary" 
                    icon={<ExperimentOutlined />} 
                    onClick={testBasicEncryption}
                    loading={loading}
                    block
                  >
                    Test Basic Encryption
                  </Button>
                  
                  <Button 
                    icon={<LockOutlined />} 
                    onClick={testBatchEncryption}
                    loading={loading}
                    block
                  >
                    Test Batch Encryption
                  </Button>
                  
                  <Button 
                    icon={<EyeOutlined />} 
                    onClick={testSearchableHash}
                    loading={loading}
                    block
                  >
                    Test Searchable Hash
                  </Button>
                  
                  <Button 
                    icon={<PlayCircleOutlined />} 
                    onClick={runFullTest}
                    loading={loading}
                    block
                    type="dashed"
                  >
                    Run Full Test Suite
                  </Button>
                </Space>
              </Card>

              {/* Customer Test Form */}
              <Card title="👤 Test Customer Data" size="small" style={{ marginTop: '16px' }}>
                <Form
                  form={customerForm}
                  layout="vertical"
                  onFinish={testCustomerEncryption}
                  initialValues={{
                    fullName: 'Nguyễn Văn Test',
                    email: 'test@example.com',
                    phone: '0987654321',
                    identityNo: '123456789012',
                    totalBalance: '5000000'
                  }}
                >
                  <Form.Item name="fullName" label="Họ tên" rules={[{ required: true }]}>
                    <Input />
                  </Form.Item>
                  <Form.Item name="email" label="Email" rules={[{ required: true, type: 'email' }]}>
                    <Input />
                  </Form.Item>
                  <Form.Item name="phone" label="Số điện thoại" rules={[{ required: true }]}>
                    <Input />
                  </Form.Item>
                  <Form.Item name="identityNo" label="CMND/CCCD">
                    <Input />
                  </Form.Item>
                  <Form.Item name="totalBalance" label="Số dư">
                    <Input />
                  </Form.Item>
                  <Form.Item>
                    <Button type="primary" htmlType="submit" loading={loading} block>
                      Test Customer Encryption
                    </Button>
                  </Form.Item>
                </Form>
              </Card>
            </Col>

            {/* Results Panel */}
            <Col xs={24} lg={16}>
              <Spin spinning={loading}>
                <Collapse>
                  {/* Basic Test Results */}
                  {basicResults && (
                    <Panel header="🔐 Basic Encryption Test Results" key="basic">
                      <Alert 
                        message={`Encryption Algorithm: ${basicResults.encryption_algorithm}`}
                        type="info" 
                        style={{ marginBottom: '16px' }}
                      />
                      {renderBasicResults()}
                    </Panel>
                  )}

                  {/* Batch Test Results */}
                  {batchResults && (
                    <Panel header="📦 Batch Encryption Test Results" key="batch">
                      <Row gutter={[16, 16]}>
                        <Col span={12}>
                          <Card title="Performance" size="small">
                            <p>Encrypt Time: <Text code>{batchResults.encrypt_time_ms}ms</Text></p>
                            <p>Decrypt Time: <Text code>{batchResults.decrypt_time_ms}ms</Text></p>
                            <p>Total Fields: <Text code>{batchResults.total_fields}</Text></p>
                            <p>Data Integrity: {
                              batchResults.data_integrity_check ? 
                                <Tag color="green">✅ PASS</Tag> : 
                                <Tag color="red">❌ FAIL</Tag>
                            }</p>
                          </Card>
                        </Col>
                        <Col span={12}>
                          <Card title="Data Sample" size="small">
                            <p><strong>Original:</strong></p>
                            <TextArea 
                              value={JSON.stringify(batchResults.original_data, null, 2)} 
                              rows={4} 
                              readOnly 
                            />
                            <p><strong>Decrypted:</strong></p>
                            <TextArea 
                              value={JSON.stringify(batchResults.decrypted_data, null, 2)} 
                              rows={4} 
                              readOnly 
                            />
                          </Card>
                        </Col>
                      </Row>
                    </Panel>
                  )}

                  {/* Customer Test Results */}
                  {customerResults && (
                    <Panel header="👤 Customer Entity Test Results" key="customer">
                      <Alert 
                        message={`Customer ID: ${customerResults.customer_id} - Data saved to database with encryption`}
                        type="success" 
                        style={{ marginBottom: '16px' }}
                      />
                      <Row gutter={[16, 16]}>
                        <Col span={8}>
                          <Card title="Original Data" size="small">
                            <pre>{JSON.stringify(customerResults.original_data, null, 2)}</pre>
                          </Card>
                        </Col>
                        <Col span={8}>
                          <Card title="Encrypted (DB)" size="small">
                            <p><strong>Name:</strong> <Text code style={{ fontSize: '10px' }}>{customerResults.encrypted_fullname}</Text></p>
                            <p><strong>Email:</strong> <Text code style={{ fontSize: '10px' }}>{customerResults.encrypted_email}</Text></p>
                            <p><strong>Phone:</strong> <Text code style={{ fontSize: '10px' }}>{customerResults.encrypted_phone}</Text></p>
                            <p><strong>Email Hash:</strong> <Text code style={{ fontSize: '10px' }}>{customerResults.email_hash}</Text></p>
                          </Card>
                        </Col>
                        <Col span={8}>
                          <Card title="Decrypted" size="small">
                            <p><strong>Name:</strong> {customerResults.decrypted_fullname}</p>
                            <p><strong>Email:</strong> {customerResults.decrypted_email}</p>
                            <p><strong>Phone:</strong> {customerResults.decrypted_phone}</p>
                            <p><strong>Identity:</strong> {customerResults.decrypted_identity}</p>
                            <Divider />
                            <p>Integrity Check: {
                              customerResults.data_integrity_check ? 
                                <Tag color="green">✅ PASS</Tag> : 
                                <Tag color="red">❌ FAIL</Tag>
                            }</p>
                          </Card>
                        </Col>
                      </Row>
                    </Panel>
                  )}

                  {/* Search Test Results */}
                  {searchResults && (
                    <Panel header="🔍 Searchable Hash Test Results" key="search">
                      <Card>
                        <Row gutter={[16, 16]}>
                          <Col span={12}>
                            <p><strong>Email:</strong> <Text code>{searchResults.email}</Text></p>
                            <p><strong>Email Hash:</strong> <Text code style={{ fontSize: '10px' }}>{searchResults.email_hash}</Text></p>
                            <p><strong>Hash Match Test:</strong> {
                              searchResults.email_hash_match ? 
                                <Tag color="green">✅ PASS</Tag> : 
                                <Tag color="red">❌ FAIL</Tag>
                            }</p>
                          </Col>
                          <Col span={12}>
                            <p><strong>Phone:</strong> <Text code>{searchResults.phone}</Text></p>
                            <p><strong>Phone Hash:</strong> <Text code style={{ fontSize: '10px' }}>{searchResults.phone_hash}</Text></p>
                            <p><strong>Different Email Test:</strong> {
                              searchResults.different_email_test ? 
                                <Tag color="green">✅ PASS</Tag> : 
                                <Tag color="red">❌ FAIL</Tag>
                            }</p>
                          </Col>
                        </Row>
                        <Alert 
                          message={`Hash Algorithm: ${searchResults.hash_algorithm}`}
                          type="info" 
                        />
                      </Card>
                    </Panel>
                  )}
                </Collapse>
              </Spin>
            </Col>
          </Row>
        </Card>
      </div>
    </div>
  );
}

export default EncryptionDemo;
