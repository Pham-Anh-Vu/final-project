import React, { useState } from 'react';
import { Input, Button, Image, Row, Col, Card, Flex, Typography, Switch } from 'antd';
import './index.css';
import { useTransition, animated, config } from '@react-spring/web';
const { Text, Link, Title, Paragraph } = Typography;

function Ecosystem({ display, isMobile }: any) {
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
              lg={{ span: 24, offset: 0 }}
              md={{ span: 24, offset: 0 }}
              sm={{ span: 24, offset: 0 }}
              xs={{ span: 24, offset: 0 }}
            >
              <Card
                style={{
                  borderColor: 'rgba(10, 103, 233, 0.3)',
                  minHeight: '28vw',
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

                      Cơ hội kết nối, hợp tác tài trợ nhanh chóng với Doanh nghiệp tiềm năng với
                      chuỗi nhà phân phối/ nhà cung ứng rộng khắp
                    </li>
                    <li>

                      Theo dõi sức khỏe tài chính của ngân hàng theo thời gian thực, tăng tốc giải
                      ngân, đưa ra cảnh báo về nợ xấu, phòng ngừa rủi ro mất vốn
                    </li>
                  </ul>
                </div>
              </Card>
            </Col>

            <Col
              xxl={{ span: 7 }}
              lg={{ span: 24, offset: 0 }}
              md={{ span: 24, offset: 0 }}
              sm={{ span: 24, offset: 0 }}
              xs={{ span: 24, offset: 0 }}
            >
              <Card
                style={{
                  borderColor: 'rgba(10, 103, 233, 0.3)',
                  minHeight: '28vw',
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

                      Quản lý tổng thể chuỗi hoạt động kinh doanh, phân phối hàng hoá rộng khắp
                      trên hệ thống Smart DMS
                    </li>
                    <li>

                      Theo dõi sức khỏe tài chính của ngân hàng theo thời gian thực, tăng tốc chu
                      kỳ thu tiền bình quân
                    </li>
                    <li>

                      Theo dõi xuyên suốt kết nối cung - cầu hàng hoá, xúc tiến kế hoạch sản xuất
                      nhanh chóng và thông minh
                    </li>
                    <li>

                      Đa dạng hệ sinh thái đối tác nhà cung ứng, nhà phân phối tiềm năng, uy tín
                    </li>
                  </ul>
                </div>
              </Card>
            </Col>

            <Col
              xxl={{ span: 7 }}
              lg={{ span: 24, offset: 0 }}
              md={{ span: 24, offset: 0 }}
              sm={{ span: 24, offset: 0 }}
              xs={{ span: 24, offset: 0 }}
            >
              <Card
                style={{
                  borderColor: 'rgba(10, 103, 233, 0.3)',
                  minHeight: '28vw',
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
