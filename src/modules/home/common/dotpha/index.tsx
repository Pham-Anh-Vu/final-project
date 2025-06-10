import React, { useState, useEffect } from 'react';
import { Input, Button, Image, Row, Col, Card, Flex, Typography, Switch } from 'antd';
import { useTransition, animated, config } from '@react-spring/web';
import useIsMobile from '../../../../hooks/use-is-mobile';

const { Text, Link, Title, Paragraph } = Typography;


function Innovation({ display }: any) {
    const isMobile = useIsMobile();

    const sectionImgStyle: React.CSSProperties = {
        position: 'absolute',
        opacity: 0.8,
        backgroundImage: "url(/images/home/BgUUjAbG20230923102722.jpg)",
        backgroundSize: 'cover',
        backgroundPosition: '50% 0%',
        backgroundRepeat: 'repeat',
        backgroundAttachment: 'fixed',
        width: '100%',
        top: 0,
        left: 0,
        pointerEvents: 'none',
        overflow: 'hidden',
        height: isMobile ? '800px' : '400px', padding: 0
    };

    const sectionLazyStyle: React.CSSProperties = {
        position: 'absolute',
        backgroundColor: 'rgb(6, 29, 125)',
        opacity: 0.5,
        top: 0,
        left: 0,
        width: '100%',
        pointerEvents: 'none',
        height: isMobile ? '800px' : '400px',
    };

    const sectionDivStyle: React.CSSProperties = {
        position: 'relative',
        // mixBlendMode: 'screen',
        willChange: 'transform, opacity',
        backgroundColor: 'rgba(47, 87, 250, 0.3)',
        // borderColor: 'rgb(47, 84, 235)',
        width: '100%',
        height: '180px',
        // width: '100%',
        // height: 'auto',
        // opacity: 0.3,
        borderRadius: '0 80px 0 0',
        alignContent: 'center',
        border: '2px solid rgb(55 100 183)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    };

    const divDescribeStyle: React.CSSProperties = {
        position: 'absolute',
        fontWeight: 700,
        fontSize: '20px',
        color: '#f6a400',
        margin: 0,
        top: '10%',
        left: '10%',
    };

    const divTextStyle: React.CSSProperties = {
        position: 'absolute',
        color: 'white',
        top: '60%',
        left: '10%',
        right: '7%',
    };


    return (
        <div
            style={{
                position: 'relative',
                height: isMobile ? '800px' : '400px',
            }}
        >
            <div style={sectionImgStyle}></div>
            <div style={sectionLazyStyle}></div>
            <div style={{
                margin: !isMobile ? '0 13% 0 13%' : '0 5% 0 5%'
            }}>
                <Row justify={'center'}>
                    <Col lg={{ span: 12 }} md={{ span: 20 }} sm={{ span: 20 }} xs={{ span: 24 }} style={{ marginTop: '2%' ,textAlign: 'center' }}>
                        <Title level={3} style={{ color: 'white', textAlign: 'center' }}>Đột phá trong quy trình giao dịch tài chính số</Title>
                    </Col>
                </Row>

                <Row gutter={[0, 24]} justify={!isMobile ? "space-between" : 'center'} align={'middle'}>
                    <Col xxl={{ span: 7 }} xl={{ span: 7 }} lg={{ span: 8 }} md={{ span: 16 }} sm={{ span: 18 }} xs={{ span: 24 }} style={{ marginTop: '2%', display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%' }}>
                        <div style={sectionDivStyle}>
                            {/* <Text style={divDescribeStyle}>GIẢI NGÂN CÒN</Text>
                            <Text style={{ position: 'absolute', fontWeight: 700, fontSize: 75, color: '#f6a400', margin: 0, top: '17%', left: '8%' }}>2NGÀY</Text>
                            <Text style={divTextStyle}>Rút ngắn thời gian giải ngân của ngân hàng với doanh nghiệp: từ 10-15 ngày xuống còn 2-3 ngày</Text> */}
                            <div style={{width:"80%", height:"70%", display:"flex", alignItems:'center'}}>
                                <img src='/images/home/SCF/tang toc.png' style={{ width: "100%" }} />
                            </div>
                        </div>
                    </Col>
                    <Col xxl={{ span: 7 }} xl={{ span: 7 }} lg={{ span: 8 }} md={{ span: 16 }} sm={{ span: 18 }} xs={{ span: 24 }} style={{ marginTop: '2%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <div style={sectionDivStyle}>
                            {/* <Text style={divDescribeStyle}>CHU KỲ THANH TOÁN CÒN</Text>
                            <Text style={{ position: 'absolute', fontWeight: 700, fontSize: 75, color: '#f6a400', margin: 0, top: '17%', left: '10%' }}>10NGÀY</Text>
                            <Text style={divTextStyle}>Rút ngắn chu kỳ thanh toán của doanh nghiệp với nhà cung ứng: từ 60-180 ngày xuống còn 10-30 ngày</Text> */}
                        <div style={{width:"80%", height:"70%", display:"flex", alignItems:'center'}}>
                                <img src='/images/home/SCF/de dang.png' style={{ width: "100%" }} />
                            </div>
                        </div>
                    </Col>
                    <Col xxl={{ span: 7 }} xl={{ span: 7 }} lg={{ span: 8 }} md={{ span: 16 }} sm={{ span: 18 }} xs={{ span: 24 }} style={{ marginTop: '2%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <div style={sectionDivStyle}>
                            {/* <Text style={divDescribeStyle}>GIẢM</Text>
                            <Text style={{ position: 'absolute', fontWeight: 700, fontSize: 75, color: '#f6a400', margin: 0, top: '17%', left: '8%' }}>90%</Text>
                            <Text style={divTextStyle}>Giảm thiểu rủi ro thanh toán tới 90%</Text> */}
                            <div style={{width:"80%", height:"70%", display:"flex", alignItems:'center'}}>
                                <img src='/images/home/SCF/giam.png' style={{ width: "100%" }} />
                            </div>
                        </div>
                    </Col>
                </Row>

            </div>
        </div>

    );
}

export default Innovation;