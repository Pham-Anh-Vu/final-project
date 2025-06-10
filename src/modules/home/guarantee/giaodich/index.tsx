import React, { useState } from "react";
import { Input, Button, Image, Row, Col, Card, Flex, Typography } from "antd";
import { animated, config, useTransition } from "@react-spring/web";

import "./index.css";
import useIsMobile from "../../../../hooks/use-is-mobile";
const { Text, Link, Title, Paragraph } = Typography;

const Connection = ({ display }:any) => {
  const [ellipsis, setEllipsis] = useState(true);
  const isMobile = useIsMobile()

  const textTransition = useTransition(display, {
    from: { y: -50, opacity: 0 },
    enter: { y: 0, opacity: 1 },
    config: config.slow,
    delay: 500,
  });

  const imageTransition = useTransition(display, {
    from: { x: -50, opacity: 0 },
    enter: { x: 0, opacity: 1 },
    config: config.slow,
    delay: 500,
  });

  return (
    <div
      className="Transection"
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        margin: !isMobile ? "1% 8% 0 8%" : '1% 5% 0 5%',
      }}
    >
      <div>
        {textTransition((style, item) => (
          <animated.div style={style}>
            <Title
              level={3}
              style={{
                width: "100%",
                whiteSpace: "normal",
                textAlign: "center",
                marginBottom:35
              }}
            >
              Giao dịch minh bạch, Tăng tính tin cậy
            </Title>
          </animated.div>
        ))}
      </div>
      {imageTransition((style, item) => (
        <animated.div style={style}>
          <Row justify="space-evenly" align="middle" gutter={[0, 16]}>
            <Col lg={{ span: 7 }} md={{ span: 24 }}>
              <Card
                style={{
                  width: "100%",
                  height: "100%",
                  backgroundColor: "rgb(239, 248, 255)",
                  paddingBottom:'18%'
                }}
                bodyStyle={{ padding: 0 }}
              >
                  <Image preview={false} className="ImageStyle" src='/images/home/Guarantee/image-27-20231222033552-p4tzb.png' />
                  <Title level={5} style={{ padding: "0 20px 0 20px" }}>
                    Tiện lợi, tin cậy
                  </Title>
                  <ul>
                    <li>
                      <Paragraph ellipsis={{ rows: 4, expandable: true, symbol: "more" }} className="TextStyle">
                        Bảo lãnh điện tử là một hình thức bảo lãnh được thực hiện thông qua nền tảng eTradevn, thay vì sử dụng quy trình truyền thống.
                      </Paragraph>
                    </li>
                    <li>
                      <Paragraph ellipsis={{ rows: 5, expandable: true, symbol: "more" }} className="TextStyle">
                        Thông qua việc sử dụng công nghệ và các giải pháp chuyển đổi số ưu việt, nền tảng giao dịch bảo lãnh điện tử eTradevn giúp tăng tính tiện lợi, tốc độ và độ tin cậy trong nghiệp vụ bảo lãnh ngân hàng.
                      </Paragraph>
                    </li>
                  </ul>
              </Card>
            </Col>

            <Col lg={{ span: 7 }} md={{ span: 24 }}>
              <Card
                style={{
                  width: "100%",
                  height: "100%",
                  backgroundColor: "rgb(255, 250, 236)",
                  paddingBottom:'26%'

                }}
                bodyStyle={{ padding: 0, overflow: "hidden" }}
              >
                <Image
                  preview={false}
                  className="ImageStyle"
                  src="/images/home/Guarantee/image-26-20231222033017-gvtky.png"
                />
                <Title level={5} style={{ padding: "0 20px 0 20px" }}>
                  Giảm rủi ro gian lận
                </Title>
                <ul>
                  <li>
                    <Paragraph ellipsis={ellipsis ? { rows: 8, expandable: true, symbol: 'more' } : false} className="TextStyle">
                      Bảo lãnh điện tử cũng mang lại tính tin cậy cao hơn trong quá trình thực hiện các nghiệp vụ bảo lãnh. Hệ thống điện tử cho phép giao dịch và truyền thông thông tin được mã hóa và bảo mật, đảm bảo tính toàn vẹn và không thể chỉnh sửa các dữ liệu. Điều này tạo ra một môi trường an toàn và đáng tin cậy cho các giao dịch bảo lãnh.
                    </Paragraph>
                  </li>
                </ul>
              </Card>
            </Col>

            <Col lg={{ span: 7 }} md={{ span: 24 }}>
              <Card
                style={{
                  width: "100%",
                  height: "100%",
                  backgroundColor: "rgb(235, 253, 247)",
                  paddingBottom:'23%'

                }}
                bodyStyle={{ padding: 0, overflow: "hidden" }}
              >
                <Image
                  preview={false}
                  className="ImageStyle"
                  src="/images/home/Guarantee/icons8-bank-96-20231221152546-kivdi.png"
                />

                <Title level={5} style={{ padding: "0 20px 0 20px" }}>
                  Tiết kiệm chi phí
                </Title>
                <ul>
                  <li>
                    <Paragraph ellipsis={ellipsis ? { rows: 5, expandable: true, symbol: 'more' } : false} className="TextStyle">
                      Bảo lãnh điện tử cũng giúp giảm thiểu thủ tục giấy tờ và chi phí liên quan. Việc loại bỏ sự phụ thuộc vào giấy tờ truyền thống giúp giảm thiểu rủi ro về việc mất mát, hư hỏng hoặc gian lận.
                    </Paragraph>
                  </li>
                  <li>
                    <Paragraph ellipsis={ellipsis ? { rows: 3, expandable: true, symbol: 'more' } : false} className="TextStyle">
                      Đồng thời, việc giảm bớt việc in ấn và vận chuyển giấy tờ cũng giúp tiết kiệm chi phí và có tác động tích cực đến môi trường.
                    </Paragraph>
                  </li>
                </ul>

              </Card>
            </Col>
          </Row>
        </animated.div>
      ))}
    </div>
  );
};

export default Connection;
