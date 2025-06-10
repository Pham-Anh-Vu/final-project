import React from 'react';
import {  Button, Image, Row, Col, Typography } from 'antd';
import { useTransition, animated, config } from '@react-spring/web';
import { Link } from 'react-router-dom';
import useAuthStatus from '../../../../hooks/use-is-authenticated';
import useIsMobile from '../../../../hooks/use-is-mobile';

const { Text, Title } = Typography;

const Introduction = ({ display }: any) => {
  const { isAuthenticated } = useAuthStatus();
  const isMobile = useIsMobile();

  const imageTransition = useTransition(display, {
    from: { x: -50, opacity: 0 },
    enter: { x: 0, opacity: 1 },
    config: config.slow,
    delay: 500,
  });

  const textTransition = useTransition(display, {
    from: { x: 50, opacity: 0 },
    enter: { x: 0, opacity: 1 },
    config: config.slow,
    delay: 500,
  });

  return (
    <div
      className="SECTION-IMG"
      style={{
        color: 'white',
        backgroundImage:
          'url(' +
          '/images/home/header_background.png' +
          ')',
        backgroundSize: 'cover',
        backgroundOrigin: 'content-box',
        backgroundPosition: '50% 50%',
        backgroundRepeat: 'repeat',
        backgroundAttachment: 'scroll',
        paddingTop: '3%',
      }}
    >
      {/* gutter={{ xs: 0, lg: 128 }} */}
      <Row justify={isMobile ? 'center' : 'end'} >
        <Col
          lg={{ span: 12, order: 1 }}
          md={{ span: 16, order: 2 }}
          xs={{ span: 22, order: 2 }}
          style={{ display: 'flex', justifyContent: 'flex-end', padding: "0 64px" }}
        >
          {imageTransition((style, item) => (
            <animated.div style={style}>
              <Image
                preview={false}
                style={{
                  margin: '13vh 0 12vh 0',
                  width: '100%',
                  height: 'auto',
                }}
                src="/images/home/Overview/lc-dashboard-20221019003037-3rt1s.png"
                alt="image"
              />
            </animated.div>
          ))}
        </Col>

        <Col lg={{ span: 10, order: 2 }} md={{ span: 24, order: 1 }} xs={{ span: 22, order: 1 }}>
          <Row justify={!isMobile ? 'start' : 'center'}>
            <Col lg={{ span: 12, order: 2 }} md={{ span: 20, order: 1 }} xs={{ span: 24, order: 1 }}>
              {textTransition((style, item) => (
                <animated.div style={style}>
                  <Title
                    level={3}
                    style={{
                      marginTop: '17vh',
                      color: 'white',
                      textAlign: isMobile ? 'center' : 'start',
                    }}
                  >
                    Hệ sinh thái tài chính số đầu tiên tại Việt Nam
                  </Title>
                </animated.div>
              ))}
            </Col>
          </Row>
          <Row justify={!isMobile ? 'start' : 'center'}>
            <Col
              lg={{ span: 12, order: 2 }}
              md={{ span: 20, order: 1 }}
              xs={{ span: 24, order: 1 }}
            >
              {textTransition((style, item) => (
                <animated.div style={style}>
                  <Text
                    style={{
                      margin: '2vh 0 3vh 0',
                      display: 'block',
                      color: 'rgb(255, 255, 255)',
                      fontWeight: 400,
                      textAlign: isMobile ? 'center' : 'start',
                    }}
                  >
                    Được phát triển bởi FPT cùng các ngân hàng thương mại hàng đầu tại Việt Nam
                  </Text>
                </animated.div>
              ))}
            </Col>
          </Row>
          <Row justify={!isMobile ? 'start' : 'center'}>
            <Col
              lg={{ span: 17, order: 2 }}
              md={{ span: 24, order: 1 }}
              xs={{ span: 24, order: 1 }}
            >
              {textTransition((style, item) => (
                <animated.div style={style}>
                  {!isAuthenticated && (


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
                  )}
                </animated.div>
              ))}
            </Col>
          </Row>
        </Col>
      </Row>
    </div>
  );
};

export default Introduction;
