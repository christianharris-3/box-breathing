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

function getColours(timerState: string) {
    if (timerState == "title") {
        return [
            "rgb(230, 235, 255)",  // Soft bluish white
            "rgb(210, 220, 245)",  // Pale blue
            "rgb(200, 210, 230)",  // Blue-grey
            "rgb(220, 210, 220)",  // Subtle purple tint
            "rgb(240, 220, 210)",  // Very soft warm tint
            "rgb(255, 235, 220)"   // Warm neutral peach
        ];
    } else if (timerState == "breathing") {
        return [
            "rgb(255, 220, 150)",  // Warm yellow
            "rgb(255, 200, 130)",  // Yellow-orange
            "rgb(255, 180, 120)",  // Soft orange
            "rgb(255, 160, 110)",  // Orange-red blend
            "rgb(240, 140, 100)",  // Soft red-orange
            "rgb(255, 170, 130)",  // Back toward orange
            "rgb(255, 210, 160)"   // Return to warm yellow
        ];
    } else if (timerState == "holding") {
        return [
            "rgb(180, 210, 255)",  // Light blue
            "rgb(140, 190, 240)",  // Calm blue
            "rgb(100, 160, 220)",  // Deeper blue
            "rgb(80, 130, 200)",   // Blue leaning cool
            "rgb(70, 110, 180)",   // Deep blue
            "rgb(90, 120, 200)",   // Slight lift
            "rgb(120, 150, 220)",  // Return toward lighter
            "rgb(160, 190, 240)"   // Soft exit
        ];
    } else if (timerState == "recovery") {
        return [
            "rgb(170, 200, 240)",  // Light blue
            "rgb(190, 210, 220)",  // Blue → neutral
            "rgb(210, 220, 190)",  // Neutral → green
            "rgb(230, 210, 160)",  // Green → warm
            "rgb(255, 200, 140)",  // Warm orange
            "rgb(255, 215, 160)"   // Soft warm yellow
        ];
    }
}

function stepColour(
        state: {cols: Array<string>, progress: number, colsListIndex: number, colsList: Array<string>},
        action: {type: string, progress?: number, newColsList?: Array<string>}) {

    state = {...state}

    if (action.type == "addColour") {
        const newCol = state.colsList.at(state.colsListIndex);
        if (newCol != null) {
            state.cols.push(newCol)
        }
        state.colsListIndex = (state.colsListIndex + 1) % state.colsList.length
        state.cols = state.cols.slice(-3);

    } else if (action.type == "setProgress" && action.progress != null) {
        state.progress = action.progress;
    } else if (action.type == "addProgress" && action.progress != null) {
        state.progress += action.progress;
        if (state.progress > 100) {
            state.progress = state.progress % 100;
            state = stepColour(state, {type: "addColour"})
        }
    } else if (action.type == "updateColsList" && action.newColsList != null) {
        state.colsList = action.newColsList;
    }

    return state
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

export default function BreathingThing() {

    const [state, updateState] = useReducer(stepState, initialState);
    const [colsInfo, updateColour] = useReducer(stepColour,
        {cols: ["rgb(255, 240, 160)", "rgb(210, 230, 170)", "rgb(180, 220, 180)"],
        progress:0, colsListIndex: 0,
            // colsList: ["rgb(255, 255, 255)", "rgb(0,0,0)"]}
        colsList: [
            "rgb(255, 240, 160)",  // Yellow (soft)
            "rgb(210, 230, 170)",  // Yellow → Pale Green (blend)
            "rgb(180, 220, 180)",  // Pale Green
            "rgb(100, 170, 130)",  // Pale → Dark Green (blend)
            "rgb(60, 120, 80)",    // Dark Green
            "rgb(110, 160, 200)",  // Green → Light Blue (blend)
            "rgb(160, 200, 240)",  // Light Blue
            "rgb(90, 100, 180)",   // Blue → Purple (blend leaning purple)
            "rgb(150, 120, 200)"
        ]}
    )

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
    useEffect(() => {
        const intervalId = setInterval(() => {
            updateColour({type: "addProgress", progress: 1})
        }, 50)
        return () => clearInterval(intervalId);
    }, [colsInfo]);

    useEffect(() => {
        updateColour({type: "updateColsList", newColsList: getColours(state.timerState)})
    }, [state.timerState])

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
        <div style={{
            backgroundImage: `radial-gradient(in oklch circle, 
                    ${colsInfo.cols[2]} ${colsInfo.progress-100}%, 
                    ${colsInfo.cols[1]} ${colsInfo.progress}%, 
                    ${colsInfo.cols[0]} ${colsInfo.progress+100}%)`
        }}
             className="flex flex-1 justify-center transition duration-3000 ease-in-out">
            <div className="flex items-center">
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
            </div>
        </div>
    )
}


// export default function WimHof() {
//
//     const [backgroundColour, setBackgroundColour] = useState("rgb(255, 240, 160)");
//
//     return (
//         <div style={{backgroundColor: backgroundColour}}
//              className="flex flex-1 justify-center transition duration-3000 ease-in-out">
//             <div className="flex items-center">
//                 <BreathingThing />
//             </div>
//         </div>
//     );
// }
