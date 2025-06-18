import React, { useEffect, useState } from 'react';
import { useTransition, animated, config } from '@react-spring/web';

import Introduction from './header';
import Platform from './nentang';
import Report from './baocao';
import Modal from './mohinh';
import FinancialHealth from './fh';
import Innovation from './dotpha';
import Footer from './footer';
import { ArrowUpOutlined } from "@ant-design/icons"
import { Button } from 'antd';
import useOnScreen from './useOnScreen';

import CopyrightFooter from '../copyrightFooter ';
import useIsMobile from '../../../hooks/use-is-mobile';

function HomeBusinessHealth() {
  const isMobile = useIsMobile()

  const [displayIntro, setDisplayIntro] = useState(false);
  const [displayPlatform, setDisplayPlatform] = useState(false);
  const [displayReport, setDisplayReport] = useState(false);
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

  const [refPlatform, isVisiblePlatform] = useOnScreen({
    root: null,
    rootMargin: '0px',
    threshold: 0.2,
  });

  const [refReport, isVisibleReport] = useOnScreen({
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

  const transitionPlatform = useTransition(displayPlatform, {
    from: { opacity: 0 },
    enter: { opacity: 1 },
    delay: 500,
    config: config.slow,
  });

  const transitionReport = useTransition(displayReport, {
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
    window.scrollTo({
      top: 0,
    });
  }, []);

  useEffect(() => {
    if (isVisibleIntro && !displayIntro) {
      setDisplayIntro(true);
    }

    if (isVisiblePlatform && !displayPlatform) {
      setDisplayPlatform(true);
    }

    if (isVisibleReport && !displayReport) {
      setDisplayReport(true);
    }

    if (isVisibleModal && !displayModal) {
      setdisplayModal(true);
    }

    if (isVisibleFintechDigital && !displayFintechDigital) {
      setdisplayFintechDigital(true);
    }

    if (isVisibleInnovation && !displayInnovation) {
      setdisplayInnovation(true);
    }

    if (isVisibleRegister && !displayRegister) {
      setdisplayRegister(true);
    }
  }, [isVisibleIntro, isVisiblePlatform, isVisibleReport, isVisibleModal, isVisibleFintechDigital, isVisibleInnovation, isVisibleRegister, displayIntro, displayMillionsConnections, displayFintechDigital, displayTransectionProcess, displayEcosystem, displayInnovation, displayRegister, displayPlatform, displayModal, displayReport]);

  return (
    <div>
      {isVisible && (
        <Button type="text" onClick={scrollToTop} style={{ position: 'fixed', bottom: '20px', right: '20px', width: '58px', height: '58px' }}>
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

      <div style={{ visibility: displayPlatform ? 'visible' : 'hidden' }} ref={refPlatform}>
        {transitionPlatform((style, item) => (
          <animated.div style={style}>
            <Platform display={displayPlatform} />
          </animated.div>
        ))}
      </div>

      <div style={{ visibility: displayReport ? 'visible' : 'hidden' }} ref={refReport}>
        {transitionReport((style, item) => (
          <animated.div style={style}>
            <Report display={displayReport} />
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
            <FinancialHealth display={displayFintechDigital} />
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
      {/* <Snow/> */}
    </div>
  );
}

export default HomeBusinessHealth;
