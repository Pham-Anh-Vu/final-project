import React, { useState } from "react";
import { Input, Button, Image, Row, Col, Card, Flex, Typography } from "antd";
import { animated, config, useTransition } from "@react-spring/web";

import "./index.css";
import useIsMobile from "../../../../hooks/use-is-mobile";
const { Text, Link, Title, Paragraph } = Typography;

const DigitalTransformation = ({ display }:any) => {
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
      className="Connection"
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        margin: !isMobile ? "1% 8% 0 8%" : '1% 5% 0 5%',
      }}
    >
      <Col lg={{span: 12}}>
        {textTransition((style, item) => (
          <animated.div style={style}>
            <Title
              level={3}
              style={{
                width: "100%",
                whiteSpace: "normal",
                textAlign: "center",
                marginBottom: 35
              }}
            >
              Chuyển đổi số ưu việt hỗ trợ tối ưu việc xử lý toàn trình giao dịch L/C nội địa
            </Title>
          </animated.div>
        ))}
      </Col>
      {imageTransition((style, item) => (
        <animated.div style={style}>
          <Row justify="space-evenly" gutter={[0, 16]}>
            <Col lg={{ span: 6 }} xs={{ span: 24 }}>
              <Card
                style={{
                  width: "100%",
                  minHeight: "18rem",
                  backgroundColor: "rgb(239, 248, 255)",
                }}
                bodyStyle={{ padding: 0, overflow: "hidden" }}
              >
                {/* <Image preview={false} className="ImageStyle" src='https://w.ladicdn.com/s350x400/60b444ceeba2a30012e68735/lc-13-20221018164134-afxl_.png' /> */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  xmlnsXlink="http://www.w3.org/1999/xlink"
                  version="1.1"
                  x="0px"
                  y="0px"
                  viewBox="0 0 100 100"
                  enableBackground="new 0 0 100 100"
                  xmlSpace="preserve"
                  preserveAspectRatio="none"
                  className="ImageStyle"
                  fill="rgba(47, 84, 235, 1)"
                >
                  <path d="M28.3,87.1l4.9-3.5c1.7,0.9,3.6,1.6,5.5,2.2l1,6c0.6,3.2,3.3,5.5,6.5,5.5c0,0,0,0,0.1,0l8.2-0.1c3.2,0,6-2.4,6.5-5.6l1-6  c1.8-0.6,3.5-1.3,5.2-2.2l5,3.5c2.7,1.9,6.2,1.5,8.5-0.8l5.7-5.8c2.3-2.3,2.5-5.9,0.6-8.5L83.5,67c0.9-1.8,1.7-3.6,2.2-5.4l6-1.1  c3.2-0.6,5.5-3.3,5.5-6.6l-0.1-8.2c0-3.2-2.4-6-5.6-6.5l-5.9-0.9c-0.6-1.9-1.4-3.7-2.3-5.4l3.5-5c1.8-2.7,1.5-6.2-0.8-8.5l-5.8-5.7  c-2.3-2.3-5.9-2.5-8.5-0.7L48.4,29.6c-5,0.4-9.7,2.6-13.2,6.3c-3.8,4-5.8,9.1-5.7,14.6c0.3,11.1,9.4,20,20.4,20c0.2,0,0.3,0,0.5,0  c11.3-0.3,20.2-9.6,20-20.9c-0.1-2.3-0.5-4.5-1.2-6.6c-0.7-1.8-2.7-2.7-4.5-2.1c-1.8,0.7-2.7,2.7-2.1,4.5c0.5,1.4,0.8,2.8,0.8,4.3  c0.2,7.4-5.7,13.6-13.1,13.8c-7.5,0.1-13.6-5.7-13.8-13.1c-0.1-3.6,1.2-7,3.7-9.6c2.5-2.6,5.8-4.1,9.4-4.2c0.7,0,1.4-0.2,1.9-0.6  l24.1-17.1l5.3,5.2l-3.4,4.8C76.2,31,76,33.7,77.2,36c0.7,1.5,1.4,3,1.9,4.5c0.8,2.5,2.9,4.3,5.4,4.7l5.7,0.9l0.1,7.5l-5.8,1  c-2.5,0.4-4.5,2.2-5.3,4.7c-0.5,1.5-1.1,3-1.9,4.5c-1.2,2.3-1,5.1,0.5,7.2l3.4,4.6L75.9,81l-4.8-3.4C69,76.1,66.3,76,64,77.2  c-1.4,0.7-2.8,1.3-4.3,1.8c-2.5,0.8-4.2,2.9-4.7,5.4l-0.9,5.7l-7.5,0.1l-1-5.7c-0.4-2.5-2.3-4.6-4.7-5.4c-1.6-0.5-3.1-1.1-4.5-1.8  c-2.3-1.2-5-1-7.1,0.5l-4.7,3.4L19.1,76l3.3-4.8c1.5-2.1,1.6-4.8,0.4-7.1c-0.7-1.4-1.4-2.9-1.9-4.5c-0.8-2.5-2.9-4.2-5.4-4.6L9.8,54  l-0.1-7.5l5.8-1c2.5-0.4,4.6-2.3,5.4-4.7c0.5-1.6,1.1-3.1,1.8-4.5c1.2-2.3,1-5-0.5-7.1l-3.4-4.7l5.2-5.3l4.8,3.3  c2.1,1.5,4.9,1.6,7.2,0.4c1.5-0.8,3-1.4,4.6-1.9c2.5-0.8,4.3-2.9,4.7-5.5l0.9-5.6L54,9.8c1.9,0,3.5-1.6,3.5-3.5  c0-1.9-1.6-3.5-3.5-3.5c0,0,0,0,0,0l-8.2,0.1c-3.2,0-6,2.4-6.5,5.6l-0.9,5.9c-2,0.6-3.9,1.4-5.7,2.4l-5-3.5  c-2.7-1.8-6.2-1.5-8.5,0.8l-5.7,5.8c-2.3,2.3-2.5,5.9-0.6,8.5l3.5,4.9c-0.9,1.7-1.6,3.6-2.2,5.5l-6,1c-3.1,0.6-5.4,3.2-5.5,6.3  c0,0.1,0,0.1,0,0.2l0.1,8.2c0,3.2,2.4,6,5.6,6.5l6,1c0.6,1.9,1.4,3.7,2.3,5.4l-3.5,5c-1.8,2.7-1.5,6.2,0.8,8.5l5.8,5.7  C22.1,88.7,25.6,89,28.3,87.1z"></path>
                </svg>
                <Title level={4} style={{ padding: "0 20px 0 20px" }}>
                  Quy trình liền mạch
                </Title>
                <Paragraph ellipsis={{rows:3, expandable:true, symbol:'more'}} className="TextStyle"> 
                  Giao dịch điện tử xuyên suốt giữa Doanh nghiệp - Doanh nghiệp,
                  Ngân hàng - Ngân hàng và Doanh nghiệp - Ngân hàng
                </Paragraph>
              </Card>
            </Col>

            <Col lg={{ span: 6 }} xs={{ span: 24 }}>
              <Card
                style={{
                  width: "100%",
                  minHeight: "18rem",
                  backgroundColor: "rgb(255, 250, 236)",
                }}
                bodyStyle={{ padding: 0, overflow: "hidden" }}
              >
                {/* <Image
                preview={false}
                className="ImageStyle"
                src="https://w.ladicdn.com/s400x400/60b444ceeba2a30012e68735/lc-14-20221018175515-me_bv.png"
              /> */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  xmlnsXlink="http://www.w3.org/1999/xlink"
                  version="1.1"
                  x="0px"
                  y="0px"
                  viewBox="0 0 100 100"
                  enableBackground="new 0 0 100 100"
                  xmlSpace="preserve"
                  preserveAspectRatio="none"
                  width="100%"
                  height="100%"
                  className="ImageStyle"
                  fill="rgba(253, 199, 87, 1)"
                >
                  <path d="M38.482,1L10,29.441V99h80V1H38.482z M38,10.67V29H19.468L38,10.67z M83,92H17V36h28V8h38V92z"></path>
                  <g>
                    <rect x="27" y="61" width="46" height="7"></rect>
                  </g>
                  <g>
                    <rect x="27" y="75" width="46" height="7"></rect>
                  </g>
                  <g>
                    <rect x="55" y="29" width="18" height="7"></rect>
                  </g>
                  <g>
                    <rect x="55" y="15" width="18" height="7"></rect>
                  </g>
                  <g>
                    <rect x="27" y="47" width="46" height="7"></rect>
                  </g>
                </svg>
                <Title level={4} style={{ padding: "0 20px 0 20px" }}>
                  Văn phòng không giấy
                </Title>
                <Paragraph ellipsis={{rows:1, expandable:true, symbol:'more'}} className="TextStyle"> 
                  Giảm tải số lượng chứng từ, hồ sơ bản cứng
                </Paragraph>
              </Card>
            </Col>

            <Col lg={{ span: 6 }} xs={{ span: 24 }}>
              <Card
                style={{
                  width: "100%",
                  minHeight: "18rem",
                  backgroundColor: "rgb(235, 253, 247)",
                }}
                bodyStyle={{ padding: 0, overflow: "hidden" }}
              >
                {/* <Image
                preview={false}
                className="ImageStyle"
                src="https://w.ladicdn.com/s400x400/60b444ceeba2a30012e68735/lc-15-20221018175515-sz-5d.png"
              /> */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  xmlnsXlink="http://www.w3.org/1999/xlink"
                  version="1.1"
                  x="0px"
                  y="0px"
                  viewBox="0 0 100 100"
                  enableBackground="new 0 0 100 100"
                  xmlSpace="preserve"
                  preserveAspectRatio="none"
                  width="100%"
                  height="100%"
                  className="ImageStyle"
                  fill="rgba(46, 181, 83, 1)"
                >
                  <rect
                    x="76.732"
                    y="46.587"
                    width="9.364"
                    height="5.245"
                  ></rect>
                  <rect
                    x="50.507"
                    y="71.545"
                    width="5.245"
                    height="9.364"
                  ></rect>
                  <rect
                    x="67.55"
                    y="27.483"
                    transform="matrix(0.7071 -0.7071 0.7071 0.7071 -0.132 59.8931)"
                    width="9.364"
                    height="5.245"
                  ></rect>
                  <rect
                    x="67.55"
                    y="65.692"
                    transform="matrix(0.7071 0.7071 -0.7071 0.7071 69.4617 -31.0665)"
                    width="9.364"
                    height="5.245"
                  ></rect>
                  <path d="M38.17,63.372l12.437-12.442V25.783h7.953v28.293c-0.553,0.553-14.762,14.922-14.762,14.922L38.17,63.372z"></path>
                  <path d="M55.125,6.69v7.507c19.4,0,35.185,15.785,35.185,35.188c0,19.402-15.785,35.187-35.185,35.187  c-17.803,0-32.552-13.298-34.86-30.481l5.355,5.282l5.309-5.309L16.261,39.396L1.555,54.065l5.309,5.309l5.783-5.783  c2.12,21.573,20.361,38.489,42.48,38.489c23.539,0,42.693-19.153,42.693-42.694C97.818,25.844,78.666,6.69,55.125,6.69z"></path>
                </svg>
                <Title level={4} style={{ padding: "0 20px 0 20px" }}>
                  Tiết kiệm thời gian
                </Title>
                <Paragraph ellipsis={{rows:2, expandable:true, symbol:'more'}} className="TextStyle"> 
                  Rút ngắn thời gian xử lý quy trình, phê duyệt hồ sơ, chứng từ,
                  đề nghị tín dụng,...
                </Paragraph>
              </Card>
            </Col>
          </Row>
        </animated.div>
      ))}
    </div>
  );
};

export default DigitalTransformation;
