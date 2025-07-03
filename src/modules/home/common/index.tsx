import React, { useEffect, useState } from "react";
import { useTransition, animated, config } from "@react-spring/web";

import BlockchainFunding from "./service";
import Introduction from "./header";
import MillionsConnections from "./motnentang";
import FintechDigitalization from "./sohoa";
import TransectionProcess from "./quytrinh";
import Ecosystem from "./hesinhthai";
import Innovation from "./dotpha";
import Footer from "./footer";
import { ArrowUpOutlined } from "@ant-design/icons";
import { Button, notification } from "antd";
import useOnScreen from "./useOnScreen";
import Challenge from "./thachthuc";
import CopyrightFooter from "../copyrightFooter ";
import useIsMobile from "../../../hooks/use-is-mobile";
import { useAppSelector } from "../../../hooks/hooks";


function HomeCommon() {
  const isMobile = useIsMobile();

  const [displayIntro, setDisplayIntro] = useState(false);
  const [displayBlockchain, setDisplayBlockchain] = useState(false);
  const [displayMillionsConnections, setDisplayMillionsConnections] =
    useState(false);
  const [displayFintechDigital, setDisplayFintechDigital] = useState(false);
  const [displayTransectionProcess, setDisplayTransectionProcess] =
    useState(false);
  const [displayEcosystem, setDisplayEcosystem] = useState(false);
  const [displayInnovation, setDisplayInnovation] = useState(false);
  const [displayRegister, setDisplayRegister] = useState(false);
  const [displayNews, setDisplayNews] = useState(false);
  const [displayChallenge, setDisplayChallenge] = useState(false);

  const auth = useAppSelector((state) => state.auth);
  
  useEffect(() => {
    console.log("auth", localStorage.getItem("access_token"));
    console.log("auth", auth.accessToken);
  }, [auth]);

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

  const [refChallenge, isVisibleChallenge] = useOnScreen({
    root: null,
    rootMargin: "0px",
    threshold: 0.2,
  });

  const [refFintechDigital, isVisibleFintechDigital] = useOnScreen({
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

  const [refNews, isVisibleNews] = useOnScreen({
    root: null,
    rootMargin: "0px",
    threshold: 0.2,
  });

  const transitionIntro = useTransition(displayIntro, {
    from: { opacity: 0 },
    enter: { opacity: 1 },
    config: config.slow,
  });

  const transitionBlockchain = useTransition(displayBlockchain, {
    from: { opacity: 0 },
    enter: { opacity: 1 },
    delay: 500,
    config: config.slow,
  });

  const transitionChallenge = useTransition(displayChallenge, {
    from: { opacity: 0 },
    enter: { opacity: 1 },
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
  const transitionFintechDigital = useTransition(displayFintechDigital, {
    from: { opacity: 0 },
    enter: { opacity: 1 },
    delay: 500,
    config: config.slow,
  });
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

  const transitionNews = useTransition(displayNews, {
    from: { opacity: 0 },
    enter: { opacity: 1 },
    delay: 500,
    config: config.slow,
  });

  useEffect(() => {
    if (isVisibleIntro && !displayIntro) {
      setDisplayIntro(true);
    }

    if (isVisibleBlockchain && !displayBlockchain) {
      setDisplayBlockchain(true);
    }

    if (isVisibleChallenge && !displayChallenge) {
      setDisplayChallenge(true);
    }

    if (isVisibleMillionsConnections && !displayMillionsConnections) {
      setDisplayMillionsConnections(true);
    }

    if (isVisibleFintechDigital && !displayFintechDigital) {
      setDisplayFintechDigital(true);
    }

    if (isVisibleTransactionProcess && !displayTransectionProcess) {
      setDisplayTransectionProcess(true);
    }

    if (isVisibleEcosystem && !displayEcosystem) {
      setDisplayEcosystem(true);
    }

    if (isVisibleInnovation && !displayInnovation) {
      setDisplayInnovation(true);
    }

    if (isVisibleRegister && !displayRegister) {
      setDisplayRegister(true);
    }

    if (isVisibleNews && !displayNews) {
      setDisplayNews(true);
    }
  }, [
    isVisibleIntro,
    isVisibleBlockchain,
    isVisibleMillionsConnections,
    isVisibleFintechDigital,
    isVisibleTransactionProcess,
    isVisibleEcosystem,
    isVisibleInnovation,
    isVisibleRegister,
    isVisibleNews,
    isVisibleChallenge,
  ]);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
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

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div>
      {isVisible && (
        <Button
          type="text"
          onClick={scrollToTop}
          style={{
            position: "fixed",
            zIndex: 999999,
            bottom: "20px",
            right: "20px",
            width: "58px",
            height: "58px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            minHeight: 20,
            minWidth: 20,
          }}
        >
          <div>
            <ArrowUpOutlined />
          </div>
        </Button>
      )}

      <div
        style={{ visibility: displayIntro ? "visible" : "hidden" }}
        ref={refIntro}
      >
        {transitionIntro((style, item) => (
          <animated.div style={style}>
            <Introduction display={displayIntro} isMobile={isMobile} />
          </animated.div>
        ))}
      </div>

      <div
        style={{ visibility: displayBlockchain ? "visible" : "hidden" }}
        ref={refBlockchain}
      >
        {transitionBlockchain((style, item) => (
          <animated.div style={style}>
            <BlockchainFunding
              display={displayBlockchain}
              isMobile={isMobile}
            />
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
            <MillionsConnections
              display={displayMillionsConnections}
              isMobile={isMobile}
            />
          </animated.div>
        ))}
      </div>

      <div
        style={{ visibility: displayFintechDigital ? "visible" : "hidden" }}
        ref={refFintechDigital}
      >
        {transitionFintechDigital((style, item) => (
          <animated.div style={style}>
            <FintechDigitalization
              display={displayFintechDigital}
              isMobile={isMobile}
            />
          </animated.div>
        ))}
      </div>

      <div
        style={{ visibility: displayTransectionProcess ? "visible" : "hidden" }}
        ref={refTransactionProcess}
      >
        {transitionTransectionProcess((style, item) => (
          <animated.div style={style}>
            <TransectionProcess
              display={displayTransectionProcess}
              isMobile={isMobile}
            />
          </animated.div>
        ))}
      </div>

      <div
        style={{ visibility: displayChallenge ? "visible" : "hidden" }}
        ref={refChallenge}
      >
        {transitionChallenge((style, item) => (
          <animated.div style={style}>
            <Challenge display={displayChallenge} isMobile={isMobile} />
          </animated.div>
        ))}
      </div>

      <div
        style={{ visibility: displayEcosystem ? "visible" : "hidden" }}
        ref={refEcosystem}
      >
        {transitionEcosystem((style, item) => (
          <animated.div style={style}>
            <Ecosystem display={displayEcosystem} isMobile={isMobile} />
          </animated.div>
        ))}
      </div>

      {/* <NewsSlider/> */}

      <div
        style={{ visibility: displayInnovation ? "visible" : "hidden" }}
        ref={refInnovation}
      >
        {transitionInnovation((style, item) => (
          <animated.div style={style}>
            <Innovation display={displayInnovation} isMobile={isMobile} />
          </animated.div>
        ))}
      </div>
      {/* <Snow/> */}
      <Footer />
      <CopyrightFooter />
    </div>
  );
}

export default HomeCommon;
