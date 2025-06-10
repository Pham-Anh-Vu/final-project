import React from 'react';
import { Input, Button, Image, Row, Col, Card, Flex, Typography } from 'antd';
import './index.css'
import { useTransition, animated, config } from '@react-spring/web';

const { Text, Link, Title, Paragraph } = Typography;

function FintechDigitalization({ display, isMobile }: any) {
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
        <div className='SECTION' style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', margin: !isMobile ? '3% 13% 0 13%' : '3% 5% 0 5%' }}>
            <Row align={'bottom'} justify={'space-between'} gutter={[0,32]}> 
                <Col lg={{ span: 11 }}>
                    <Row>
                        <Col>
                            {
                                textTransition((style, item) => (
                                    <animated.div style={style}>
                                        <Title level={3} style={{ marginBottom: '20px' }}>Số hóa quy trình giao dịch tài chính số cho doanh nghiệp & ngân hàng</Title>
                                    </animated.div>
                                ))
                            }
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            {
                                imageTransition((style, item) => (
                                    <animated.div style={style}>
                                        <Image preview={false} style={{ width: '100%', height: '100%', borderRadius: '0 100px 0 0' }} src='/images/home/Overview/lc-26-20221018174814-seuvq.png' />
                                    </animated.div>
                                ))
                            }
                        </Col>
                    </Row>
                </Col>

                <Col lg={{ span: 11 }}>
                    <Row gutter={[0,32]} align={'bottom'} justify={'space-between'}>
                        <Col lg={{ span: 11 }} >
                            <Row>
                                {
                                    imageTransition((style, item) => (
                                        <animated.div style={style}>
                                            <Col>
                                                <Image preview={false} style={{ width: 44, height: 44 }} src='/images/home/Overview/lc-10-20221018162253-em9l8.png' />
                                            </Col>

                                            <Col>
                                                <Title level={5} style={{ marginBottom: '1%' }}>Nhanh chóng</Title>
                                            </Col>

                                            <Col>
                                                <Paragraph ellipsis={{ rows: 4, expandable: true, symbol: 'more' }} style={{ lineHeight: 1.6, textAlign: 'justify', fontWeight: 400 }}>Thời gian xử lý giao dịch giảm tới 90% so với luồng giao dịch truyền thống. Giao dịch được thực hiện tức thời và cập nhật giữa các bên.</Paragraph>
                                            </Col>
                                        </animated.div>
                                    ))
                                }
                            </Row>

                            <Row>
                                {
                                    imageTransition((style, item) => (
                                        <animated.div style={style}>
                                            <Col>
                                                <Image preview={false} style={{ width: 44, height: 44, marginTop: '65%' }} src='/images/home/Overview/lc-09-20221018162253-z4ekj.png' />
                                            </Col>
                                            <Col>
                                                <Title level={5} style={{ marginBottom: '1%' }}>An toàn, bảo mật</Title>
                                            </Col>
                                            <Col>
                                                <Paragraph ellipsis={{ rows: 4, expandable: true, symbol: 'more' }} style={{ lineHeight: 1.6, textAlign: 'justify', display: 'block', fontWeight: 400 }}>TradeFlat được phát triển trên cơ sở áp dụng những giải pháp công nghệ tiên tiến, đồng thời đảm bảo an toàn và bảo mật của hệ thống: Blockchain, FPT CA, AI, OCR...</Paragraph>
                                            </Col>
                                        </animated.div>
                                    ))
                                }
                            </Row>
                        </Col>

                        <Col lg={{ span: 11 }} md={{ span: 24 }}>
                            <Row>
                                {
                                    imageTransition((style, item) => (
                                        <animated.div style={style}>
                                            <Col>
                                                <Image preview={false} style={{ width: 44, height: 44 }} src='/images/home/Overview/lc-11-20221018162253-qxyc9.png' />
                                            </Col>
                                            <Col>
                                                <Title level={5} style={{ marginBottom: '1%' }}>Tiết kiệm</Title>
                                            </Col>

                                            <Col>
                                                <Paragraph ellipsis={{ rows: 4, expandable: true, symbol: 'more' }} style={{ lineHeight: 1.6, textAlign: 'justify', display: 'block', fontWeight: 400 }}>Chi phí chuyển phát nhanh, chi phí văn phòng phẩm bản cứng và các chi phí nhân sự liên quan tới các thao tác thủ công.</Paragraph>
                                            </Col>
                                        </animated.div>
                                    ))
                                }
                            </Row>
                            <Row>
                                {
                                    imageTransition((style, item) => (
                                        <animated.div style={style}>

                                            <Col>
                                                <Image preview={false} style={{ width: 44, height: 44, marginTop: '65%' }} src='/images/home/Overview/lc-12-20221018162253-hjr4l.png' />
                                            </Col>
                                            <Col>
                                                <Title level={5} style={{ marginBottom: '1%' }}>Tập trung</Title>
                                            </Col>
                                            <Col>
                                                <Paragraph ellipsis={{ rows: 4, expandable: true, symbol: 'more' }} style={{ lineHeight: 1.6, textAlign: 'justify', display: 'block', fontWeight: 400 }}>Kết nối giữa Doanh nghiệp mua và bán, giữa Doanh nghiệp và Ngân hàng. Các thông tin và chứng từ được cập nhật, thông suốt giữa các bên.</Paragraph>
                                            </Col>
                                        </animated.div>
                                    ))
                                }
                            </Row>
                        </Col>
                    </Row>

                </Col>
            </Row>
        </div >
    );
}

export default FintechDigitalization;