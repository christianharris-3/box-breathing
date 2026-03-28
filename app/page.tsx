'use client';

import {useEffect, useRef, useState} from "react";


function percentageClamp(val: number) {
    return val;
    // return Math.max(Math.min(val, 100), -100)
}
function degClamp(val: number) {
    // return val;
    return Math.max(Math.min(val, 360), -360)
}

function modulus(val: number) {
    if (val > 0 && val < 200) return val+400
    return val;
}
function reversemodulus(val: number) {
    if (val > 300 && val < 400) return val-400
    return val;
}

function SquareAnimation({fillPercent, fillColour, backgroundColour }) {

    // const backgroundColour = useRef("#ffffff");
    // const fillColour = useRef("#000000");

    const borderRadius = "20px";
    const squareBorderWidth = 25;
    const cornerRatio = 0.1;
    const headSize = 5;
    const bodySize = 20
    const tailSize = 50;

    const cornerOffset = 0;
    const cornerHeadSize = headSize;
    const cornerBodySize = bodySize;
    const cornerTailSize = tailSize;
    const cornerRatioTail = cornerRatio;

    const lineBackgroundStyle = {
        position: "absolute",
        background: backgroundColour,
        height: `${squareBorderWidth}px`,
        width: `${squareBorderWidth}px`,
    };

    return (
        <div style={{position:"relative", width: "300px", height: "300px", display: "flex", alignItems: "center", justifyContent: "center"}}>
            <div style={{ ...lineBackgroundStyle, bottom: 0, left: 0, borderBottomLeftRadius: borderRadius,
                backgroundImage: `conic-gradient(from 180deg at 100% 0%, 
                ${backgroundColour} ${degClamp((reversemodulus(fillPercent) + cornerOffset - cornerBodySize - cornerTailSize) / cornerRatioTail)}deg,
                ${fillColour} ${degClamp((reversemodulus(fillPercent) + cornerOffset - cornerBodySize) / cornerRatioTail)}deg,
                ${fillColour} ${degClamp((reversemodulus(fillPercent) + cornerOffset)/cornerRatio)}deg, 
                ${backgroundColour} ${degClamp((reversemodulus(fillPercent) + cornerOffset + cornerHeadSize)/cornerRatio)}deg)`}}>
            </div>
            <div style={{ ...lineBackgroundStyle, height: `calc(100% - ${squareBorderWidth*2}px)`, bottom: squareBorderWidth, left: 0,
                backgroundImage: `linear-gradient(to top, 
                ${backgroundColour} ${percentageClamp((((reversemodulus(fillPercent)-bodySize-tailSize)/100-(cornerRatio))/(1-cornerRatio))*100)}%,
                ${fillColour} ${percentageClamp((((reversemodulus(fillPercent)-bodySize)/100-(cornerRatio))/(1-cornerRatio))*100)}%,
                ${fillColour} ${percentageClamp(((reversemodulus(fillPercent)/100-(cornerRatio))/(1-cornerRatio))*100)}%, 
                ${backgroundColour} ${percentageClamp((((reversemodulus(fillPercent)+headSize)/100-(cornerRatio))/(1-cornerRatio))*100)}%)`}}>
            </div>

            <div style={{ ...lineBackgroundStyle, top: 0, left: 0, borderTopLeftRadius: borderRadius,
                backgroundImage: `conic-gradient(from 270deg at 100% 100%, 
                ${backgroundColour} ${degClamp((fillPercent - 100 + cornerOffset - cornerBodySize - cornerTailSize) / cornerRatioTail)}deg,
                ${fillColour} ${degClamp((fillPercent - 100 + cornerOffset - cornerBodySize) / cornerRatioTail)}deg,
                ${fillColour} ${degClamp((fillPercent - 100 + cornerOffset) / cornerRatio)}deg, 
                ${backgroundColour} ${degClamp((fillPercent - 100 + cornerOffset + cornerHeadSize) / cornerRatio)}deg)`}}>
            </div>
            <div style={{ ...lineBackgroundStyle, width: `calc(100% - ${squareBorderWidth*2}px)`, top: 0, left: squareBorderWidth,
                backgroundImage: `linear-gradient(to right,
                ${backgroundColour} ${percentageClamp((((fillPercent - 100 - bodySize - tailSize) / 100 - (cornerRatio)) / (1 - cornerRatio)) * 100)}%,
                ${fillColour} ${percentageClamp((((fillPercent - 100 - bodySize) / 100 - (cornerRatio)) / (1 - cornerRatio)) * 100)}%,
                ${fillColour} ${percentageClamp((((fillPercent - 100) / 100 - (cornerRatio)) / (1 - cornerRatio)) * 100)}%, 
                ${backgroundColour} ${percentageClamp((((fillPercent - 100 + headSize) / 100 - (cornerRatio)) / (1 - cornerRatio)) * 100)}%)`}}>
            </div>

            <div style={{ ...lineBackgroundStyle, top: 0, right: 0, borderTopRightRadius: borderRadius,
                backgroundImage: `conic-gradient(from 0deg at 0% 100%, 
                ${backgroundColour} ${degClamp((fillPercent - 200 + cornerOffset - cornerBodySize - cornerTailSize) / cornerRatioTail)}deg,
                ${fillColour} ${degClamp((fillPercent - 200 + cornerOffset - cornerBodySize) / cornerRatioTail)}deg,
                ${fillColour} ${degClamp((fillPercent - 200 + cornerOffset) / cornerRatio)}deg, 
                ${backgroundColour} ${degClamp((fillPercent - 200 + cornerOffset + cornerHeadSize) / cornerRatio)}deg)`}}>
            </div>
            <div style={{ ...lineBackgroundStyle, height: `calc(100% - ${squareBorderWidth*2}px)`, top: squareBorderWidth, right: 0,
                backgroundImage: `linear-gradient(to bottom, 
                ${backgroundColour} ${percentageClamp((((modulus(fillPercent) - 200 - bodySize - tailSize) / 100 - (cornerRatio)) / (1 - cornerRatio)) * 100)}%,
                ${fillColour} ${percentageClamp((((modulus(fillPercent) - 200 - bodySize) / 100 - (cornerRatio)) / (1 - cornerRatio)) * 100)}%,
                ${fillColour} ${percentageClamp((((modulus(fillPercent) - 200) / 100 - (cornerRatio)) / (1 - cornerRatio)) * 100)}%,
                ${backgroundColour} ${percentageClamp((((modulus(fillPercent) - 200 + headSize) / 100 - (cornerRatio)) / (1 - cornerRatio)) * 100)}%)`}}>
            </div>

            <div style={{ ...lineBackgroundStyle, bottom: 0, right: 0, borderBottomRightRadius: borderRadius,
                backgroundImage: `conic-gradient(from 90deg at 0% 0%, 
                ${backgroundColour} ${degClamp((modulus(fillPercent) - 300 + cornerOffset - cornerBodySize - cornerTailSize) / cornerRatioTail)}deg,
                ${fillColour} ${degClamp((modulus(fillPercent) - 300 + cornerOffset - cornerBodySize) / cornerRatioTail)}deg,
                ${fillColour} ${degClamp((modulus(fillPercent) - 300 + cornerOffset) / cornerRatio)}deg, 
                ${backgroundColour} ${degClamp((modulus(fillPercent) - 300 + cornerOffset + cornerHeadSize) / cornerRatio)}deg)`}}>
            </div>
            <div style={{ ...lineBackgroundStyle, width: `calc(100% - ${squareBorderWidth*2}px)`, bottom: 0, right: squareBorderWidth,
                backgroundImage: `linear-gradient(to left, 
                ${backgroundColour} ${percentageClamp((((modulus(fillPercent) - 300 - bodySize - tailSize) / 100 - (cornerRatio)) / (1 - cornerRatio)) * 100)}%,
                ${fillColour} ${percentageClamp((((modulus(fillPercent) - 300 - bodySize) / 100 - (cornerRatio)) / (1 - cornerRatio)) * 100)}%,
                ${fillColour} ${percentageClamp((((modulus(fillPercent) - 300) / 100 - (cornerRatio)) / (1 - cornerRatio)) * 100)}%, 
                ${backgroundColour} ${percentageClamp((((modulus(fillPercent) - 300 + headSize) / 100 - (cornerRatio)) / (1 - cornerRatio)) * 100)}%)`}}>
            </div>
        </div>
    )
}



