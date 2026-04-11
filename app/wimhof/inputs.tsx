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
        <div className="text-gray-800 font-semibold">
            <div className="text-5xl text-bold">
                Wim-Hof Breathing
            </div>
            <div>
                Breath Count Per Round: {breathingCountPerRound}
                <input type="range" min="10" max="60" defaultValue={breathingCountPerRound}
                       onChange={event => setBreathingCountPerRound(parseInt(event.target.value))}/>
            </div>
            <div>
                Recovery Time: {recoveryTime}s
                <input type="range" min="5" max="30" defaultValue={recoveryTime}
                       onChange={event => setRecoveryTime(parseInt(event.target.value))}/>
            </div>
            <div>
                Breathing Rate: {breathingRate} (Breaths/Minute)
                <input type="range" min="10" max="40" defaultValue={breathingRate}
                       onChange={event => setBreathingRate(parseInt(event.target.value))}/>
            </div>

            <div>
                {holdDurations.map((value, index) => (
                    <div key={index} className="m-4 bg-blue-300">
                        <input type="number" defaultValue={Math.floor(value / 60)} min="0" max="99"
                               onChange={event => editDuration(event.target.value, index, false)}/>
                        :
                        <input type="number" defaultValue={Math.floor(value % 60)} min="0" max="59"
                               onChange={event => editDuration(event.target.value, index, true)}/>
                        <button onClick={() => deleteDuration(index)}>
                            X
                        </button>
                    </div>
                ))}
            </div>
            <button className="px-3 py-3 rounded-2xl font-semibold bg-blue-300 hover:bg-blue-400 transition shadow-md" onClick={addDuration}>New</button>

            <button className="px-3 py-3 rounded-2xl font-semibold bg-blue-300 hover:bg-blue-400 transition shadow-md"
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