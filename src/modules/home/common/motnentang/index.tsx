import React from 'react';
import { Input, Button, Image, Row, Col, Card, Flex, Typography } from 'antd';
import './index.css'
import { useTransition, animated, config } from '@react-spring/web';
const { Text, Link, Title } = Typography;


function MillionsConnections({ display, isMobile }: any) {
    const textTransition = useTransition(display, {
        from: { x: -50, opacity: 0 },
        enter: { x: 0, opacity: 1 },
        config: config.slow,
        delay: 500
    })

    const imageTransition = useTransition(display, {
        from: { x: 50, opacity: 0 },
        enter: { x: 0, opacity: 1 },
        config: config.slow,
        delay:500
    })

    return (
        <div className='MillionsConnectionsHome' style={{margin: !isMobile ? '3% 13% 0 13%' : '3% 5% 0 5%'}}>
            <Row justify={'space-between'} align={'middle'}>
                <Col lg={{ span: 9, order: 1 }} md={{ span: 24, order: 2 }} sm={{ span: 24, order: 2 }} xs={{ span: 24, order: 2 }}>
                    {
                        textTransition((style, item) => (
                            <animated.div style={style}>
                                <div>
                                    <Title level={3}>Một nền tảng - Triệu kết nối</Title>
                                    <p style={{ lineHeight: 1.6,  textAlign: 'justify', fontWeight: 400, width: '100%', whiteSpace: 'normal' }}>Được nghiên cứu và phát triển bởi <span style={{ fontWeight: 'bold', color: 'rgb(47, 84, 235)' }}>FPT</span> cùng đối tác là các ngân hàng thương mại hàng đầu Việt Nam, <span style={{ fontWeight: 'bold', color: 'rgb(47, 84, 235)' }}>TradeFlat</span> ứng dụng công nghệ xu hướng Blockchain, giúp kết nối giữa ngân hàng và doanh nghiệp, phân tích dữ liệu và đưa ra các gợi ý kết nối, từ đó <span style={{ fontWeight: 'bold', color: 'rgb(47, 84, 235)' }}>giải quyết bài toán tổng thể về tài trợ vốn trong giao dịch thương mại cho các doanh nghiệp.</span></p>
                                </div>
                            </animated.div>
                        ))
                    }
                </Col>

                <Col lg={{ span: 13, order: 2 }} md={{ span: 24, order: 1 }} sm={{ span: 24, order: 1 }} xs={{ span: 24, order: 1 }}>
                    {
                        imageTransition((style, item) => (
                            <animated.div style={style}>
                                <Image preview={false} style={{ width: '100%', height: 'auto' }} src='/images/home/Overview/lc-20221018170424-dngaj-20230921064850-taxud.png' />
                            </animated.div>
                        ))
                    }
                </Col>
            </Row>
        </div>
    );
}

export default MillionsConnections;