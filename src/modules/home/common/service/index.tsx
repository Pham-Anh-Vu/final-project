import React, { useState } from 'react';
import { Input, Button, Image, Row, Col, Card, Flex, Typography } from 'antd';
import { animated, config, useTransition } from '@react-spring/web';

import './index.css'
const { Text, Link, Title, Paragraph } = Typography;

const BlockchainFunding = ({ display, isMobile }: any) => {
    const [ellipsis, setEllipsis] = useState(true);

    const textTransition = useTransition(display, {
        from: { y: -50, opacity: 0 },
        enter: { y: 0, opacity: 1 },
        config: config.slow,
        delay: 500
    })

    const imageTransition = useTransition(display, {
        from: { x: -50, opacity: 0 },
        enter: { x: 0, opacity: 1 },
        config: config.slow,
        delay: 500
    })

    return (
        <div className='BlockchainFundingHome' style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', margin: !isMobile ? '1% 10% 0% 10%' : '1% 5% 0% 5%' }}>
            <Col>
                <Row justify={'center'}>
                    <Col lg={{ span: 11 }}>
                        {
                            textTransition((style, item) => (
                                <animated.div style={style}>
                                    <Title level={3} style={{ textAlign: 'center', marginBottom: 35 }}>Tháo gỡ nút thắt, tạo kết nối số trong tài trợ vốn bằng các công nghệ chuyển đổi số hàng đầu</Title>
                                </animated.div>
                            ))
                        }
                    </Col>
                </Row>
                {
                    imageTransition((style, item) => (
                        <animated.div style={style}>
                            <Row justify={'space-evenly'} gutter={[0, 16]}>
                                <Col lg={{ span: 5 }}>
                                    <Card style={{ width: '100%', height: '100%', backgroundColor: 'rgb(239, 248, 255)' }} bodyStyle={{ padding: 0, overflow: 'hidden', paddingBottom: 80 }}>
                                        <Image preview={false} className="ImageStyle" src='/images/home/Overview/lc-13-20221018164134-afxl_.png' />
                                        <Title level={4} style={{ padding: '0 20px 0 20px' }}>
                                            Số hoá toàn trình nghiệp vụ tài trợ
                                        </Title>
                                        <Paragraph ellipsis={{ rows: 5, expandable: true, symbol: 'more' }} className='TextStyle'>
                                        Số hóa toàn trình hoạt động tài trợ thương mại và tài trợ chuỗi cung ứng trên 1 nền tảng, giúp tăng tốc giao dịch, tiết kiệm thời gian và chi phí so với luồng truyền thống
                                        </Paragraph>
                                    </Card>
                                </Col>
                                <Col lg={{ span: 5 }}>
                                    <Card style={{ width: '100%', height: '100%', backgroundColor: 'rgb(255, 250, 236)' }} bodyStyle={{ padding: 0, overflow: 'hidden', paddingBottom: 110 }}>
                                        <Image preview={false} className="ImageStyle" src='/images/home/Overview/lc-14-20221018175515-me_bv.png' />
                                        <Title level={4} style={{ padding: '0 20px 0 20px' }}>
                                            Kết nối cung - cầu tài chính
                                        </Title>
                                        <Paragraph ellipsis={{ rows: 4, expandable: true, symbol: 'more' }} className='TextStyle'>
                                            Kết nối cung - cầu tài chính giữa doanh nghiệp - ngân hàng, thúc đẩy quan hệ hợp tác kinh doanh tin cậy và bền vững
                                        </Paragraph>
                                    </Card>
                                </Col>
                                <Col lg={{ span: 5 }}>
                                    <Card style={{ width: '100%', height: '100%', backgroundColor: 'rgb(235, 253, 247)' }} bodyStyle={{ padding: 0, overflow: 'hidden', paddingBottom: 50 }}>
                                        <Image preview={false} className="ImageStyle" src='/images/home/Overview/lc-15-20221018175515-sz-5d.png' />
                                        <Title level={4} style={{ padding: '0 20px 0 20px' }}>
                                            Đánh giá & giám sát sức khỏe tài chính
                                        </Title>
                                        <Paragraph ellipsis={{ rows: 6, expandable: true, symbol: 'more' }} className='TextStyle'>
                                            Tận dụng dữ liệu lớn trong toàn bộ hoạt động đánh giá, xếp hạng doanh nghiệp, thiết lập chương trình tài trợ vốn hiệu quả và giám sát sức khỏe tài chính sau khi đã được tài trợ
                                        </Paragraph>
                                    </Card>
                                </Col>
                                <Col lg={{ span: 5 }} md={{span:24}}>
                                    <Card style={{ width: '100%', height: '100%', backgroundColor: 'rgb(249, 245, 255)' }} bodyStyle={{ padding: 0, overflow: 'hidden', paddingBottom: 100 }}>
                                        <Image preview={false} className="ImageStyle" src='/images/home/Overview/mask-group-1-20231221103252-u1jgi.png' />
                                        <Title level={4} style={{ padding: '0 20px 0 20px' }}>
                                            Bảo mật tối ưu - phòng chống gian lận
                                        </Title>
                                        <Paragraph ellipsis={{ rows: 3, expandable: true, symbol: 'more' }} className='TextStyle'>
                                        Hỗ trợ xác thực số liệu kinh doanh, đồng thời bảo mật tối đa dữ liệu khách hàng
                                        </Paragraph>
                                    </Card>
                                </Col>
                            </Row>
                        </animated.div>
                    ))
                }

            </Col>
        </div>
    )
}

export default BlockchainFunding;