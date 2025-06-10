import React, { useState, useEffect } from "react";
import { Input, Button, Image, Row, Col, Card, Flex, Typography } from "antd";
import { animated, config, useTransition } from "@react-spring/web";

import "./index.css";
const { Text, Link, Title } = Typography;

function Instruct({ display }:any) {
    const cardTransition = useTransition(display, {
        from: { x: -50, opacity: 0 },
        enter: { x: 0, opacity: 1 },
        config: config.slow,
        delay:500
    })

    const imgTransition = useTransition(display, {
        from: { x: 50, opacity: 0 },
        enter: { x: 0, opacity: 1 },
        config: config.slow,
        delay:500
    })
    const [activeTabKey1, setActiveTabKey1] = useState<string>('tab1');
    const onTab1Change = (key: string) => {
        setActiveTabKey1(key);
    };
    const tabList = [
        {
            key: "tab1",
            tab: "Doanh nghiệp",
        },
        {
            key: "tab2",
            tab: "Ngân hàng",
        },
    ];

    const contentList: Record<string, React.ReactNode> = {
        tab1:
            <ul style={{ columnCount: 2, columnGap: 100 }}>
                <li><Text className="textStyle">Đăng ký doanh nghiệp</Text></li>
                <li><Text className="textStyle">Hợp đồng SCF</Text></li>
                <li><Text className="textStyle">Hợp đồng tín dụng</Text></li>
                <li><Text className="textStyle">Đề nghị tham gia CTTT</Text></li>
                <li><Text className="textStyle">Hóa đơn</Text></li>
                <li><Text className="textStyle">Đơn hàng</Text></li>
                <li><Text className="textStyle">Yêu cầu tài trợ hóa đơn</Text></li>
                <li><Text className="textStyle">Yêu cầu tài trợ đơn hàng</Text></li>
            </ul>,
        tab2:
            <ul style={{ columnCount: 2, columnGap: 100 }}>
                <li><Text className="textStyle">Đăng ký doanh nghiệp</Text></li>
                <li><Text className="textStyle">Hợp đồng SCF</Text></li>
                <li><Text className="textStyle">Hợp đồng tín dụng</Text></li>
                <li><Text className="textStyle">Đề nghị tham gia CTTT</Text></li>
                <li><Text className="textStyle">Hóa đơn</Text></li>
                <li><Text className="textStyle">Đơn hàng</Text></li>
                <li><Text className="textStyle">Yêu cầu tài trợ hóa đơn</Text></li>
                <li><Text className="textStyle">Yêu cầu tài trợ đơn hàng</Text></li>
            </ul>,
    };
    return (
        <div className="Instruct" style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            margin: "3% 8% 0 8%",
        }}>
            <Row justify='space-between' align={'middle'} gutter={[0, 64]}>
                <Col lg={{ span: 10 }} md={{ span: 24 }} sm={{ span: 24 }} xs={{ span: 24 }}>
                    {
                        cardTransition((style, item) => (
                            <animated.div style={style}>
                                <Row>
                                    <Title level={3} style={{ textAlign: 'center' }}>Hướng dẫn sử dụng</Title>
                                </Row>
                                <Row justify={'center'}>
                                    <Col>
                                        <Card
                                            style={{ width: '100%', height: '100%', backgroundColor: 'rgb(239, 248, 255)' }}
                                            tabList={tabList}
                                            activeTabKey={activeTabKey1}
                                            onTabChange={onTab1Change}
                                        >
                                            {contentList[activeTabKey1]}
                                        </Card>
                                    </Col>
                                </Row>
                            </animated.div>
                        ))
                    }
                </Col>
                <Col lg={{ span: 12 }}>
                    {
                        imgTransition((style, item) => (
                            <animated.div style={style}>
                                <Image preview={false} style={{ width: '100%', height: 'auto' }} src="/images/home/SCF/image-10-20230929020340-w9ot-.png"> </Image>
                            </animated.div>
                        ))
                    }
                </Col>
            </Row>
        </div>
    );
}

export default Instruct;
