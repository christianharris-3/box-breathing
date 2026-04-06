'use client';

import {useEffect, useState} from "react";
import AnimatedBox from "@/app/box/page";

function BreathingThing() {

    const [widthMul, setWidthMul] = useState(1)
    const [breathCount, setBreathCount] = useState(1)

    const squareSize = 250;

    // breaths per minute
    const breathingRate = 24;
    const totalBreathCount = 30;

    useEffect(() => {
        let frameId: number;

        const animate = (time: number) => {

            const breathProgress = (time/1000)/(60/breathingRate);

            if (breathProgress > totalBreathCount-0.5) {
                setWidthMul(Math.max((1-(((breathProgress-totalBreathCount+0.5)*2)**2)/2)*9/8, 0));
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
    }, []);

    return (
        <div className="relative text-gray-800 font-semibold">
            <div className="absolute top-1/2 left-1/2 -translate-1/2 ">
                Behind Text
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
