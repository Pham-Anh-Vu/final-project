import React from "react";
import { Input, Button, Image, Row, Col, Card, Flex, Typography } from "antd";
import "./index.css";
import { useTransition, animated, config } from "@react-spring/web";
import useIsMobile from "../../../../hooks/use-is-mobile";

const { Text, Link, Title } = Typography;

function MultipleBenefits({ display }: any) {
  const isMobile = useIsMobile()
  const textTransition = useTransition(display, {
    from: { x: -50, opacity: 0 },
    enter: { x: 0, opacity: 1 },
    config: config.slow,
    delay: 500,
  });

  const imageTransition = useTransition(display, {
    from: { x: 50, opacity: 0 },
    enter: { x: 0, opacity: 1 },
    config: config.slow,
    delay: 500,
  });

  return (
    <div className="MultipleBenefits" style={{ margin: !isMobile ? '3% 11% 0 11%' : '3% 5% 0 5%' }}>
      <Row gutter={[64, 16]} justify='space-between' align="middle" >
        <Col lg={{ span: 10, order: 1 }} md={{ span: 24, order: 2 }}>
          {textTransition((style, item) => (
            <animated.div style={style}>
              <div>
                <Title level={3} style={{marginBottom:35}}>Một nền tảng - Đa lợi ích</Title>
                <p
                  style={{
                    lineHeight: 1.6,
                    textAlign: "justify",
                    fontWeight: 400,
                    width: "100%",
                    whiteSpace: "normal",
                  }}
                >
                  Nền tảng Supply Chain Finance - TradeFlat khép kín toàn trình
                  nghiệp vụ tài trợ số trong chuỗi cung ứng. Nền tảng tổng hợp
                  giải pháp DMS quản lý hoạt động bán hàng của doanh nghiệp và
                  nền tảng phân tích dữ liệu lớn Business Financial Health
                  Monitor từ đó thực hiện cảnh báo sớm sức khỏe tài chính của
                  doanh nghiệp để cùng với các ngân hàng triển khai các chương
                  trình tài trợ chuỗi hiệu quả cho các doanh nghiệp trong chuỗi.
                </p>
              </div>
            </animated.div>
          ))}
        </Col>

        <Col lg={{ span: 12, order: 2 }} md={{ span: 24, order: 1 }}>
          {imageTransition((style, item) => (
            <animated.div style={style}>
              <Image
                preview={false}
                style={{
                  width: "100%",
                  height: "auto",
                  borderRadius: "120px 0 0 0",
                }}
                src="/images/home/SCF/mo-hinh-etradevn-13-20230704090339-jcg0s.png"
              />
            </animated.div>
          ))}
        </Col>
      </Row>
    </div>
  );
}

export default MultipleBenefits;
