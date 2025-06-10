import React from 'react';
import { Input, Button, Image, Row, Col, Card, Flex, Typography } from 'antd';
import { useTransition, animated, config } from '@react-spring/web';
import useIsMobile from '../../../../hooks/use-is-mobile';

const { Text, Link, Title } = Typography;

function Modal({ display }: any) {
    const isMobile = useIsMobile()
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
        <div className='SECTION5' style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', margin: !isMobile ? '3% 13% 0 13%' : '3% 5% 0 5%' }}>
            <Row>
                <Col lg={{ span: 24 }} md={{ span: 20 }} sm={{ span: 24 }} xs={{ span: 24 }}>
                    <Row justify={'center'}>
                        {
                            titleTransition((style, item) => (
                                <animated.div style={style}>
                                    <Title level={3} style={{ textAlign: 'center', marginBottom:35 }}>Mô hình hệ thống phân tích</Title>
                                </animated.div>
                            ))
                        }
                    </Row>
                </Col>
                <Col lg={{ span: 24 }} md={{ span: 24 }} sm={{ span: 24 }} xs={{ span: 24 }}>
                    <Row justify={'center'}>
                        {
                            imgTransition((style, item) => (
                                <animated.div style={style}>
                                    <Image preview={false} style={{ width: '100%', height: 'auto' }} src='/images/home/Business-health/frame-427319349-20230930150119-yg7tx.png' />
                                </animated.div>
                            ))
                        }
                    </Row>
                </Col>
            </Row>
        </div>
    );
}

export default Modal;