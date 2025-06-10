import React from 'react';
import {  Button, Image, Row, Col, Typography } from 'antd';
import { useTransition, animated, config } from '@react-spring/web';
import { Link } from 'react-router-dom';
import useIsMobile from '../../../../hooks/use-is-mobile';
import useAuthStatus from '../../../../hooks/use-is-authenticated';
const { Text, Title } = Typography;

const Introduction = ({ display }: any) => {
    const isMobile = useIsMobile()
    const { isAuthenticated } = useAuthStatus();

    const imageTransition = useTransition(display, {
        from: { x: -50, opacity: 0 },
        enter: { x: 0, opacity: 1 },
        config: config.slow,
        delay: 500
    })

    const textTransition = useTransition(display, {
        from: { x: 50, opacity: 0 },
        enter: { x: 0, opacity: 1 },
        config: config.slow,
        delay: 500
    })

    return (
        <div className='SECTION-IMG' style={{ color: 'white', backgroundImage: "url(" + "https://w.ladicdn.com/s768x700/60b444ceeba2a30012e68735/lc_background-20221018160339-veafe.png" + ")", backgroundSize: 'cover', backgroundOrigin: 'content-box', backgroundPosition: '50% 50%', backgroundRepeat: 'repeat', backgroundAttachment: 'scroll', paddingTop: '3%' }}>
            <Row justify={!isMobile ? 'end' : 'center'} >
                <Col lg={{ span: 11, order: 1 }} md={{ span: 20, order: 2 }} xs={{ span: 20, order: 2 }} style={!isMobile ? { padding: "0 128px"} : { padding: "0"}}>
                    {
                        imageTransition((style, item) => (
                            <animated.div style={style}>
                                <Image preview={false} style={{ margin: '10% 0 20% 0', width: '100%', height: 'auto'}} src="/images/home/Business-health/mo-hinh-etradevn-08-20230704083553-4rrsp-20230924131327-nbc76.png" alt="image" />
                            </animated.div>
                        ))
                    }
                </Col>

                <Col lg={{ span: 10, order: 2 }} md={{ span: 24, order: 1 }} xs={{ span: 22, order: 1 }}>
                    <Row justify={!isMobile ? 'start' : 'center'}>
                        <Col xxl={{span: 11, order: 2}} xl={{span: 11, order: 2}} lg={{ span: 15, order: 2 }} md={{ span: 20, order: 1 }} sm={{span: 24, order: 1}} xs={{ span: 24, order: 1 }} >
                            {
                                textTransition((style, item) => (
                                    <animated.div style={style}>
                                        <Title level={3} style={{ marginTop: '17vh', color: 'white', textAlign: isMobile ? 'center' : 'start' }}>Giám sát sức khỏe tài chính Business Financial Health Monitor</Title>
                                    </animated.div>
                                ))
                            }
                        </Col>
                    </Row>
                    <Row justify={!isMobile ? 'start' : 'center'}>
                        <Col lg={{ span: 12, order: 2 }} md={{ span: 24, order: 1 }} xs={{ span: 24, order: 1 }}>
                            {
                                textTransition((style, item) => (
                                    <animated.div style={style}>
                                        <Text style={{ margin: '2vh 0 3vh ', display: 'block', color: 'rgb(255, 255, 255)', fontWeight: 400, textAlign: isMobile ? 'center' : 'start' }}>Được phát triển bởi FPT cùng các ngân hàng thương mại hàng đầu tại Việt Nam</Text>
                                    </animated.div>
                                ))
                            }
                        </Col>
                    </Row>
                    <Row>
                        <Col lg={{ span: 17, order: 2 }} md={{ span: 24, order: 1 }} xs={{ span: 24, order: 1 }}>
                            {
                                textTransition((style, item) => (
                                    <animated.div style={style}>
                                        {
                                            !isAuthenticated && (
                                                <Link to={'/registration'}>
                                                <Button
                                                  style={{
                                                    backgroundColor: 'rgb(253, 199, 87)',
                                                    width: '25%',
                                                    height: 'auto',
                                                    color: 'black',
                                                    padding: '10px 15px 10px 15px',
                                                    fontWeight: 'bold',
                                                    whiteSpace: 'normal',
                                                    minWidth: '270px',
                                                    display: 'block',
                                                    margin: isMobile ? 'auto' : '0',
                                                  }}
                                                  type="primary">
                                                  Đăng ký tham gia
                                                </Button>
                                              </Link>
                                            )
                                        }
                                    </animated.div>
                                ))
                            }
                        </Col>
                    </Row>
                </Col>
            </Row>
        </div>
    )
}

export default Introduction;