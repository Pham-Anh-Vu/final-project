import React from "react";
import { Input, Button, Image, Row, Col, Card, Flex, Typography } from "antd";
import { useTransition, animated, config } from "@react-spring/web";
import useIsMobile from "../../../../hooks/use-is-mobile";

const { Text, Link, Title } = Typography;

function Platform({ display }:any) {
    const isMobile = useIsMobile()
    const titleTransition = useTransition(display, {
        from: { y: -50, opacity: 0 },
        enter: { y: 0, opacity: 1 },
        config: config.slow,
        delay: 500
    })

    const imageTransition = useTransition(display, {
        from: { x: 50, opacity: 0 },
        enter: { x: 0, opacity: 1 },
        config: config.slow,
        delay: 500
    })

    const textTransition = useTransition(display, {
        from: { x: -50, opacity: 0 },
        enter: { x: 0, opacity: 1 },
        config: config.slow,
        delay: 500
    })

    return (
        <div style={{ margin: !isMobile ? "1% 13% 0 13%" : '1% 5% 0 5%' }}>
            <Col>
                <Row justify={"center"} style={{ textAlign: "center" }}>
                    {
                        titleTransition((style, item) => (
                            <animated.div style={style}>
                                <Title level={3} style={{marginBottom:35}}>
                                    Nền tảng phân tích dữ liệu và tài chính số cho doanh nghiệp
                                </Title>
                            </animated.div>
                        ))
                    }
                </Row>
                <Row align={'middle'}>
                    <Col lg={{ span: 12, order: 1 }} md={{ span: 24, order: 2 }} sm={{ span: 24, order: 2 }} xs={{ span: 24, order: 2 }} style={{ marginTop: '3%' }}>
                        {
                            textTransition((style, item) => (
                                <animated.div style={style}>
                                    <Row>
                                        <Col>
                                            <Title level={4}>Kết nối số - Báo cáo số</Title>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col lg={{ span: 20 }}>
                                            <Text
                                                style={{
                                                    lineHeight: 1.6,
                                                    textAlign: "justify",
                                                    display: "block",
                                                    
                                                    fontWeight: 400,
                                                    color: 'rgb(41, 41, 41)',
                                                }}
                                            >
                                                Nền tảng phân tích kinh doanh và tài chính số cho doanh nghiệp
                                                dựa trên dữ liệu lớn, đem tới cái nhìn tổng quan và chính xác
                                                về "sức khỏe doanh nghiệp" để định hướng chiến lược kinh doanh
                                                đồng thời hỗ trợ doanh nghiệp và ngân hàng theo dõi tình hình
                                                hoạt động của doanh nghiệp hiệu quả.
                                            </Text>
                                        </Col>
                                    </Row>
                                </animated.div>
                            ))
                        }
                    </Col>
                    <Col lg={{ span: 12, order: 2 }} md={{ span: 24, order: 1 }} sm={{ span: 24, order: 1 }} xs={{ span: 24, order: 1 }}>
                        {
                            imageTransition((style, item) => (
                                <animated.div style={style}>
                                    <Image
                                        preview={false}
                                        src="/images/home/Business-health/mo-hinh-etradevn-21-20230704091315-zboui.png"
                                        style={{ borderRadius: "100px 0 0 0" }}
                                    ></Image>
                                </animated.div>
                            ))
                        }
                    </Col>
                </Row>
            </Col>
        </div>
    );
}

export default Platform;
