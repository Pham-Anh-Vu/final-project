import React, { useEffect, useState } from 'react';
import { useTransition, animated, config } from '@react-spring/web';

import Introduction from './header';
import DigitalTransformation from './chuyendoiso';
import PlatformFinance from './nentangtaichinh';
import Service from './service';
import Modal from './mohinh';
import FintechDigitalization from './sohoa';
import Innovation from './dotpha';
import Footer from './footer';
import { ArrowUpOutlined } from "@ant-design/icons"
import { Button } from 'antd';
import useOnScreen from './useOnScreen';

import CopyrightFooter from '../copyrightFooter ';
import useIsMobile from '../../../hooks/use-is-mobile';
import { useAppSelector } from '../../../hooks/hooks';

function HomeLC() {
  const isMobile = useIsMobile();
  const auth = useAppSelector((state) => state.auth);
  

  const [displayIntro, setDisplayIntro] = useState(false);
  const [displayDigitalTransformation, setDisplayDigitalTransformation] = useState(false);
  const [displayPlatformFinance, setDisplayPlatformFinance] = useState(false);
  const [displayService, setdisplayService] = useState(false);
  const [displayModal, setdisplayModal] = useState(false);
  const [displayFintechDigital, setdisplayFintechDigital] = useState(false);
  const [displayMillionsConnections, setdisplayMillionsConnections] = useState(false);
  const [displayTransectionProcess, setdisplayTransectionProcess] = useState(false);
  const [displayEcosystem, setdisplayEcosystem] = useState(false);
  const [displayInnovation, setdisplayInnovation] = useState(false);
  const [displayRegister, setdisplayRegister] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  const [refIntro, isVisibleIntro] = useOnScreen({
    root: null,
    rootMargin: '0px',
    threshold: 0.2,
  });

  const [refDigitalTransformation, isVisibleDigitalTransformation] = useOnScreen({
    root: null,
    rootMargin: '0px',
    threshold: 0.2,
  });

  const [refPlatformFinance, isVisiblePlatformFinance] = useOnScreen({
    root: null,
    rootMargin: '0px',
    threshold: 0.2,
  });

  const [refService, isVisibleService] = useOnScreen({
    root: null,
    rootMargin: '0px',
    threshold: 0.2,
  });

  const [refModal, isVisibleModal] = useOnScreen({
    root: null,
    rootMargin: '0px',
    threshold: 0.2,
  });

  const [refFintechDigital, isVisibleFintechDigital] = useOnScreen({
    root: null,
    rootMargin: '0px',
    threshold: 0.2,
  });

  const [refEcosystem, isVisibleEcosystem] = useOnScreen({
    root: null,
    rootMargin: '0px',
    threshold: 0.2,
  });

  const [refInnovation, isVisibleInnovation] = useOnScreen({
    root: null,
    rootMargin: '0px',
    threshold: 0.2,
  });

  const [refRegister, isVisibleRegister] = useOnScreen({
    root: null,
    rootMargin: '0px',
    threshold: 0.2,
  });


  const transitionIntro = useTransition(displayIntro, {
    from: { opacity: 0 },
    enter: { opacity: 1 },
    delay: 0,
    config: config.slow,
  });

  const transitionDigitalTransformation = useTransition(displayDigitalTransformation, {
    from: { opacity: 0 },
    enter: { opacity: 1 },
    delay: 500,
    config: config.slow,
  });

  const transitionPlatformFinance = useTransition(displayPlatformFinance, {
    from: { opacity: 0 },
    enter: { opacity: 1 },
    delay: 500,
    config: config.slow,
  });

  const transitionService = useTransition(displayService, {
    from: { opacity: 0 },
    enter: { opacity: 1 },
    delay: 500,
    config: config.slow,
  });

  const transitionModal = useTransition(displayModal, {
    from: { opacity: 0 },
    enter: { opacity: 1 },
    delay: 500,
    config: config.slow,
  });
  const transitionFintechDigital = useTransition(displayFintechDigital, {
    from: { opacity: 0 },
    enter: { opacity: 1 },
    delay: 500,
    config: config.slow,
  });
  const transitionInnovation = useTransition(displayInnovation, {
    from: { opacity: 0 },
    enter: { opacity: 1 },
    delay: 500,
    config: config.slow,
  });
  const transitionRegister = useTransition(displayRegister, {
    from: { opacity: 0 },
    enter: { opacity: 1 },
    delay: 500,
    config: config.slow,
  });

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  useEffect(() => {
    window.scrollTo({
      top: 0,
    });
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      if (scrollY > 100) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    if (isVisibleIntro && !displayIntro) {
      setDisplayIntro(true);
    }

    if (isVisibleDigitalTransformation && !displayDigitalTransformation) {
      setDisplayDigitalTransformation(true);
    }

    if (isVisiblePlatformFinance && !displayPlatformFinance) {
      setDisplayPlatformFinance(true);
    }

    if (isVisibleService && !displayService) {
      setdisplayService(true);
    }

    if (isVisibleModal && !displayModal) {
      setdisplayModal(true);
    }

    if (isVisibleFintechDigital && !displayFintechDigital) {
      setdisplayFintechDigital(true);
    }

    if (isVisibleEcosystem && !displayEcosystem) {
      setdisplayEcosystem(true);
    }

    if (isVisibleInnovation && !displayInnovation) {
      setdisplayInnovation(true);
    }

    if (isVisibleRegister && !displayRegister) {
      setdisplayRegister(true);
    }
  }, [isVisibleIntro, isVisibleDigitalTransformation, isVisiblePlatformFinance, isVisibleService, isVisibleModal, isVisibleFintechDigital, isVisibleEcosystem, isVisibleInnovation, isVisibleRegister, displayIntro, displayService, displayMillionsConnections, displayFintechDigital, displayTransectionProcess, displayEcosystem, displayInnovation, displayRegister]);

  return (
    <div>
      {isVisible && (
        <Button type="text" onClick={scrollToTop} style={{ position: 'fixed', bottom: '20px', right: '20px', width:'58px', height:'58px' }}>
          <ArrowUpOutlined />
        </Button>
      )}

      <div style={{ visibility: displayIntro ? 'visible' : 'hidden' }} ref={refIntro}>
        {transitionIntro((style, item) => (
          <animated.div style={style}>
            <Introduction display={displayIntro} />
          </animated.div>
        ))}
      </div>

      <div style={{ visibility: displayDigitalTransformation ? 'visible' : 'hidden' }} ref={refDigitalTransformation}>
        {transitionDigitalTransformation((style, item) => (
          <animated.div style={style}>
            <DigitalTransformation display={displayDigitalTransformation} />
          </animated.div>
        ))}
      </div>

      <div style={{ visibility: displayPlatformFinance ? 'visible' : 'hidden' }} ref={refPlatformFinance}>
        {transitionPlatformFinance((style, item) => (
          <animated.div style={style}>
            <PlatformFinance display={displayPlatformFinance} />
          </animated.div>
        ))}
      </div>

      <div style={{ visibility: displayService ? 'visible' : 'hidden' }} ref={refService}>
        {transitionService((style, item) => (
          <animated.div style={style}>
            <Service display={displayService} />
          </animated.div>
        ))}
      </div>

      <div style={{ visibility: displayModal ? 'visible' : 'hidden' }} ref={refModal}>
        {transitionModal((style, item) => (
          <animated.div style={style}>
            <Modal display={displayModal} />
          </animated.div>
        ))}
      </div>

      <div style={{ visibility: displayFintechDigital ? 'visible' : 'hidden' }} ref={refFintechDigital}>
        {transitionFintechDigital((style, item) => (
          <animated.div style={style}>
            <FintechDigitalization display={displayFintechDigital} />
          </animated.div>
        ))}
      </div>

      <div style={{ visibility: displayInnovation ? 'visible' : 'hidden' }} ref={refInnovation}>
        {transitionInnovation((style, item) => (
          <animated.div style={style}>
            <Innovation display={displayInnovation} />
          </animated.div>
        ))}
      </div>
      <Footer />
      <CopyrightFooter />
      {/* <Snow /> */}
    </div>
  );
}

export default HomeLC;
