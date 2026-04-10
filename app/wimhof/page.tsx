'use client';

import {useEffect, useState, useReducer} from "react";

interface StateType {
    pageState: string,
    timerState: string,
    roundNumber: number,
    triggerUseEffect: boolean,

    timerValue: number,
    roundTitleText: string,
    roundDisplayText: string,
    titleCountdown: string,

    breathCountTimerOffset: number
}
const initialState = {
    // state info
    pageState: "breathing", // input -> breathing -> finished
    timerState: "title", // title -> breathing -> holding -> recovery
    roundNumber: 1,
    triggerUseEffect: true,

    // data
    timerValue: 0,
    roundTitleText: "initial text",
    roundDisplayText: "",
    titleCountdown: "",

    breathCountTimerOffset: 0,

}

const inputs = {
    breathingRate: 24,
    timerLength: 10,
    recoveryLength: 15,
    totalRounds: 4,
    breathCount: 4,
}

function stepState(state: StateType, action: {type: string, text?: string}) {

    state = {...state, triggerUseEffect: false}

    if (action.type == "step") {

        // state transition
        if (state.pageState == "breathing") {
            if (state.timerState == "title") {
                state.timerState = "breathing"
                state.triggerUseEffect = true;
                requestAnimationFrame((time: number) => {
                    state.breathCountTimerOffset = time/1000;
                    state.timerValue = inputs.timerLength;
                })
            } else if (state.timerState == "breathing") {
                state.triggerUseEffect = true
                state.timerState = "holding"
            } else if (state.timerState == "holding") {
                state.timerState = "recovery"
                state.timerValue = inputs.recoveryLength;
            } else if (state.timerState == "recovery") {
                state.timerState = "title"
                state.triggerUseEffect = true;
                state.roundNumber += 1
            }
        }

    } else if (action.type == "titleUpdate") {
        // breathing title update
        if (action.text != null) {
            state.titleCountdown = action.text;
        }
    } else if (action.type == "timerUpdate") {
        state.timerValue -= 1;
        if (state.timerValue < 0) {
            state = stepState(state, {type: "step"})
        }
    }


    // state data update
    if (state.timerState == "title") {
        state.roundTitleText = "Round "+state.roundNumber+" - "+toTimeString(inputs.timerLength);
        state.roundDisplayText = state.titleCountdown;
    } else if (state.timerState == "holding") {
        state.roundTitleText = "Hold"
        state.roundDisplayText = toTimeString(state.timerValue);
    } else if (state.timerState == "recovery") {
        state.roundTitleText = "Recovery"
        state.roundDisplayText = (toTimeString(state.timerValue));
    } else {
        state.roundTitleText = "";
        state.roundDisplayText = "";
    }

    return state;
}


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

    const [state, updateState] = useReducer(stepState, initialState);


    const [widthMul, setWidthMul] = useState(0)
    const [breathCount, setBreathCount] = useState(1)

    const squareSize = 250;

    // breaths per minute
    const breathingRate = 24;

    // title
    useEffect(() => {
        if (state.pageState == "breathing" && state.timerState == "title" && state.triggerUseEffect) {
            updateState({type: "titleUpdate", text: ""})
            setTimeout(() => {
                updateState({type: "titleUpdate", text: "3"})
                setTimeout(() => {
                    updateState({type: "titleUpdate", text: "2"})
                    setTimeout(() => {
                        updateState({type: "titleUpdate", text: "1"})
                        setTimeout(() => {
                            updateState({type: "step"})
                        }, 1000)
                    }, 1000)
                },1000)
            }, 2000)
        }
    }, [state])

    // breathing animation
    useEffect(() => {
        if (state.timerState == "breathing") {
            let frameId: number;
            const animate = (time: number) => {
                const timer = (time/1000)-state.breathCountTimerOffset;
                // setTimerTracker(time/1000);
                const breathProgress = timer/(60/breathingRate);

                if (breathProgress > inputs.breathCount-0.5) {
                    const quadraticDropOff = (1-(((breathProgress-inputs.breathCount+0.5)*2)**2)/2)*9/8;
                    setWidthMul(Math.max(quadraticDropOff, 0));
                    if (quadraticDropOff < 0) {
                        updateState({type: "step"});
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
    }, [state]);

    // move towards color channel
    // useEffect(() => {
    //
    // }, []);

    // timer loop after breathing
    useEffect(() => {
        if (state.pageState == "breathing" && (state.timerState == "holding" || state.timerState == "recovery")) {
            const interval = () => {
                updateState({type: "timerUpdate"});
            }

            const intervalId = setInterval(interval, 1000);
            return () => clearInterval(intervalId);
        }
    }, [state])

    return (
        // <div className="relative text-gray-800 font-semibold" style={{
        //     backgroundImage: `radial-gradient(in oklch circle, ${}, ${})`
        // }}>
        <div className="relative text-gray-800 font-semibold">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-5 text-4xl font-semibold w-2xs text-center">
                {state.roundTitleText}
            </div>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 translate-y-5 text-4xl font-semibold">
                {state.roundDisplayText}
            </div>
            <div className="shadow-lg bg-blue-300 inset-0 flex items-center justify-center"
                 style={{borderRadius: 1000, width: squareSize, height: squareSize, transform: `scale(${widthMul})`, fontSize: "40px"}}>
                {breathCount}/{inputs.breathCount}
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
