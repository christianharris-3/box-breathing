import {useState} from "react";

export interface InputsType {
    breathingRate: number,
    holdDurations: Array<number>
    recoveryLength: number,
    breathCount: number
}

export function BreathingInputs({doneFunction}:{doneFunction: (arg0: InputsType)=>void}) {

    const [breathingRate, setBreathingRate] = useState(24);
    const [breathingCountPerRound, setBreathingCountPerRound] = useState(40);
    const [recoveryTime, setRecoveryTime] = useState(15);

    const [holdDurations, setHoldDurations] = useState<Array<number>>([90, 120, 150, 180]);

    function deleteDuration(index: number) {
        holdDurations.splice(index, 1)
        setHoldDurations(holdDurations);
    }
    function addDuration() {
        setHoldDurations([...holdDurations, (holdDurations.length+3)*30])
    }
    function editDuration(inputTime: string, index: number, isSeconds: boolean) {
        const timeNumber: number = parseInt(inputTime);
        if (timeNumber == null || isNaN(timeNumber)) return
        let newTime: number;
        if (isSeconds) {
            newTime = timeNumber + Math.floor(holdDurations[index] / 60)*60;
        } else {
            newTime = timeNumber*60 + holdDurations[index] % 60;
        }
        const copy = [...holdDurations];
        copy[index] = newTime;
        setHoldDurations(copy);
    }

    return (

        <div className="bg-blue-300 text-gray-800 font-semibold mt-10 h-full p-5 rounded-xl shadow-2xl">
            {/* Title */}
            <div className="text-4xl font-bold text-center">
                Wim-Hof Breathing
            </div>
            {/* Sliders */}
            <div className="mb-5">
                <div className="flex justify-between font-medium">
                    <span>Breath Count Per Round</span>
                    <span>{breathingCountPerRound}</span>
                </div>
                <input className="w-full accent-blue-500"
                       type="range" min="10" max="60" defaultValue={breathingCountPerRound}
                       onChange={event => setBreathingCountPerRound(parseInt(event.target.value))}/>
            </div>
            <div className="mb-5">
                <div className="flex justify-between font-medium">
                    <span>Recovery Time</span>
                    <span>{recoveryTime}s</span>
                </div>
                <input className="w-full accent-blue-500"
                       type="range" min="5" max="30" defaultValue={recoveryTime}
                       onChange={event => setRecoveryTime(parseInt(event.target.value))}/>
            </div>
            <div className="mb-5">
                <div className="flex justify-between font-medium">
                    <span>Breathing Rate (Breaths/Minute)</span>
                    <span>{breathingRate}</span>
                </div>
                <input className="w-full accent-blue-500"
                       type="range" min="10" max="40" defaultValue={breathingRate}
                       onChange={event => setBreathingRate(parseInt(event.target.value))}/>
            </div>
            {/* Hold Duration Inputs */}
            <div className="shadow-2xl rounded-2xl bg-blue-200 pt-2">
                {/*<div className="bg-green-400 w-full h-3 rounded-t-2xl"></div>*/}
                <span className="m-3"> Round Hold Durations </span>
                <div className="font-semibold">
                    {holdDurations.map((value, index) => (
                        <div key={index} className="flex justify-between m-2 bg-blue-300 items-center gap-3 p-1 pl-3 rounded-xl drop-shadow-sm">
                            <div>
                                <span>Duration </span>
                                <input className="text-right"
                                    type="number" defaultValue={Math.floor(value / 60)} min="0" max="99"
                                    onChange={event => editDuration(event.target.value, index, false)}/>
                                :
                                <input type="number" defaultValue={Math.floor(value % 60)} min="0" max="59"
                                       onChange={event => editDuration(event.target.value, index, true)}/>
                            </div>
                            <button className="mr-2 text-red-500 hover:text-red-700 font-bold"
                                onClick={() => deleteDuration(index)}>
                                ✕
                            </button>
                        </div>
                    ))}
                </div>
                <button className="p-1 pl-3 pr-3 m-2 mt-0 rounded-2xl font-semibold bg-blue-400 hover:bg-blue-500 transition shadow-md"
                        onClick={addDuration}>New</button>
            </div>
            {/* Complete Button */}
            <button className="px-3 py-3 mt-3 w-full rounded-2xl font-semibold bg-green-400 hover:bg-green-500 transition shadow-md"
                    onClick={() => doneFunction({
                        breathingRate: breathingRate,
                        holdDurations: holdDurations,
                        recoveryLength: recoveryTime,
                        breathCount: breathingCountPerRound
                    })}>
                Start
            </button>
        </div>
    )
}