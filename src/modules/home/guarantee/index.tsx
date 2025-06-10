import React, { useEffect, useState } from "react";
import { useTransition, animated, config } from "@react-spring/web";

import Connection from "./giaodich";
import Introduction from "./header";
import Guaranteed from "./duocbaolanh";
import HaveGuaranteed from "./nhanbaolanh";
import Innovation from "./dotpha";
import Footer from "./footer";
import { ArrowUpOutlined } from "@ant-design/icons"
import { Button } from 'antd';
import useOnScreen from "./useOnScreen";

import CopyrightFooter from "../copyrightFooter ";
import useAuthStatus from "../../../hooks/use-is-authenticated";
import useIsMobile from "../../../hooks/use-is-mobile";

function HomeGuarantee() {
  const isAuthenticated = useAuthStatus();
  const isMobile = useIsMobile();

  const [displayIntro, setDisplayIntro] = useState(false);
  const [displayBlockchain, setdisplayBlockchain] = useState(false);
  const [displayGuaranteed, setdisplayGuaranteed] = useState(false);
  const [displayHaveGuaranteed, setdisplayHaveGuaranteed] = useState(false);
  const [displayInnovation, setdisplayInnovation] = useState(false);
  const [displayRegister, setdisplayRegister] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  const [refIntro, isVisibleIntro] = useOnScreen({
    root: null,
    rootMargin: "0px",
    threshold: 0.2,
  });

  const [refBlockchain, isVisibleBlockchain] = useOnScreen({
    root: null,
    rootMargin: "0px",
    threshold: 0.2,
  });


  const [refGuaranteed, isVisibleGuaranteed] = useOnScreen({
    root: null,
    rootMargin: "0px",
    threshold: 0.2,
  });

  const [refHaveGuaranteed, isVisibleHaveGuaranteed] = useOnScreen({
    root: null,
    rootMargin: "0px",
    threshold: 0.2,
  });

  const [refInnovation, isVisibleInnovation] = useOnScreen({
    root: null,
    rootMargin: "0px",
    threshold: 0.2,
  });

  const [refRegister, isVisibleRegister] = useOnScreen({
    root: null,
    rootMargin: "0px",
    threshold: 0.2,
  });


  const transitionIntro = useTransition(displayIntro, {
    from: { opacity: 0 },
    enter: { opacity: 1 },
    delay: 0,
    config: config.slow,
  });

  const transitionBlockchain = useTransition(displayBlockchain, {
    from: { opacity: 0 },
    enter: { opacity: 1 },
    delay: 500,
    config: config.slow,
  });

  const transitionGuaranteed = useTransition(
    displayGuaranteed,
    {
      from: { opacity: 0 },
      enter: { opacity: 1 },
      delay: 500,
      config: config.slow,
    }
  );

  const transitionHaveGuaranteed = useTransition(
    displayHaveGuaranteed,
    {
      from: { opacity: 0 },
      enter: { opacity: 1 },
      delay: 500,
      config: config.slow,
    }
  );

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

    if (isVisibleBlockchain && !displayBlockchain) {
      setdisplayBlockchain(true);
    }


    if (isVisibleGuaranteed && !displayGuaranteed) {
      setdisplayGuaranteed(true);
    }

    if (isVisibleHaveGuaranteed && !displayHaveGuaranteed) {
      setdisplayHaveGuaranteed(true);
    }

    if (isVisibleInnovation && !displayInnovation) {
      setdisplayInnovation(true);
    }

    if (isVisibleRegister && !displayRegister) {
      setdisplayRegister(true);
    }

  }, [isVisibleIntro, isVisibleBlockchain, isVisibleGuaranteed, isVisibleHaveGuaranteed, isVisibleInnovation, isVisibleRegister, displayIntro, displayBlockchain, displayGuaranteed, displayHaveGuaranteed, displayInnovation, displayRegister]);

  return (
    <div>
      {isVisible && (
        <Button type="text" onClick={scrollToTop} style={{ position: 'fixed', bottom: '20px', right: '20px', width:'58px', height:'58px' }}>
          <ArrowUpOutlined />
        </Button>
      )}

      <div
        style={{ visibility: displayIntro ? "visible" : "hidden" }}
        ref={refIntro}
      >
        {transitionIntro((style, item) => (
          <animated.div style={style}>
            <Introduction display={displayIntro} />
          </animated.div>
        ))}
      </div>

      <div
        style={{ visibility: displayBlockchain ? "visible" : "hidden" }}
        ref={refBlockchain}
      >
        {transitionBlockchain((style, item) => (
          <animated.div style={style}>
            <Connection display={displayBlockchain} />
          </animated.div>
        ))}
      </div>

      <div
        style={{ visibility: displayGuaranteed ? "visible" : "hidden" }}
        ref={refGuaranteed}
      >
        {transitionGuaranteed((style, item) => (
          <animated.div style={style}>
            <Guaranteed display={displayGuaranteed} />
          </animated.div>
        ))}
      </div>

      <div
        style={{ visibility: displayHaveGuaranteed ? "visible" : "hidden" }}
        ref={refHaveGuaranteed}
      >
        {transitionHaveGuaranteed((style, item) => (
          <animated.div style={style}>
            <HaveGuaranteed display={displayHaveGuaranteed} />
          </animated.div>
        ))}
      </div>

      <div
        style={{ visibility: displayInnovation ? "visible" : "hidden" }}
        ref={refInnovation}
      >
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

export default HomeGuarantee;
