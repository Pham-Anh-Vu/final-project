import React from 'react';
import { Button, Image, Row, Col, Typography } from 'antd';
import { useTransition, animated, config } from '@react-spring/web';
import { Link } from 'react-router-dom';
import useIsAuthenticated from './../../../../hooks/use-is-authenticated/index';
import useIsMobile from '../../../../hooks/use-is-mobile';

const { Text, Title } = Typography;

const Introduction = ({ display }: any) => {
  const isAuthenticated = useIsAuthenticated();
  const isMobile = useIsMobile();

  const imageTransition = useTransition(display, {
    from: { x: 50, opacity: 0 },
    enter: { x: 0, opacity: 1 },
    config: config.slow,
    delay: 500,
  });

  const textTransition = useTransition(display, {
    from: { x: -50, opacity: 0 },
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
      <Row style={{ paddingTop: '3%' }} justify={'center'}>
        <Col
          lg={{ span: 13, order: 1 }}
          md={{ span: 20, order: 2 }}
          xs={{ span: 24, order: 2 }}
          style={{ display: 'flex', justifyContent: 'flex-end' }}
        >
          {imageTransition((style, item) => (
            <animated.div style={style}>
              <Image
                preview={false}
                style={{ width: '100%', height: 'auto' }}
                src="/images/home/scf-header_background-left.png"
                alt="image"
              />
            </animated.div>
          ))}
        </Col>

        <Col lg={{ span: 10, order: 2 }} md={{ span: 24, order: 1 }} xs={{ span: 21, order: 1 }}>
          <Row>
            <Col
              lg={{ span: 12, order: 2 }}
              md={{ span: 20, order: 1 }}
              xs={{ span: 24, order: 1 }}
            >
              {textTransition((style, item) => (
                <animated.div style={style}>
                  {/* <Title level={3} style={{ margin: '10vh 0 0 24vw', color: 'white'}}>Tài trợ chuỗi cung ứng Supply Chain Finance</Title> */}
                  <Title
                    level={3}
                    style={{
                      marginTop: '10vh',
                      color: 'white',
                      textAlign: isMobile ? 'center' : 'start',
                    }}
                  >
                    Tài trợ chuỗi cung ứng Supply Chain Finance
                  </Title>
                </animated.div>
              ))}
            </Col>
          </Row>
          <Row>
            <Col
              lg={{ span: 11, order: 2 }}
              md={{ span: 20, order: 1 }}
              xs={{ span: 24, order: 1 }}
            >
              {textTransition((style, item) => (
                <animated.div style={style}>
                  {/* <Text style={{ margin: '2vh 0 0 24vw', display: 'block', color: 'rgb(255, 255, 255)', fontWeight: 400 }}>Nền tảng tài chính số E2E cho các doanh nghiệp và ngân hàng trong chuỗi cung ứng</Text> */}
                  <Text
                    style={{
                      margin: '2vh 0 3vh 0',
                      display: 'block',
                      color: 'rgb(255, 255, 255)',
                      fontWeight: 400,
                      textAlign: isMobile ? 'center' : 'start',
                    }}
                  >
                    Nền tảng tài chính số E2E cho các doanh nghiệp và ngân hàng trong chuỗi cung ứng
                  </Text>
                </animated.div>
              ))}
            </Col>
          </Row>
          <Row>
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
