import { Image } from "antd";
import React, { useEffect } from "react";

function getSupportedPropertyName(b: string[]): string | null {
    for (const propertyName of b) {
        if (typeof document.body.style[propertyName as any] !== "undefined") {
            return propertyName;
        }
    }
    return null;
}

// class Snowflake {
//     element: HTMLParagraphElement;
//     radius: number;
//     speed: number;
//     xPos: number;
//     yPos: number;
//     counter: number;
//     sign: number;

//     // Use a static property to store the transformProperty
//     static transformProperty: string | null = getSupportedPropertyName([
//         "transform",
//         "msTransform",
//         "webkitTransform",
//         "mozTransform",
//         "oTransform",
//     ]);

//     constructor(element: HTMLParagraphElement, radius: number, speed: number, xPos: number, yPos: number) {
//         this.element = element;
//         this.radius = radius;
//         this.speed = speed;
//         this.xPos = xPos;
//         this.yPos = yPos;
//         this.counter = 0;
//         this.sign = Math.random() < 0.5 ? 1 : -1;
//         this.element.style.opacity = (0.5 + Math.random()).toString();
//         this.element.style.fontSize = Math.floor(1) + "px";
//     }

//     update(browserHeight: any): void {
//         this.counter += this.speed / 5000;
//         this.xPos += (this.sign * this.speed * Math.cos(this.counter)) / 40;
//         this.yPos += Math.sin(this.counter) / 40 + this.speed / 30;
//         this.setTranslate3DTransform(Math.round(this.xPos), Math.round(this.yPos));
//         if (this.yPos > browserHeight) {
//             this.yPos = -50;
//         }
//     }

//     setTranslate3DTransform(c: number, b: number): void {
//         const d = `translate3d(${c}px, ${b}px, 0)`;
//         (this.element.style as any)[Snowflake.transformProperty !== null ? Snowflake.transformProperty : 0] = d;
//     }

//     static createSnowflake(b: HTMLParagraphElement, a: number, d: number, e: number, c: number): Snowflake {
//         return new Snowflake(b, a, d, e, c);
//     }
// }

const Snow: React.FC = () => {
    // const containerStyle: React.CSSProperties = {
    //     position: 'absolute',
    //     left: '0px',
    //     top: '0px',
    //     height: '100vh',
    // };

    // const snowflakeStyle: React.CSSProperties = {
    //     paddingLeft: '15px',
    //     fontSize: 1 + Math.random() * 10 + "px",
    //     lineHeight: '24px',
    //     position: 'fixed',
    //     color: 'rgb(192, 233, 255)',
    //     userSelect: 'none',
    //     zIndex: 1000,
    //     MozUserSelect: 'none',
    //     msUserSelect: 'none',
    //     KhtmlUserSelect: 'none',
    //     WebkitUserSelect: 'none',
    //     WebkitTouchCallout: 'none',
    // };

    // const snowflakeHoverStyle: React.CSSProperties = {
    //     cursor: 'default',
    // };

    // let requestAnimationFrame =
    //     window.requestAnimationFrame ||
    //     (window as any).mozRequestAnimationFrame ||
    //     (window as any).webkitRequestAnimationFrame ||
    //     (window as any).msRequestAnimationFrame;

    // let transforms = [
    //     "transform",
    //     "msTransform",
    //     "webkitTransform",
    //     "mozTransform",
    //     "oTransform",
    // ];

    // let transformProperty = getSupportedPropertyName(transforms);
    // let snowflakes: Snowflake[] = [];
    // let browserWidth: number;
    // let browserHeight: number;
    // let numberOfSnowflakes = 15;
    // let resetPosition = false;

    // useEffect(() => {
    //     const generateAndSetup = () => {
    //         generateSnowflakes();
    //         // window.addEventListener('resize', setResetFlag, false);
    //     };

    //     generateAndSetup(); // Call the function once when the component mounts

    //     return () => {
    //         window.removeEventListener('resize', setResetFlag, false);
    //     };
    // }, []);

    // function moveSnowflakes() {
    //     for (var b = 0; b < snowflakes.length; b++) {
    //         var a = snowflakes[b];
    //         a.update(browserHeight);
    //     }
    //     if (resetPosition) {
    //         browserWidth = document.documentElement.clientWidth;
    //         browserHeight = document.documentElement.clientHeight;
    //         for (var b = 0; b < snowflakes.length; b++) {
    //             var a = snowflakes[b];
    //             a.xPos = getPosition(50, browserWidth);
    //             a.yPos = getPosition(50, browserHeight);
    //         }
    //         resetPosition = false;
    //     }
    //     requestAnimationFrame(moveSnowflakes);
    // }

    // function getPosition(b: number, a: number): number {
    //     return Math.round(-1 * b + Math.random() * (a + 2 * b));
    // }

    // function setResetFlag(a: Event) {
    //     resetPosition = true;
    // }

    // function generateSnowflakes() {
    //     var b = document.querySelector(".snowflake") as HTMLParagraphElement;
    //     var h = b.parentNode as HTMLElement;
    //     browserWidth = document.documentElement.clientWidth;
    //     browserHeight = document.documentElement.clientHeight;
    //     for (var d = 0; d < numberOfSnowflakes; d++) {
    //         var j = b.cloneNode(true) as HTMLParagraphElement;
    //         h.appendChild(j);
    //         var e = getPosition(50, browserWidth);
    //         var a = getPosition(50, browserHeight);
    //         var c = 5 + Math.random() * 40;
    //         var g = 4 + Math.random() * 10;
    //         var f = new Snowflake(j, g, c, e, a);
    //         snowflakes.push(f);
    //     }
    //     h.removeChild(b);
    //     moveSnowflakes();
    // }

    return (
        <></>
        // <div>
        //     <style>{`
        //       #snowflakeContainer {
        //         position: absolute;
        //         left: 0px;
        //         top: 0px;
        //       }
        //       .snowflake {
        //         padding-left: 15px;
        //         font-size: 14px;
        //         line-height: 24px;
        //         position: fixed;
        //         color: rgb(192, 233, 255);
        //         user-select: none;
        //         z-index: 1000;
        //         -moz-user-select: none;
        //         -ms-user-select: none;
        //         -khtml-user-select: none;
        //         -webkit-user-select: none;
        //         -webkit-touch-callout: none;
        //       }
        //       .snowflake:hover {
        //         cursor: default;
        //       }
        //     `}
        //     </style>
        //     <div id="snowflakeContainer" style={containerStyle}>
        //         <p className="snowflake">
        //             <img
        //                 src="https://w.ladicdn.com/60b444ceeba2a30012e68735/hoa-dao-20240104030958-to18j.png"
        //                 alt="Snowflake"
        //                 style={{width:15}}
        //             />
        //         </p>
        //     </div>
        // </div>
    );
};

export default Snow;
