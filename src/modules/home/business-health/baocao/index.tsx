import React from "react";
import { Input, Button, Image, Row, Col, Card, Flex, Typography } from "antd";
import { useTransition, animated, config } from "@react-spring/web";
import useIsMobile from "../../../../hooks/use-is-mobile";

const { Text, Link, Title, Paragraph } = Typography;

function Report({ display }:any) {
    const isMobile = useIsMobile()
    const sectionTransition = useTransition(display, {
        from: { x: 50, opacity: 0 },
        enter: { x: 0, opacity: 1 },
        config: config.slow,
        delay: 500,
    });

    return (
        <div style={{ margin: !isMobile ? "3% 13% 0% 13%" : '3% 5% 0% 5%' }}>
            <Row justify={"space-between"} gutter={[0, 64]}>
                <Col lg={{ span: 10 }}>
                    {sectionTransition((style, item) => (
                        <animated.div style={style}>
                            <Image
                                preview={false}
                                style={{
                                    width: "100%",
                                    height: "auto",
                                    borderRadius: "0 100px 0 0",
                                }}
                                src="/images/home/Business-health/mo-hinh-etradevn-11-20230704083557-2ylrc-1-20230927074051--mmfr.png"
                            ></Image>
                        </animated.div>
                    ))}
                </Col>
                <Col lg={{ span: 6 }}>
                    {sectionTransition((style, item) => (
                        <animated.div style={style}>
                            <Card
                                style={{
                                    backgroundColor: "rgb(239, 248, 255)",
                                    borderRadius: 30,
                                    paddingBottom: 85,
                                    minHeight: "22vw",
                                    maxHeight: 400,
                                    overflow: "hidden",
                                }}
                            >
                                <Image
                                    preview={false}
                                    src="/images/home/Business-health/mo-hinh-etradevn-09-20230704083558-2s1jc.png"
                                ></Image>
                                <Title level={4}>
                                    Báo cáo real-time về tình hình kinh doanh & tài chính
                                </Title>
                                <Text
                                    style={{
                                        lineHeight: 1.6,
                                        textAlign: "justify",
                                        display: "block",
                                        
                                        fontWeight: 400,
                                        color: "rgb(41, 41, 41)",
                                    }}
                                >
                                    Báo cáo giúp Ban Giám đốc doanh nghiệp, nhà đầu tư cũng như
                                    ngân hàng đưa ra quyết định chính xác và kịp thời
                                </Text>
                            </Card>
                        </animated.div>
                    ))}
                </Col>
                <Col lg={{ span: 6 }}>
                    {sectionTransition((style, item) => (
                        <animated.div style={style}>
                            <Card
                                style={{
                                    backgroundColor: "rgb(255, 250, 236)",
                                    borderRadius: 30,
                                    paddingBottom: 15,
                                    minHeight: "22vw",
                                    maxHeight: 400,
                                    overflow: "hidden",
                                }}
                            >
                                <Image
                                    preview={false}
                                    src="/images/home/Business-health/mo-hinh-etradevn-10-20230704083557-d1n5k.png"
                                ></Image>
                                <Title level={4}>
                                    Báo cáo trực quan về tình hình phát triển của doanh nghiệp
                                </Title>
                                <Text
                                    style={{
                                        lineHeight: 1.6,
                                        textAlign: "justify",
                                        display: "block",
                                        
                                        fontWeight: 400,
                                        color: "rgb(41, 41, 41)",
                                    }}
                                >
                                    Phân tích sức khỏe tài chính của doanh nghiệp về: tài sản và
                                    nguồn vốn, hoạt động kinh doanh, khả năng thanh toán, hiệu quả
                                    hoạt động, khả năng sinh lời.
                                </Text>
                            </Card>
                        </animated.div>
                    ))}
                </Col>
            </Row>
        </div>
    );
}

export default Report;
