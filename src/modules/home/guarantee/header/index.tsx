import React from 'react';
import { Button, Image, Row, Col, Typography } from 'antd';
import { useTransition, animated, config } from '@react-spring/web';
import { Link } from 'react-router-dom';
import useIsMobile from '../../../../hooks/use-is-mobile';
import { useAppDispatch, useAppSelector } from '../../../../hooks/hooks';

const { Text, Title } = Typography;

const Introduction = ({ display }: any) => {
  const auth = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();

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
      <Row justify={isMobile ? 'center' : 'end'}>
        <Col
          lg={{ span: 11, order: 1 }}
          md={{ span: 16, order: 2 }}
          xs={{ span: 22, order: 2 }}
          style={!isMobile ? { display: 'flex', justifyContent: 'flex-end', padding: "0 128px"} : { display: 'flex', justifyContent: 'flex-end', padding: "0 "}}
        >
          {imageTransition((style, item) => (
            <animated.div style={style}>
              <Image
                preview={false}
                style={{
                  margin: '10vh 0 12vh 0',
                  width: '100%',
                  height: 'auto',
                  borderRadius: '0 70px 0 0',
                }}
                src={require('./image/eg-20230924101824-juytd.png')}
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
                    Bảo lãnh điện tử (e-Guarantee)
                  </Title>
                </animated.div>
              ))}
            </Col>
          </Row>
          <Row justify={!isMobile ? 'start' : 'center'}>
            <Col
              lg={{ span: 11, order: 2 }}
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
                    Chuyển đổi số ưu việt hỗ trợ bảo lãnh điện tử, thúc đẩy tài chính số
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
                  {!auth.isAuthenticated && (
                   <Link to={'/sign-up'}>
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
