import { Col, Row, Typography } from 'antd';
import React from 'react';
import { animated, config, useTransition } from '@react-spring/web';

const { Text, Title } = Typography

function Challenge({ display, isMobile }: any) {
    const transition = useTransition(display, {
        from: { x: -50, opacity: 0 },
        enter: { x: 0, opacity: 1 },
        config: config.slow,
        delay: 500
    })

    return (
        <div style={{ display: 'flex', justifyContent: "center", flexDirection: 'column', alignItems: 'center', margin: !isMobile ? '3% 10% 0% 10%' : '3% 5% 0% 5%' }}>
            {
                transition((style, item) => (
                    <animated.div style={style}>
                        <Col>
                            <Row justify={'center'}>
                                <Col lg={{ span: 18 }}>
                                    <Title level={3} style={{ textAlign: 'center', marginBottom:35 }}>
                                        Thách thức trong quá trình tiếp cận vốn vay từ ngân hàng và giao dịch thương mại quốc tế -
                                        DxPerts™
                                    </Title>
                                </Col>
                            </Row>
                            <Row justify={'center'}>
                                <Col lg={{ span: 15 }} xs={{span:24}}>
                                    <div style={{margin: 'auto', height:'26vw', minHeight:260}}>
                                        <iframe
                                            src="https://www.youtube.com/embed/N4PQtjUWf7s?rel=0&modestbranding=0&playsinline=0&controls=1&enablejsapi=1&origin=https%3A%2F%2Fwww.tradeflat.com&widgetid=1"
                                            title="youtube video"
                                            allowFullScreen
                                            width={'100%'}
                                            height={'100%'}
                                        ></iframe>
                                    </div>
                                </Col>
                            </Row>
                        </Col>
                    </animated.div >
                ))
            }


        </div >

    );
}

export default Challenge;
