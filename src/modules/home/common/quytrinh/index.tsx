import React from 'react';
import { Input, Button, Image, Row, Col, Card, Flex, Typography, Carousel } from 'antd';
import './index.css';
import { useTransition, animated, config } from '@react-spring/web';

const { Text, Link, Title } = Typography;

interface Slide {
    id: number;
    content: string;
}

interface SliderProps {
    slides: Slide[];
}

interface SliderArrowProps {
    className?: string;
    style?: React.CSSProperties;
    onClick?: React.MouseEventHandler<HTMLDivElement>;
}

const SampleNextArrow: React.FC<SliderArrowProps> = props => {
    const { className, style, onClick } = props;
    return (
        <div
            className={className}
            style={{
                ...style,
                // marginTop:'-30px',
                // padding:'20px 20px 0 20px',
                // display: 'block',
                fontSize: '25px',
                // backgroundColor: 'rgb(165, 204, 231)',
                // borderRadius: '40px',
                color: "black",
            }}
            onClick={onClick}
        >
            {/* <RightOutlined /> */}
        </div>
    );
};

const SamplePrevArrow: React.FC<SliderArrowProps> = props => {
    const { className, style, onClick } = props;
    return (
        <div
            className={className}
            style={{
                ...style,
                // marginTop:'-30px',
                // padding:'20px 20px 0 20px',
                // display: 'block',
                fontSize: '25px',
                // backgroundColor: 'rgb(165, 204, 231)',
                // borderRadius: '40px',
                color: "black"
            }}
            onClick={onClick}
        >
        </div>
    );
};


function TransactionProcess({ display, isMobile }: any) {
    const sectionTransition = useTransition(display, {
        from: { y: -50, opacity: 0 },
        enter: { y: 0, opacity: 1 },
        config: config.slow,
        delay: 500,
        style: { display: 'flex', justifyContent: 'center' },
    });

    const slides = [
        {
            id: 1,
            image:
                '/images/home/Overview/nh-20230930144855-spevq.png',
        },
        {
            id: 2,
            image:
                '/images/home/Overview/dn-20230930144855-senaf.png',
        },
    ];

    const contentStyle: React.CSSProperties = {
        width: '100%',
    };

    return (
        <div
            className="SECTION5"
            style={{
                // display: 'flex',
                // flexDirection: 'column',
                // alignItems: 'center',
                margin: !isMobile ? '3% 10% 0 10%' : '3% 5% 0 5%',
            }}
        >
            <Row justify={'center'}>
                {sectionTransition((style, item) => (
                    <animated.div style={style}>
                        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                            <Col>
                                <Title level={3} style={{
                                    textAlign: 'center',
                                    marginBottom:35
                                }}>
                                    Quy trình giao dịch khép kín trên một nền tảng thống nhất
                                </Title>
                            </Col>
                        </div>

                        <Col
                            lg={{ span: 24, offset: 0 }}
                            md={{ span: 24, offset: 0 }}
                            sm={{ span: 24, offset: 0 }}
                            xs={{ span: 24, offset: 0 }}
                            // style={{ display: 'block', margin: 'auto' }}
                            style={{ width: '100%' }}
                        >

                            {
                                isMobile && <img
                                    style={{ width: '100%' }}
                                    src="/images/home/Overview/dn-20230930144855-senaf.png"
                                />
                            }
                            {
                                !isMobile && <Carousel
                                    swipeToSlide={true}
                                    infinite={true}
                                    speed={500}
                                    slidesToShow={1}
                                    slidesToScroll={1}
                                    arrows
                                    nextArrow={<SampleNextArrow />}
                                    prevArrow={<SamplePrevArrow />}
                                    initialSlide={0}
                                    // responsive={[
                                    //     {
                                    //         breakpoint: 1760,
                                    //         settings: {
                                    //             slidesToShow: 3,
                                    //             slidesToScroll: 1,
                                    //             infinite: true,
                                    //         },
                                    //     },
                                    //     {
                                    //         breakpoint: 1300,
                                    //         settings: {
                                    //             slidesToShow: 2,
                                    //             slidesToScroll: 1,
                                    //             infinite: true,
                                    //         },
                                    //     },
                                    //     {
                                    //         breakpoint: 875,
                                    //         settings: {
                                    //             slidesToShow: 1,
                                    //             slidesToScroll: 1,
                                    //             infinite: true,
                                    //         },
                                    //     },
                                    // ]}
                                    style={{ width: '60vw', height: '100%', margin: 'auto' }}
                                >
                                    {slides.map(item => (
                                        <div key={item.id}>
                                            <img
                                                src={item.image}
                                                style={{ display: 'block', margin: 'auto' }}
                                                alt=""
                                            />
                                        </div>
                                    ))}
                                </Carousel>
                            }
                        </Col>
                    </animated.div>
                ))}
            </Row>
        </div>
    );
}

export default TransactionProcess;
