'use client';

import {useEffect, useState} from "react";

function toTimeString(time: number) : string {
    const minutes = Math.floor(time / 60);
    let minutesString:string;
    if (minutes == -1) minutesString = "-0"
    else if (minutes<0) minutesString = (minutes+1).toString();
    else minutesString = minutes.toString()

    let seconds = (Math.abs(time % 60)).toString();
    if (seconds.length == 1) {seconds = "0"+seconds}
    return minutesString+":"+seconds;
}

function BreathingThing() {

    const [widthMul, setWidthMul] = useState(0)
    const [breathCount, setBreathCount] = useState(1)
    const [timerTracker, setTimerTracker] = useState(0)
    const [breathCountOffset, setBreathCountOffset] = useState(0)

    const [timerValue, setTimerValue] = useState(10)
    const [beginCountDown, setBeginCountDown] = useState("")

    const [pageState, setPageState] = useState("input") // input -> breathing -> finished
    const [timerState, setTimerState] = useState("title") // title -> breathing -> holding -> recovery
    const [roundNumber, setRoundNumber] = useState(1);
    const [isHolding, setIsHolding] = useState(false);

    // const [roundTitleText, setRoundTitleText] = useState("")
    // const [roundDisplayText, setRoundDisplayText] = useState("")

    const squareSize = 250;

    // breaths per minute
    const breathingRate = 24;
    const totalBreathCount = 4;
    const timerLength = 10;
    const totalRounds = 4;

    function nextRound() {
        setRoundNumber((val) => val+1);
        setTimerState("title");
        setTimerValue(timerLength);
        setIsHolding(false);
        if (roundNumber > totalRounds) {
            setPageState("finished");
        }
    }

    function resetBreathingTimer() {
        requestAnimationFrame((time: number) => {
            setBreathCountOffset(time/1000);
            setTimerValue(timerLength);
        })
    }

    // title
    useEffect(() => {
        if (timerState == "title") {
            setBeginCountDown("")
            setTimeout(() => {
                setBeginCountDown("3")
                setTimeout(() => {
                    setBeginCountDown("2")
                    setTimeout(() => {
                        setBeginCountDown("1")
                        setTimeout(() => {
                            setTimerState("breathing")
                            resetBreathingTimer();
                        }, 1000)
                    }, 1000)
                },1000)
            }, 2000)
        }
    }, [timerState])

    // breathing animation
    useEffect(() => {
        if (timerState == "breathing") {
            let frameId: number;
            const animate = (time: number) => {
                // console.log("time", time);
                const timer = (time/1000)-breathCountOffset;
                // setTimerTracker(time/1000);
                const breathProgress = timer/(60/breathingRate);

                if (breathProgress > totalBreathCount-0.5) {
                    const quadraticDropOff = (1-(((breathProgress-totalBreathCount+0.5)*2)**2)/2)*9/8;
                    setWidthMul(Math.max(quadraticDropOff, 0));
                    if (quadraticDropOff < 0) {
                        setTimerState("holding");
                    }
                } else {
                    setBreathCount(Math.ceil(breathProgress));
                    setWidthMul((Math.sin(breathProgress*(2*Math.PI)-Math.PI/2)/8)+1);
                }
                frameId = requestAnimationFrame(animate);
            };
            frameId = requestAnimationFrame(animate);

            return () => {
                cancelAnimationFrame(frameId);
            };
        }
    }, [breathCountOffset, timerState]);

    // timer loop after breathing
    useEffect(() => {
        if (timerState == "holding") {
            const interval = () => {
                setTimerValue((val) => val-1);
            }

            const intervalId = setInterval(interval, 1000);
            return () => clearInterval(intervalId);
        }
    }, [widthMul])

    // finish state if timer finished
    useEffect(() => {
        if (timerState == "holding" && timerValue<0 && !isHolding) {
            setTimerState("recovery")
            setTimerValue(15);
        } else if (timerState == "recovery" && timerValue<0) {
            nextRound();
        }
    }, [timerState, nextRound, timerValue, isHolding]);

    // render display text
    let roundTitleText;
    let roundDisplayText;
    if (timerState == "title") {
        roundTitleText = "Round "+roundNumber+" - "+toTimeString(timerValue);
        roundDisplayText = beginCountDown;
    } else if (timerState == "holding") {
        roundTitleText = ("Hold")
        roundDisplayText = (toTimeString(timerValue));
    } else if (timerState == "recovery") {
        roundTitleText = ("Recovery")
        roundDisplayText = (toTimeString(timerValue));
    } else {
        roundTitleText = ("");
        roundDisplayText = ("");
    }

    return (
        <div className="relative text-gray-800 font-semibold">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-5 text-4xl font-semibold w-2xs text-center">
                {roundTitleText}
            </div>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 translate-y-5 text-4xl font-semibold">
                {roundDisplayText}
            </div>
            <div className="shadow-lg bg-blue-300 inset-0 flex items-center justify-center"
                 style={{borderRadius: 1000, width: squareSize, height: squareSize, transform: `scale(${widthMul})`, fontSize: "40px"}}>
                {breathCount}/{totalBreathCount}
            </div>
        </div>
    )
}


export default function WimHof() {

    const [backgroundColour, setBackgroundColour] = useState("rgb(255, 240, 160)");

    return (
        <div style={{backgroundColor: backgroundColour}}
             className="flex flex-1 justify-center transition duration-3000 ease-in-out">
            <div className="flex items-center">
                <BreathingThing />
            </div>
        </div>
    );
}