function AnimatedBox() {
    // Item = useRef(null);

    const [backgroundColour, setBackgroundColour] = useState("#333333");
    const [fillColour, setFillColour] = useState("#ff0000");

    const [sideDuration, setSideDuration] = useState(3);

    function updateSideDuration(newSideDuration: number) {

        const fillColours = [
            "rgb(255, 220, 120)",  // Yellow (soft)
            "rgb(180, 220, 180)",  // Pale Green
            "rgb(60, 120, 80)",    // Dark Green
            "rgb(160, 200, 240)",  // Light Blue
            "rgb(50, 80, 150)",    // Dark Blue
            "rgb(150, 120, 200)"   // Purple
        ];
        if (newSideDuration != sideDuration) {
            setFillColour(fillColours[newSideDuration-3]);
            setSideDuration(newSideDuration);
        }
    }

    const [fillPercent, setFillPercent] = useState(0);
    const timerValueOffset = useRef(0);

    useEffect(() => {
        let frameId;

        const animate = (time) => {
            let value = time/10/sideDuration - timerValueOffset.current;
            if (value > 400) {
                timerValueOffset.current += 400;
                value -= 400;
            }
            setFillPercent(value);
            frameId = requestAnimationFrame(animate);
        };
        frameId = requestAnimationFrame(animate);

        return () => {
            cancelAnimationFrame(frameId);
        };
    }, [fillPercent, sideDuration]);

    return (
        <div style={{backgroundColor: fillColour}}>
            <div style={{backgroundColor: fillColour}} className="box-breathing-container">
                <div className="top-bottom-text">Top Text</div>
                <div className="middle-row">
                    <div className="left-right-text">Left Text</div>
                    <SquareAnimation fillPercent={fillPercent} fillColour={"#ffffff"} backgroundColour={backgroundColour}/>
                    <div className="left-right-text">Right Text</div>
                </div>
                <div className="top-bottom-text">Bottom Text</div>
                <button onClick={() => {updateSideDuration(sideDuration+1)}}>
                    Increase thingy
                </button>
            </div>
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
