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

function SquareAnimation({fillPercent, fillColour, squareColour, countNumber }) {

    // const backgroundColour = useRef("#ffffff");
    // const fillColour = useRef("#000000");

    const borderRadius = "10px";
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
        background: squareColour,
        height: `${squareBorderWidth}px`,
        width: `${squareBorderWidth}px`,
    };

    return (
        <div style={{position:"relative", width: "300px", height: "300px", display: "flex", borderRadius: borderRadius,
            alignItems: "center", justifyContent: "center", boxShadow: "0 8px 20px rgba(0, 0, 0, 0.25), 0 2px 6px rgba(0, 0, 0, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.05)"}}>
            <div style={{fontSize: 40}}>{countNumber}</div>
            <div style={{ ...lineBackgroundStyle, bottom: 0, left: 0, borderBottomLeftRadius: borderRadius,
                backgroundImage: `conic-gradient(from 180deg at 100% 0%, 
                ${squareColour} ${degClamp((reversemodulus(fillPercent) + cornerOffset - cornerBodySize - cornerTailSize) / cornerRatioTail)}deg,
                ${fillColour} ${degClamp((reversemodulus(fillPercent) + cornerOffset - cornerBodySize) / cornerRatioTail)}deg,
                ${fillColour} ${degClamp((reversemodulus(fillPercent) + cornerOffset)/cornerRatio)}deg, 
                ${squareColour} ${degClamp((reversemodulus(fillPercent) + cornerOffset + cornerHeadSize)/cornerRatio)}deg)`}}>
            </div>
            <div style={{ ...lineBackgroundStyle, height: `calc(100% - ${squareBorderWidth*2}px)`, bottom: squareBorderWidth, left: 0,
                backgroundImage: `linear-gradient(to top, 
                ${squareColour} ${percentageClamp((((reversemodulus(fillPercent)-bodySize-tailSize)/100-(cornerRatio))/(1-cornerRatio))*100)}%,
                ${fillColour} ${percentageClamp((((reversemodulus(fillPercent)-bodySize)/100-(cornerRatio))/(1-cornerRatio))*100)}%,
                ${fillColour} ${percentageClamp(((reversemodulus(fillPercent)/100-(cornerRatio))/(1-cornerRatio))*100)}%, 
                ${squareColour} ${percentageClamp((((reversemodulus(fillPercent)+headSize)/100-(cornerRatio))/(1-cornerRatio))*100)}%)`}}>
            </div>

            <div style={{ ...lineBackgroundStyle, top: 0, left: 0, borderTopLeftRadius: borderRadius,
                backgroundImage: `conic-gradient(from 270deg at 100% 100%, 
                ${squareColour} ${degClamp((fillPercent - 100 + cornerOffset - cornerBodySize - cornerTailSize) / cornerRatioTail)}deg,
                ${fillColour} ${degClamp((fillPercent - 100 + cornerOffset - cornerBodySize) / cornerRatioTail)}deg,
                ${fillColour} ${degClamp((fillPercent - 100 + cornerOffset) / cornerRatio)}deg, 
                ${squareColour} ${degClamp((fillPercent - 100 + cornerOffset + cornerHeadSize) / cornerRatio)}deg)`}}>
            </div>
            <div style={{ ...lineBackgroundStyle, width: `calc(100% - ${squareBorderWidth*2}px)`, top: 0, left: squareBorderWidth,
                backgroundImage: `linear-gradient(to right,
                ${squareColour} ${percentageClamp((((fillPercent - 100 - bodySize - tailSize) / 100 - (cornerRatio)) / (1 - cornerRatio)) * 100)}%,
                ${fillColour} ${percentageClamp((((fillPercent - 100 - bodySize) / 100 - (cornerRatio)) / (1 - cornerRatio)) * 100)}%,
                ${fillColour} ${percentageClamp((((fillPercent - 100) / 100 - (cornerRatio)) / (1 - cornerRatio)) * 100)}%, 
                ${squareColour} ${percentageClamp((((fillPercent - 100 + headSize) / 100 - (cornerRatio)) / (1 - cornerRatio)) * 100)}%)`}}>
            </div>

            <div style={{ ...lineBackgroundStyle, top: 0, right: 0, borderTopRightRadius: borderRadius,
                backgroundImage: `conic-gradient(from 0deg at 0% 100%, 
                ${squareColour} ${degClamp((fillPercent - 200 + cornerOffset - cornerBodySize - cornerTailSize) / cornerRatioTail)}deg,
                ${fillColour} ${degClamp((fillPercent - 200 + cornerOffset - cornerBodySize) / cornerRatioTail)}deg,
                ${fillColour} ${degClamp((fillPercent - 200 + cornerOffset) / cornerRatio)}deg, 
                ${squareColour} ${degClamp((fillPercent - 200 + cornerOffset + cornerHeadSize) / cornerRatio)}deg)`}}>
            </div>
            <div style={{ ...lineBackgroundStyle, height: `calc(100% - ${squareBorderWidth*2}px)`, top: squareBorderWidth, right: 0,
                backgroundImage: `linear-gradient(to bottom, 
                ${squareColour} ${percentageClamp((((modulus(fillPercent) - 200 - bodySize - tailSize) / 100 - (cornerRatio)) / (1 - cornerRatio)) * 100)}%,
                ${fillColour} ${percentageClamp((((modulus(fillPercent) - 200 - bodySize) / 100 - (cornerRatio)) / (1 - cornerRatio)) * 100)}%,
                ${fillColour} ${percentageClamp((((modulus(fillPercent) - 200) / 100 - (cornerRatio)) / (1 - cornerRatio)) * 100)}%,
                ${squareColour} ${percentageClamp((((modulus(fillPercent) - 200 + headSize) / 100 - (cornerRatio)) / (1 - cornerRatio)) * 100)}%)`}}>
            </div>

            <div style={{ ...lineBackgroundStyle, bottom: 0, right: 0, borderBottomRightRadius: borderRadius,
                backgroundImage: `conic-gradient(from 90deg at 0% 0%, 
                ${squareColour} ${degClamp((modulus(fillPercent) - 300 + cornerOffset - cornerBodySize - cornerTailSize) / cornerRatioTail)}deg,
                ${fillColour} ${degClamp((modulus(fillPercent) - 300 + cornerOffset - cornerBodySize) / cornerRatioTail)}deg,
                ${fillColour} ${degClamp((modulus(fillPercent) - 300 + cornerOffset) / cornerRatio)}deg, 
                ${squareColour} ${degClamp((modulus(fillPercent) - 300 + cornerOffset + cornerHeadSize) / cornerRatio)}deg)`}}>
            </div>
            <div style={{ ...lineBackgroundStyle, width: `calc(100% - ${squareBorderWidth*2}px)`, bottom: 0, right: squareBorderWidth,
                backgroundImage: `linear-gradient(to left, 
                ${squareColour} ${percentageClamp((((modulus(fillPercent) - 300 - bodySize - tailSize) / 100 - (cornerRatio)) / (1 - cornerRatio)) * 100)}%,
                ${fillColour} ${percentageClamp((((modulus(fillPercent) - 300 - bodySize) / 100 - (cornerRatio)) / (1 - cornerRatio)) * 100)}%,
                ${fillColour} ${percentageClamp((((modulus(fillPercent) - 300) / 100 - (cornerRatio)) / (1 - cornerRatio)) * 100)}%, 
                ${squareColour} ${percentageClamp((((modulus(fillPercent) - 300 + headSize) / 100 - (cornerRatio)) / (1 - cornerRatio)) * 100)}%)`}}>
            </div>
        </div>
    )
}



