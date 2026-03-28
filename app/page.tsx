'use client';

import { motion } from "motion/react";
import {useEffect, useRef, useState} from "react";
import {fill} from "eslint-config-next";


function percentageClamp(val: number) {
    return val;
    // return Math.max(Math.min(val, 100), -100)
}
function degClamp(val: number) {
    return val;
    // return Math.max(Math.min(val, 360), -360)
}

function SquareAnimation() {

    // const backgroundColour = useRef("#ffffff");
    // const fillColour = useRef("#000000");

    const [backgroundColour, setBackgroundColour] = useState("#333333");
    const [fillColour, setFillColour] = useState("#ff0000");

    const [fillPercent, setFillPercent] = useState(0);
    const timerValueOffset = useRef(0);

    const [sideDuration, setSideDuration] = useState(6);

    useEffect(() => {
        const animate = (time) => {
            let value = time/11/sideDuration - timerValueOffset.current;
            // console.log(value);
            if (value > 400) {
                timerValueOffset.current += 400;
                value -= 400;
            }
            setFillPercent(value);
            requestAnimationFrame(animate);
        };
        requestAnimationFrame(animate);
    }, [fillPercent, sideDuration]);

    useEffect(() => {

        const fillColours = [
            "rgb(255, 220, 120)",  // Yellow (soft)
            "rgb(180, 220, 180)",  // Pale Green
            "rgb(60, 120, 80)",    // Dark Green
            "rgb(160, 200, 240)",  // Light Blue
            "rgb(50, 80, 150)",    // Dark Blue
            "rgb(150, 120, 200)"   // Purple
        ];
        const newCol = fillColours[sideDuration-3]
        if (newCol != fillColour) {
            setFillColour(newCol);
        }
    }, [sideDuration, fillColour]);

    const borderRadius = "20px";
    const squareBorderWidth = 20;
    const cornerRatio = 0.07;
    const headSize = 50;
    const cornerHeadSize = 500;
    const cornerOffset = -1;
    const tail_size = 100;

    const lineBackgroundStyle = {
        position: "absolute",
        background: backgroundColour,
        height: `${squareBorderWidth}px`,
        width: `${squareBorderWidth}px`,
    };

    return (
        <div style={{position:"relative", width: "300px", height: "300px", display: "flex", alignItems: "center", justifyContent: "center"}}>
            <div style={{ ...lineBackgroundStyle, bottom: 0, left: 0, borderBottomLeftRadius: borderRadius,
                backgroundImage: `conic-gradient(from 180deg at 100% 0%, ${fillColour} ${degClamp((fillPercent+cornerOffset)/cornerRatio)}deg, ${backgroundColour} ${degClamp((fillPercent+cornerOffset)/cornerRatio+cornerHeadSize)}deg)`}}>
            </div>
            <div style={{ ...lineBackgroundStyle, height: `calc(100% - ${squareBorderWidth*2}px)`, bottom: squareBorderWidth, left: 0,
                backgroundImage: `linear-gradient(to top, ${fillColour} ${percentageClamp(((fillPercent/100-(cornerRatio))/(1-cornerRatio))*100)}%, ${backgroundColour} ${percentageClamp(((fillPercent/100-(cornerRatio))/(1-cornerRatio))*100+headSize)}%)`}}>
            </div>

            <div style={{ ...lineBackgroundStyle, top: 0, left: 0, borderTopLeftRadius: borderRadius,
                backgroundImage: `conic-gradient(from 270deg at 100% 100%, ${fillColour} ${degClamp((fillPercent+cornerOffset-100)/cornerRatio)}deg, ${backgroundColour} ${degClamp((fillPercent+cornerOffset-100)/cornerRatio+cornerHeadSize)}deg)`}}>
            </div>
            <div style={{ ...lineBackgroundStyle, width: `calc(100% - ${squareBorderWidth*2}px)`, top: 0, left: squareBorderWidth,
                backgroundImage: `linear-gradient(to right, ${fillColour} ${percentageClamp((((fillPercent-100)/100-(cornerRatio))/(1-cornerRatio))*100)}%, ${backgroundColour} ${percentageClamp((((fillPercent-100)/100-(cornerRatio))/(1-cornerRatio))*100+headSize)}%)`}}>
            </div>

            <div style={{ ...lineBackgroundStyle, top: 0, right: 0, borderTopRightRadius: borderRadius,
                backgroundImage: `conic-gradient(from 0deg at 0% 100%, ${fillColour} ${degClamp((fillPercent+cornerOffset-200)/cornerRatio)}deg, ${backgroundColour} ${degClamp((fillPercent+cornerOffset-200)/cornerRatio+cornerHeadSize)}deg)`}}>
            </div>
            <div style={{ ...lineBackgroundStyle, height: `calc(100% - ${squareBorderWidth*2}px)`, top: squareBorderWidth, right: 0,
                backgroundImage: `linear-gradient(to bottom, ${fillColour} ${percentageClamp((((fillPercent-200)/100-(cornerRatio))/(1-cornerRatio))*100)}%, ${backgroundColour} ${percentageClamp((((fillPercent-200)/100-(cornerRatio))/(1-cornerRatio))*100+headSize)}%)`}}>
            </div>

            <div style={{ ...lineBackgroundStyle, bottom: 0, right: 0, borderBottomRightRadius: borderRadius,
                backgroundImage: `conic-gradient(from 90deg at 0% 0%, ${fillColour} ${degClamp((fillPercent+cornerOffset-300)/cornerRatio)}deg, ${backgroundColour} ${degClamp((fillPercent+cornerOffset-300)/cornerRatio+cornerHeadSize)}deg)`}}>
            </div>
            <div style={{ ...lineBackgroundStyle, width: `calc(100% - ${squareBorderWidth*2}px)`, bottom: 0, right: squareBorderWidth,
                backgroundImage: `linear-gradient(to left, ${fillColour} ${percentageClamp((((fillPercent-300)/100-(cornerRatio))/(1-cornerRatio))*100)}%, ${backgroundColour} ${percentageClamp((((fillPercent-300)/100-(cornerRatio))/(1-cornerRatio))*100+headSize)}%)`}}>
            </div>
            <button onClick={() => {setSideDuration(sideDuration+1)}}>
                Increase thingy
            </button>
        </div>

    )

    // return <motion.button animate={{opacity: 1}}>Im a button</motion.button>
}


