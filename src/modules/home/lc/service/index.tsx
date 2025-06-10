import React, { useState } from 'react';
import { Input, Button, Image, Row, Col, Card, Flex, Typography } from 'antd';
import { animated, config, useTransition } from '@react-spring/web';

import './index.css'
import useIsMobile from '../../../../hooks/use-is-mobile';
const { Text, Link, Title, Paragraph } = Typography;

const BlockchainFunding = ({ display }: any) => {
    const [ellipsis, setEllipsis] = useState(true);
    const isMobile = useIsMobile();

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
        <div className='BlockchainFundingHome' style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', margin: !isMobile ? '3% 11% 0% 11%' : '3% 5% 0% 5%' }}>
            <Col>
                <Row justify={'center'}>
                    <Col lg={{ span: 14 }}>
                        {
                            textTransition((style, item) => (
                                <animated.div style={style}>
                                    <Title level={3} style={{ textAlign: 'center' }}>Minh bạch giao dịch, phê duyệt nhanh chóng</Title>
                                    <Title level={5} style={{ textAlign: 'center', marginBottom:'35px' }}>Lợi ích của Ngân hàng khi tham gia nền tảng</Title>
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
                                        <Image preview={false} className="ImageStyle" src='/images/home/LC/lc-13-20221018164134-afxl_.png' />
                                        <Title level={4} style={{ padding: '0 20px 0 20px' }}>
                                            Khách hàng và đối tác
                                        </Title>
                                        <ul>
                                            <li>
                                                <Paragraph ellipsis={{ rows: 4, expandable: true, symbol: 'more' }} className='TextStyle'>
                                                    Ngân hàng phát hành & Ngân hàng tài trợ dễ dàng thống nhất nguồn tài trợ ngay trên nền tảng
                                                </Paragraph>
                                            </li>
                                            <li>
                                                <Paragraph ellipsis={{ rows: 2, expandable: true, symbol: 'more' }} className='TextStyle'>
                                                    Đẩy nhanh năng suất và khả năng phục vụ khách hàng.
                                                </Paragraph>
                                            </li>
                                        </ul>
                                    </Card>
                                </Col>
                                <Col lg={{ span: 5 }}>
                                    <Card style={{ width: '100%', height: '100%', backgroundColor: 'rgb(255, 250, 236)' }} bodyStyle={{ padding: 0, overflow: 'hidden', paddingBottom: 110 }}>
                                        <Image preview={false} className="ImageStyle" src='/images/home/LC/lc-14-20221018175515-me_bv.png' />
                                        <Title level={4} style={{ padding: '0 20px 0 20px' }}>
                                            Minh bạch thông minh
                                        </Title>
                                        <ul>
                                            <li>
                                                <Paragraph ellipsis={{ rows: 3, expandable: true, symbol: 'more' }} className='TextStyle'>
                                                    Giao dịch thực hiện tức thời và cập nhật giữa các bên liên quan.
                                                </Paragraph>
                                            </li>
                                            <li>
                                                <Paragraph ellipsis={{ rows: 3, expandable: true, symbol: 'more' }} className='TextStyle'>
                                                    Dữ liệu và chứng từ không được phép chỉnh sửa trên nền tảng Blockchain.
                                                </Paragraph>
                                            </li>
                                        </ul>

                                    </Card>
                                </Col>
                                <Col lg={{ span: 5 }}>
                                    <Card style={{ width: '100%', height: '100%', backgroundColor: 'rgb(235, 253, 247)' }} bodyStyle={{ padding: 0, overflow: 'hidden', paddingBottom: 50 }}>
                                        <Image preview={false} className="ImageStyle" src='/images/home/LC/lc-15-20221018175515-sz-5d.png' />
                                        <Title level={4} style={{ padding: '0 20px 0 20px' }}>
                                            Tiết kiệm chi phí
                                        </Title>
                                        <ul>
                                            <li>
                                                <Paragraph ellipsis={{ rows: 3, expandable: true, symbol: 'more' }} className='TextStyle'>
                                                    Chi phí nhân sự Ngân hàng: tiếp nhận L/C, kiểm tra chứng từ, xử lý điện Swift...
                                                </Paragraph>
                                            </li>
                                            <li>
                                                <Paragraph ellipsis={{ rows: 4, expandable: true, symbol: 'more' }} className='TextStyle'>
                                                    Chi phí đầu tư kho lưu trữ chứng từ giấy tại Doanh nghiệp và Ngân hàng, chi phí điện Swift.
                                                </Paragraph>
                                            </li>
                                        </ul>
                                    </Card>
                                </Col>
                                <Col lg={{ span: 5 }}>
                                    <Card style={{ width: '100%', height: '100%', backgroundColor: 'rgb(249, 245, 255)' }} bodyStyle={{ padding: 0, overflow: 'hidden', paddingBottom: 100 }}>
                                        <Image preview={false} className="ImageStyle" src='/images/home/LC/lc-16-20221018175515-daxpe.png' />
                                        <Title level={4} style={{ padding: '0 20px 0 20px' }}>
                                            Giảm rủi ro gian lận
                                        </Title>
                                        <ul>
                                            <li>
                                                <Paragraph ellipsis={{ rows: 6, expandable: true, symbol: 'more' }} className='TextStyle'>
                                                Thông tin khách hàng và chứng từ được kiểm tra và xác thức Phòng chống rửa tiền, tài trợ khủng bố theo quy định của Ngân hàng Nhà nước Việt Nam. 
                                                </Paragraph>
                                            </li>
                                        </ul>
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