export default function AnimatedBox() {
    // Item = useRef(null);

    const [backgroundColour, setBackgroundColour] = useState("rgb(255, 240, 160)");
    const [fillColour, setFillColour] = useState("rgb(255, 240, 240)");
    const [countNumber, setCountNumber] = useState(1);

    const [sideDuration, setSideDuration] = useState(3);

    const [fillPercent, setFillPercent] = useState(0);
    const timerValueOffset = useRef(0);

    const [showLeftText, setShowLeftText] = useState(0);
    const [showTopText, setShowTopText] = useState(0);
    const [showRightText, setShowRightText] = useState(0);
    const [showBottomText, setShowBottomText] = useState(0);

    const increaseButton = useRef<HTMLButtonElement>(null);
    const decreaseButton = useRef<HTMLButtonElement>(null);


    // update to new side duration (on button input)
    function updateSideDuration(newSideDuration: number) {
        if (newSideDuration<3 || newSideDuration>10) return

        timerValueOffset.current = (fillPercent + timerValueOffset.current)*sideDuration/newSideDuration - fillPercent;

        const backgroundColours = [
            "rgb(255, 240, 160)",  // Yellow (soft)
            "rgb(210, 230, 170)",  // Yellow → Pale Green (blend)
            "rgb(180, 220, 180)",  // Pale Green
            "rgb(100, 170, 130)",  // Pale → Dark Green (blend)
            "rgb(60, 120, 80)",    // Dark Green
            "rgb(110, 160, 200)",  // Green → Light Blue (blend)
            "rgb(160, 200, 240)",  // Light Blue
            "rgb(90, 100, 180)",   // Blue → Purple (blend leaning purple)
            "rgb(150, 120, 200)"
        ];

        if (newSideDuration != sideDuration) {
            setBackgroundColour(backgroundColours[newSideDuration-3]);
            setSideDuration(newSideDuration);

        }
    }

    // update timer and text displays
    function updateTextAnimation(value: number) {
        let sideProgress = Math.floor(value/100*sideDuration-0.5);
        if (sideProgress < 0) sideProgress = sideDuration*4-1

        setCountNumber(sideProgress % sideDuration + 1);

        const side = Math.floor(value/100);
        setShowLeftText(side == 0 ? 1 : 0);
        setShowTopText(side == 1 ? 1 : 0);
        setShowRightText(side == 2 ? 1 : 0);
        setShowBottomText(side == 3 ? 1 : 0);
    }

    // manage animation timings-
    useEffect(() => {
        let frameId;

        const animate = (time) => {
            let value = time/10/sideDuration - timerValueOffset.current;
            if (value > 400) {
                timerValueOffset.current += 400;
                value -= 400;
            }
            updateTextAnimation(value)

            setFillPercent(value);
            frameId = requestAnimationFrame(animate);
        };
        frameId = requestAnimationFrame(animate);

        return () => {
            cancelAnimationFrame(frameId);
        };
    }, [fillPercent, sideDuration]);

    /// Space/arrow keys press buttons
    useEffect(() => {
        const handler = (event)=>{
            if (event.code == "Space" || event.key == "ArrowUp") {
                increaseButton.current?.click();
            } else if (event.key == "ArrowDown") {
                decreaseButton.current?.click();
            }
        };
        window.addEventListener("keydown", handler);
        return () => {window.removeEventListener("keydown", handler)}
    })

    return (
        <div style={{backgroundColor: backgroundColour}} className="flex flex-1 items-center justify-center transition duration-3000 ease-in-out">
            <div style={{color: "rgb(20, 20, 30)", fontSize: 24}}>
                <div className="top-bottom-text" style={{opacity: showTopText, transition: "opacity 0.5s ease"}}>Hold</div>
                <div className="middle-row">
                    <div className="left-right-text" style={{opacity: showLeftText, transition: "opacity 0.5s ease"}}>Inhale</div>
                    <SquareAnimation fillPercent={fillPercent} fillColour={fillColour} squareColour={"rgb(35, 38, 45)"} countNumber={countNumber}/>
                    <div className="left-right-text" style={{opacity: showRightText, transition: "opacity 0.5s ease"}}>Exhale</div>
                </div>
                <div className="top-bottom-text" style={{opacity: showBottomText, transition: "opacity 0.5s ease"}}>Pause</div>

                <div className="flex justify-center gap-3 margin 4">
                    <button className="timer-btn small"
                            ref={increaseButton}
                            onClick={() => {updateSideDuration(sideDuration+1)}}>Increase</button>
                    <div>{sideDuration}s</div>
                    <button className="timer-btn small"
                            ref={decreaseButton}
                            onClick={() => {updateSideDuration(sideDuration-1)}}>Decrease</button>
                </div>
            </div>
        </div>
    );
}

function Home() {

    return (
        <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black">
            <main className="flex flex-1 w-full max-w-3xl flex-col items-center justify-center py-32 px-16 bg-white dark:bg-black sm:items-start">
                <AnimatedBox />
            </main>
        </div>
    );
}
