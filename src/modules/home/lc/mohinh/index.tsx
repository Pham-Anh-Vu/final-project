import React from 'react';
import { Input, Button, Image, Row, Col, Card, Flex, Typography } from 'antd';
import './index.css'
import { useTransition, animated, config } from '@react-spring/web';
import useIsMobile from '../../../../hooks/use-is-mobile';

const { Text, Link, Title } = Typography;

function Modal({ display }:any) {
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
        <div className='SECTION5' style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', margin: !isMobile ? '3% 8% 0 8%' : '3% 5% 0 5%' }}>
            <Row justify={'center'}>
                <Col lg={{ span: 24, offset: 0 }} md={{ span: 20, offset: 2 }}>
                    {
                        titleTransition((style, item) => (
                            <animated.div style={style}>
                                <Title level={3} style={{ textAlign: 'center', marginBottom:35 }}>Mô hình vận hành của TradeFlat</Title>
                            </animated.div>
                        ))
                    }
                </Col>
                <Col lg={{ span: 16, offset: 0 }} md={{ span: 16, offset: 0 }} sm={{ span: 24, offset: 0 }} xs={{ span: 24, offset: 0 }}>
                    {
                        imgTransition((style, item) => (
                            <animated.div style={style}>
                                <Image preview={false} style={{ width: '100%', height: 'auto' }} src='/images/home/LC/lc_vi-20231224081448-omod_.png' />
                            </animated.div>
                        ))
                    }
                </Col>
            </Row>
        </div>
    );
}

export default Modal;