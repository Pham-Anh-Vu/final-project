import React, { useState } from 'react';
import { Input, Button, Image, Row, Col, Card, Flex, Typography, Switch } from 'antd';
import './index.css';
import { useTransition, animated, config } from '@react-spring/web';
import useIsMobile from '../../../../hooks/use-is-mobile';

const { Text, Link, Title, Paragraph } = Typography;

function Ecosystem({ display }: any) {
  const isMobile = useIsMobile()
  const [ellipsis, setEllipsis] = useState(true);

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
                Hệ sinh thái tài chính số cho doanh nghiệp trên nền tảng kết nối với các ngân hàng
                thương mại tại Việt Nam
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
                  minHeight: '25vw',
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
                  src="/images/home/Overview/lc-24-20221018174156-p3nss.png"
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
                    Đối với ngân hàng
                  </Title>
                  <ul style={{ marginRight: 20, fontSize: 17, textAlign: 'justify', paddingBottom: 50 }}>
                    <li>
                      Ngân hàng phát hành L/C theo chuẩn tin điện eTradevn hoặc gửi từ hệ thống Ngân hàng qua API tới eTradevn
                    </li>
                    <li>
                      Xử lý liền mạch luồng trao đổi giữa Ngân hàng phát hành - Ngân hàng tài trợ - Ngân hàng thụ hưởng
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
                  minHeight: '25vw',
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
                  src="/images/home/Overview/image-13-5-1-20231001090129-p514x.jpg"
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
                    Đối với doanh nghiệp lớn
                  </Title>
                  <ul style={{ marginRight: 20, fontSize: 17, textAlign: 'justify' }}>
                    <li>

                      Mở tài khoản giao dịch trên nền tảng thông qua eKYC
                    </li>
                    <li>

                      Ký hợp đồng mua bán trực tuyến hay ký số chứng thực đối với hợp đồng mua bán đã ký
                    </li>
                    <li>

                      Tạo bản nháp L/C và đề nghị phát hành tới ngân hàng theo thời gian thực
                    </li>
                    <li>
                      Xuất trình bộ chứng từ điện tử ngay trên nền tảng
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
                  minHeight: '25vw',
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
                  src="/images/home/Overview/image-12-1-20231001083427-i0mea.jpg"
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
                    Đối với doanh nghiệp vừa & nhỏ
                  </Title>
                  <ul style={{ marginRight: 20, fontSize: 17, textAlign: 'justify' }}>
                    <li>

                      Tháo gỡ “điểm nghẽn” thiếu hụt vốn, gia tăng cơ hội vay vốn với các ngân
                      hàng uy tín
                    </li>
                    <li>

                      Thúc đẩy tìm kiếm và thiết lập quan hệ bán hàng (nhà sản xuất, nhà phân
                      phối...) chặt chẽ, lâu dài
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