function foo(){
}

function AnimatedBox() {
    // Item = useRef(null);

    return (
        // <div ref={Item} className="box-breathing-container" onClick={()=>{foo()}}>
        <div className="box-breathing-container">
            <div className="top-bottom-text">Top Text</div>
            <div className="middle-row">
                <div className="left-right-text">Left Text</div>
                <SquareAnimation />
                {/*<i className="fi fi-sr-angle-small-down"></i>*/}
                {/*<i className="fi fi-sr-angle-small-down"></i>*/}
                {/*<i className="fi fi-sr-angle-small-down"></i>*/}
                {/*<div className="box">*/}
                {/*    <AnimatedThing/>*/}
                {/*    <span className="background-line top"></span>*/}
                {/*    <span className="slider-line top" id="left-progress-bar"></span>*/}

                {/*    <span className="background-line right"></span>*/}
                {/*    <span className="slider-line right"></span>*/}

                {/*    <span className="background-line bottom"></span>*/}
                {/*    <span className="slider-line bottom"></span>*/}

                {/*    <span className="background-line left"></span>*/}
                {/*    <span className="slider-line left"></span>*/}

                {/*    <div className="content">Hello</div>*/}
                {/*</div>*/}
                <div className="left-right-text">Right Text</div>
            </div>

            <div className="top-bottom-text">Bottom Text</div>
        </div>
    );
}

export default function Home() {

    return (
        <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black">
            <main className="flex flex-1 w-full max-w-3xl flex-col items-center justify-between py-32 px-16 bg-white dark:bg-black sm:items-start">
                <AnimatedBox />
            </main>
        </div>
    );
}
