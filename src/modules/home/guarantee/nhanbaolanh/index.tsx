import React from 'react';
import { Input, Button, Image, Row, Col, Card, Flex, Typography } from 'antd';
import './index.css'
import { useTransition, animated, config } from '@react-spring/web';

const { Text, Link, Title } = Typography;

function ReceiveGuarantees({ display }: any) {
    const titleTransition = useTransition(display, {
        from: { y: -50, opacity: 0 },
        enter: { y: 0, opacity: 1 },
        config: config.slow,
        delay: 500
    })

    const imgTransition = useTransition(display, {
        from: { y: 50, opacity: 0 },
        enter: { y: 0, opacity: 1 },
        config: config.slow,
        delay: 500
    })

    return (
        <div style={{ backgroundColor: 'rgb(239, 248, 255)', paddingBottom: '5%' }}>
            <div className='SECTION5' style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', margin: '0% 13% 0 13%' }}>
                <Row>
                    <Col lg={{ span: 24, offset: 0 }} md={{ span: 20, offset: 2 }}>
                        {
                            titleTransition((style, item) => (
                                <animated.div style={style}>
                                    <Title level={3} style={{ textAlign: 'center', marginTop: '5%' }}>Nghiệp vụ phát hành Cam kết bảo lãnh</Title>
                                    <Title level={5} style={{ textAlign: 'center' }}>Doanh nghiệp bên nhận bảo lãnh</Title>
                                </animated.div>
                            ))
                        }
                    </Col>
                    <Col lg={{ span: 24, offset: 0 }} md={{ span: 24, offset: 0 }} sm={{ span: 24, offset: 0 }} xs={{ span: 24, offset: 0 }}>
                        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                            {
                                imgTransition((style, item) => (
                                    <animated.div style={style}>
                                        <Image preview={false} style={{ width: '100%', height: 'auto', minWidth: '420px' }} src='/images/home/Guarantee/frame-427319353-20231001061612-v2b3h-v1.png' />
                                    </animated.div>
                                ))
                            }
                        </div>
                    </Col>
                </Row>
            </div>
        </div>
    );
}

export default ReceiveGuarantees;