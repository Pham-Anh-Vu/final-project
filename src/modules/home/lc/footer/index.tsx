import React, { useState } from 'react';
import { Input, Button, Image, Row, Col, Card, Flex, Typography, Switch } from 'antd';
import { useTransition, animated, config } from '@react-spring/web';
import './index.css';
import useIsMobile from '../../../../hooks/use-is-mobile';

const { Text, Link, Title, Paragraph } = Typography;
function Footer() {
  const isMobile = useIsMobile();

  const handlePhoneCall = () => {
    window.location.href = 'tel:' + "0966.181.681";
  };

  return (
    <div className="SECTION" style={{ backgroundColor: 'rgb(47, 84, 235)', color: 'white' }}>
      <Row align="middle" justify="center">
        <Col lg={{ span: 5 }}>
          <Image
            preview={false}
            style={{ width: '20vw', height: 'auto', minWidth: 250, lineHeight: 0, marginTop: 20 }}
            src="/images/438299679_427175523590935_7487093897609657956_n.png"
          />
        </Col>
      </Row>
      <Row gutter={[0, 16]} align="middle" justify={'center'} style={{marginBottom:10}}>
        <Col lg={{ span: 10 }} md={{ span: 14 }} sm={{ span: 16 }} xs={{ span: 24 }} style={{textAlign:'center'}}>
          <Text
            style={{ color: 'white', textAlign: 'center', marginTop: 0, fontWeight: 400 }}
          >
            Hệ sinh thái tài chính số đầu tiên tại Việt Nam
          </Text>
        </Col>
      </Row>
      <Row justify={'center'}>
        <Col
          lg={{ span: 16 }}
          md={{ span: 20 }}
          sm={{ span: 20 }}
          xs={{ span: 22 }}
          style={{ borderBottom: '1px solid rgb(255, 255, 255, 0.3)' }}
        ></Col>
      </Row>
      <Row
        justify={isMobile ? 'start' : 'space-evenly'}
        style={{ marginTop: '2%' }}
        gutter={[0, 20]}
      >
        <Col
          lg={{ span: 6, offset: 3 }}
          md={{ span: 12, offset: 1 }}
          sm={{ span: 18, offset: 1 }}
          xs={{ span: 22, offset: 1 }}
        >
          <Text style={{ display: 'block', color: 'rgb(255, 255, 255)', fontWeight: 400 }}>
            Trụ sở chính
          </Text>
          <Text style={{ display: 'block', color: 'rgb(255, 255, 255)', fontWeight: 400 }}>
            Số 10 phố Phạm Văn Bạch, Phường Dịch Vọng, Quận Cầu Giấy, Thành phố Hà Nội, Việt Nam
          </Text>
        </Col>
        <Col
          lg={{ span: 4, offset: 0 }}
          md={{ span: 13, offset: 1 }}
          sm={{ span: 18, offset: 1 }}
          xs={{ span: 22, offset: 1 }}
        >
          <Text style={{ display: 'block', color: 'rgb(255, 255, 255)', fontWeight: 400 }}>
            Liên hệ
          </Text>
          <Text style={{ display: 'block', color: 'rgb(255, 255, 255)', fontWeight: 400 }}>
            Email: FIS.Bank.TradeFlat@fpt.com
          </Text>
          <Button onClick={handlePhoneCall} style={{ backgroundColor: '#2F54EB', border: '0px', padding: 0, borderBlockColor: '#2F54EB' }}>
            <Text style={{ display: 'block', color: 'rgb(255, 255, 255)', fontWeight: 400 }}>Hotline: 0966.181.681</Text>
          </Button>
        </Col>
        <Col
          lg={{ span: 6, offset: 0 }}
          md={{ span: 13, offset: 1 }}
          sm={{ span: 18, offset: 1 }}
          xs={{ span: 22, offset: 1 }}
        >
          <Text style={{ display: 'block', color: 'rgb(255, 255, 255)', fontWeight: 400 }}>
            Được phát triển bởi
          </Text>
          <Image preview={false} style={{ width: 100,margin:10, height: 'auto' }} src='/images/logoFPTIS2.png' />

        </Col>
      </Row>
    </div>
  );
}

export default Footer;
