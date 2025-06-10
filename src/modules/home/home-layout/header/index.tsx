import React, { useState, useEffect } from 'react';
import { Layout, Space, Menu, Image, Button, Drawer, Avatar, Typography } from 'antd';
import { MenuOutlined, SettingOutlined, UserOutlined, CloseOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import './index.css';
import useAuthStatus from '../../../../hooks/use-is-authenticated';
import SignIn from './../../../main-view/pages/SignIn';

const { Header, Footer, Sider, Content } = Layout;


export interface IHeaderProps {
    isAuthenticated: boolean;
    currentLocale: string;
}

const { Text, Paragraph } = Typography

export default function HeaderHome() {
    const scrollDirection = useScrollDirection();

    const { isAuthenticated, keycloak } = useAuthStatus();

    const headerItem = [
        {
            path: '/home/common',
            name: "Tổng quan",
        },
        {
            path: '/home/scf',
            name: "Tài trợ chuỗi cung ứng",
        },
        {
            path: '/home/guarantee',
            name: "Bảo lãnh điện tử",
        },
        {
            path: '/home/lc',
            name: "Thư tín dụng chứng từ",
        },
        {
            path: '/home/business-health',
            name: "Giám sát sức khỏe doanh nghiệp",
        },
    ];

    const [openMenu, setOpenMenu] = useState(false);
   

    // useEffect(() => {
    //     const handleResize = () => {
    //         const windowWidth = window.innerWidth;
    //         if (windowWidth >= 1450) {
    //             setOpenMenu(false);
    //         }
    //     };
    //     window.addEventListener('resize', handleResize);
    //     handleResize();
    //     return () => {
    //         window.removeEventListener('resize', handleResize);
    //     };
    // }, []);

    const handleChangeOpen = () => {
        setOpenMenu(false);
    };


    return (
        <div style={{ width: '100%' }}>
          <Header
                // className={`headerMaxWidth header ${scrollDirection === 'down' ? 'hide' : 'show'}`}
                // className={`header `}
                id='headerMaxWidth'
                style={{ padding: 0, position: 'fixed', zIndex: 99, width: '100%', backgroundColor: 'rgb(47, 87, 250)', display: 'flex', justifyContent: 'center' }}
            >
                <div style={{ display: 'flex', justifyContent: 'space-between', width: '75vw' }}>
                    <div className='imageHeader'>
                        <Link key={'logo'} to={'/home/common'}>
                            <span>
                                <Image
                                    width={150}
                                    preview={false}
                                    src="/images/logoHeader.png"
                                />
                            </span>
                        </Link>
                    </div>
                    <div style={{ width: '65vw' }}>
                            <Menu
                                mode="horizontal"
                                defaultSelectedKeys={['logo']}
                                className='headerMenuItemMaxWidth'
                            >
                                {headerItem.map((item, index) => {
                                    return (
                                        <Menu.Item key={item.path}
                                            className='gridMenuItem'
                                        >
                                            <Link key={item.path} to={item.path}>
                                                <div
                                                    className="headerMenuItem"
                                                    style={{width : item.name ==="Bảo lãnh điện tử" ? "100px" : "110px"}}
                                                >
                                                    {item.name}
                                                </div>
                                            </Link>
                                        </Menu.Item>
                                    );
                                })}
                            </Menu>
                        </div>
                    <div className='customMenu' style={{ display: 'flex', justifyContent: 'end', alignItems: 'center' }}>
                        {!isAuthenticated && (
                            <Button key="signin"
                                onClick={() => keycloak?.login()}
                                style={{
                                    backgroundColor: '#FDC757',
                                    color: 'black',
                                    fontWeight: 'bold',
                                    whiteSpace: 'normal',
                                    // display: 'flex',
                                    // alignItems:'center',
                                    fontSize: '0.9em',
                                    width: '140px',
                                    height: '40px',
                                    padding: '0 20px 0 20px',
                                    textAlign: 'center'

                                }}>
                                <span
                                >
                                    Login
                                </span>
                            </Button>
                        )}

                    </div>

                </div>
            </Header>
        </div>
    );
}

// scroll direction hook

function useScrollDirection() {
    const [scrollDirection, setScrollDirection] = React.useState<any>(null);

    React.useEffect(() => {
        let lastScrollY = window.scrollY;
        const updateScrollDirection = () => {
            const scrollY = window.scrollY;
            const direction = scrollY > lastScrollY ? 'down' : 'up';
            if (
                direction !== scrollDirection &&
                (scrollY - lastScrollY > 5 || scrollY - lastScrollY < -5)
            ) {
                setScrollDirection(direction);
            }
            lastScrollY = scrollY > 0 ? scrollY : 0;
        };
        window.addEventListener('scroll', updateScrollDirection); // add event listener
        return () => {
            window.removeEventListener('scroll', updateScrollDirection); // clean up
        };
    }, [scrollDirection]);

    return scrollDirection;
}
