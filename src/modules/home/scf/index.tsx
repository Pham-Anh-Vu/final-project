import React, { useEffect, useState } from "react";
import { useTransition, animated, config } from "@react-spring/web";

import Connection from "./ketnoi";
import Introduction from "./header";
import MillionsConnections from "./motnentang";
import SponsorshipModel from "./mohinh";
import PlatformFinance from "./nentangtaichinh";
import Innovation from "./dotpha";
import Footer from "./footer";
import Instruct from './huongdan';
import { ArrowUpOutlined } from "@ant-design/icons"
import { Button } from 'antd';
import useOnScreen from "./useOnScreen";

import CopyrightFooter from "../copyrightFooter ";
import useAuthStatus from "../../../hooks/use-is-authenticated";
import useIsMobile from "../../../hooks/use-is-mobile";

function HomeSCF() {
  const isMobile = useIsMobile()
  const { isAuthenticated, token, keycloak } = useAuthStatus();

  const [displayIntro, setDisplayIntro] = useState(false);
  const [displayBlockchain, setdisplayBlockchain] = useState(false);
  const [displayMillionsConnections, setdisplayMillionsConnections] =
    useState(false);
  const [displayFintechDigital, setdisplayFintechDigital] = useState(false);
  const [displayTransectionProcess, setdisplayTransectionProcess] =
    useState(false);
  const [displayEcosystem, setdisplayEcosystem] = useState(false);
  const [displayInnovation, setdisplayInnovation] = useState(false);
  const [displayRegister, setdisplayRegister] = useState(false);
  const [displayInstruct, setdisplayInstruct] = useState(false);
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

  const [refMillionsConnections, isVisibleMillionsConnections] = useOnScreen({
    root: null,
    rootMargin: "0px",
    threshold: 0.2,
  });

  const [refTransactionProcess, isVisibleTransactionProcess] = useOnScreen({
    root: null,
    rootMargin: "0px",
    threshold: 0.2,
  });

  const [refEcosystem, isVisibleEcosystem] = useOnScreen({
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

  const [refInstruct, isVisibleInstruct] = useOnScreen({
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

  const transitionMillionsConnections = useTransition(
    displayMillionsConnections,
    {
      from: { opacity: 0 },
      enter: { opacity: 1 },
      delay: 500,
      config: config.slow,
    }
  );
  const transitionTransectionProcess = useTransition(
    displayTransectionProcess,
    {
      from: { opacity: 0 },
      enter: { opacity: 1 },
      delay: 500,
      config: config.slow,
    }
  );
  const transitionEcosystem = useTransition(displayEcosystem, {
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
  const transitionInstruct = useTransition(displayInstruct, {
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

    if (isVisibleMillionsConnections && !displayMillionsConnections) {
      setdisplayMillionsConnections(true);
    }


    if (isVisibleTransactionProcess && !displayTransectionProcess) {
      setdisplayTransectionProcess(true);
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

    if (isVisibleInstruct && !displayInstruct) {
      setdisplayInstruct(true);
    }
  }, [
    isVisibleIntro,
    isVisibleBlockchain,
    isVisibleMillionsConnections,
    isVisibleTransactionProcess,
    isVisibleEcosystem,
    isVisibleInnovation,
    isVisibleRegister,
    isVisibleInstruct
  ]);

  return (
    <div>
      {isVisible && (
        <Button type="text" onClick={scrollToTop} style={{ position: 'fixed', bottom: '20px', right: '20px', width: '58px', height: '58px' }}>
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
        style={{
          visibility: displayMillionsConnections ? "visible" : "hidden",
        }}
        ref={refMillionsConnections}
      >
        {transitionMillionsConnections((style, item) => (
          <animated.div style={style}>
            <MillionsConnections display={displayMillionsConnections} />
          </animated.div>
        ))}
      </div>

      <div
        style={{ visibility: displayEcosystem ? "visible" : "hidden" }}
        ref={refEcosystem}
      >
        {transitionEcosystem((style, item) => (
          <animated.div style={style}>
            <PlatformFinance display={displayEcosystem} />
          </animated.div>
        ))}
      </div>

      <div
        style={{ visibility: displayTransectionProcess ? "visible" : "hidden" }}
        ref={refTransactionProcess}
      >
        {transitionTransectionProcess((style, item) => (
          <animated.div style={style}>
            <SponsorshipModel display={displayTransectionProcess} />
          </animated.div>
        ))}
      </div>

      {/* <div
        style={{ visibility: displayInstruct ? "visible" : "hidden" }}
        ref={refInstruct}
      >
        {transitionInstruct((style, item) => (
          <animated.div style={style}>
            <Instruct display={displayInstruct} />
          </animated.div>
        ))}
      </div> */}

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

export default HomeSCF;
