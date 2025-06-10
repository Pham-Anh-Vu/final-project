import React, { useState } from 'react';
import { Input, Button, Image, Row, Col, Card, Flex, Typography, Switch } from 'antd';
import './index.css';
import { useTransition, animated, config } from '@react-spring/web';
import useIsMobile from '../../../../hooks/use-is-mobile';

const { Text, Link, Title, Paragraph } = Typography;

function Ecosystem({ display }: any) {
  const [ellipsis, setEllipsis] = useState(true);
  const isMobile = useIsMobile()

  const sectionTransition = useTransition(display, {
    from: { x: -50, opacity: 0 },
    enter: { x: 0, opacity: 1 },
    config: config.slow,
    delay: 500,
  });

  return (
    <div
      className="SECTION"
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        margin: !isMobile ? '3% 10% 0 10%' : '3% 5% 0 5%',
      }}
    >
      {sectionTransition((style, item) => (
        <animated.div style={style}>
          <Row style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <Col
              lg={{ span: 14 }}
              md={{ span: 24 }}
              sm={{ span: 24 }}
              xs={{ span: 24 }}
              style={{ marginBottom: '20vh' }}
            >
              <Title level={3} style={{ textAlign: 'center' }}>
                Nền tảng tài chính số E2E cho các doanh nghiệp và ngân hàng trong chuỗi cung ứng
              </Title>
            </Col>
          </Row>
          <Row justify="space-evenly" align="middle" gutter={[0, 128]}>
            <Col
              xxl={{ span: 7 }}
              lg={{ span: 16, offset: 0 }}
              md={{ span: 24, offset: 0 }}
              sm={{ span: 24, offset: 0 }}
              xs={{ span: 24, offset: 0 }}
            >
              <Card
                style={{
                  borderColor: 'rgba(10, 103, 233, 0.3)',
                  minHeight: '30vw',
                  paddingBottom: 0,
                  position: 'relative',
                }}
                bodyStyle={{ padding: 0 }}
              >
                <img
                  style={{
                    position: 'absolute',
                    borderRadius: 10,
                    width: !isMobile ? 380 : 320,
                    height: !isMobile ? 240 : 180,
                    margin: 'auto',
                    display: 'block',
                    left: '50%',
                    transform: 'translate(-50%, -60%)',
                  }}
                  src="/images/home/SCF/lc-24-20221018174156-p3nss.png"
                />
                <div className="body" style={{
                  marginTop: '12vh'
                }}>
                  <Title
                    level={5}
                    style={{
                      fontSize: 22,
                      fontWeight: 'bold',
                      lineHeight: 1.2,
                      color: ' rgb(10, 103, 233)',
                      textAlign: 'center',
                    }}
                  >
                    Ngân hàng
                  </Title>
                  <ul style={{ marginRight: 20, fontSize: 17, textAlign: 'justify', paddingBottom: 50 }}>
                    <li>

                      Mở rộng cơ hội kết nối và cấp vốn cho đa dạng doanh nghiệp, nhà cung ứng/ nhà phân phối, tạo mối quan hệ hợp tác bền vững, lâu dài
                    </li>
                    <li>

                      Hỗ trợ giám sát hoạt động và theo dõi tình hình kinh doanh, sức khỏe tài chính của doanh nghiệp
                    </li>
                    <li>

                      Phân tích dữ liệu chuyên sâu, đưa ra cảnh báo sớm để phòng ngừa rủi ro mất vốn
                    </li>
                  </ul>
                </div>
              </Card>
            </Col>

            <Col
              xxl={{ span: 7 }}
              lg={{ span: 16, offset: 0 }}
              md={{ span: 24, offset: 0 }}
              sm={{ span: 24, offset: 0 }}
              xs={{ span: 24, offset: 0 }}
            >
              <Card
                style={{
                  borderColor: 'rgba(10, 103, 233, 0.3)',
                  minHeight: '30vw',
                  position: 'relative',
                  paddingBottom: 0,
                }}
                bodyStyle={{ padding: 0 }}
              >
                <img
                  style={{
                    position: 'absolute',
                    borderRadius: 10,
                    width: !isMobile ? 380 : 320,
                    height: !isMobile ? 240 : 180,
                    margin: 'auto',
                    display: 'block',
                    left: '50%',
                    transform: 'translate(-50%, -60%)',
                  }}
                  src="/images/home/SCF/image-13-2-1-20231001084412-byd3t.jpg"
                />
                <div className="body" style={{ marginTop: '12vh' }}>
                  <Title
                    level={5}
                    style={{
                      fontSize: 22,
                      fontWeight: 'bold',
                      lineHeight: 1.2,
                      color: ' rgb(10, 103, 233)',
                      textAlign: 'center',
                    }}
                  >
                    Doanh nghiệp được tài trợ
                  </Title>
                  <ul style={{ marginRight: 20, fontSize: 17, textAlign: 'justify' }}>
                    <li>

                      Nâng cao uy tín doanh nghiệp với khả năng thanh toán sớm, rút ngắn thời gian trả tiền hàng, cạnh tranh chi phí, mở rộng khách hàng
                    </li>
                    <li>

                      Tăng tính thanh khoản và tăng hiệu quả thanh toán, dễ dàng kiểm soát dòng tiền của doanh nghiệp
                    </li>
                    <li>

                      Tăng cường mối quan hệ với các nhà cung ứng/ nhà phân phối chiến lược, tạo lập chuỗi cung ứng bền vững dài hạn
                    </li>
                    <li>

                        Tiết kiệm chi phí vay vốn với lãi suất thấp
                    </li>
                  </ul>
                </div>
              </Card>
            </Col>

            <Col
              xxl={{ span: 7 }}
              lg={{ span: 16, offset: 0 }}
              md={{ span: 24, offset: 0 }}
              sm={{ span: 24, offset: 0 }}
              xs={{ span: 24, offset: 0 }}
            >
              <Card
                style={{
                  borderColor: 'rgba(10, 103, 233, 0.3)',
                  minHeight: '30vw',
                  paddingBottom: 0,
                  position: 'relative',
                }}
                bodyStyle={{ padding: 0 }}
              >
                <img
                  style={{
                    position: 'absolute',
                    borderRadius: 10,
                    width: !isMobile ? 380 : 320,
                    height: !isMobile ? 240 : 180,
                    margin: 'auto',
                    display: 'block',
                    left: '50%',
                    transform: 'translate(-50%, -60%)',
                  }}
                  src="/images/home/SCF/mo-hinh-etradevn-15-20230704090338-h_kn-.png"
                />
                <div className="body" style={{ marginTop: '12vh' }}>
                  <Title
                    level={5}
                    style={{
                      fontSize: 22,
                      fontWeight: 'bold',
                      lineHeight: 1.2,
                      color: ' rgb(10, 103, 233)',
                      textAlign: 'center',
                    }}
                  >
                    Nhà cung ứng
                  </Title>
                  <ul style={{ marginRight: 20, fontSize: 17, textAlign: 'justify' }}>
                    <li>

                      Dễ dàng tăng vốn lưu động mà không ảnh hưởng đến hạn mức tín dụng của doanh nghiệp
                    </li>
                    <li>

                      Nhận thanh toán sớm từ doanh nghiệp, giải ngân nhanh chóng từ ngân hàng
                    </li>
                    <li>

                      Giảm thiểu rủi ro thanh toán với Bên mua
                    </li>
                    <li>

                      Dự đoán nhu cầu – điều chỉnh sản xuất và cung ứng dựa trên dữ liệu lớn
                    </li>
                  </ul>
                </div>
              </Card>
            </Col>
          </Row>
        </animated.div>
      ))}
    </div>
  );
}

export default Ecosystem;
