import React from 'react';
import { Input, Button, Image, Row, Col, Card, Flex, Typography } from 'antd';
import './index.css'
import { useTransition, animated, config } from '@react-spring/web';
import useIsMobile from '../../../../hooks/use-is-mobile';

const { Text, Link, Title } = Typography;

function SponsorshipModel({ display }: any) {
    const isMobile = useIsMobile();
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
            <Row justify={'center'} style={{width:'100%'}}>
                <Col lg={{ span: 24 }} md={{ span: 20 }} xs={{span:24}}>
                    {
                        titleTransition((style, item) => (
                            <animated.div style={style}>
                                <Title level={3} style={{ textAlign: 'center', marginBottom:35 }}>Mô hình tài trợ chuỗi cung ứng</Title>
                            </animated.div>
                        ))
                    }
                </Col>
                <Col lg={{ span: 24 }} md={{ span: 24 }} sm={{ span: 24 }} xs={{ span: 24 }}>
                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        {
                            imgTransition((style, item) => (
                                <animated.div style={style}>
                                    <Image preview={false} style={{ width: '100%' }} src='/images/home/SCF/frame-427319354-20231002074820-lg3kt.png' />
                                </animated.div>
                            ))
                        }
                    </div>

                </Col>
            </Row>
        </div>
    );
}

export default SponsorshipModel;