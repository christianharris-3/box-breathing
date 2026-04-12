'use client';

// import {Link} from "react-router-dom";
import Link from "next/link";


// TODO (wimhof):
// [ ] hold breathing button
// [ ] add end screen
// [ ] menu bar for progress + back button
// [ ] improve animations
// [ ] change breathing to separate page with get or use local storage?

export default function Home() {

    return (
        <div className="flex flex-col flex-1 items-center justify-center font-sans bg-green-300 text-gray-800">
            <main className="flex flex-col items-center justify-center w-full max-w-3xl py-32 px-16">
                <h1 className="font-semibold text-4xl">
                    Breathing
                </h1>
                <div className="flex gap-4 mt-3.5">
                    <Link href="/box" className="px-6 py-3 rounded-2xl font-medium bg-blue-300 hover:bg-blue-400 transition shadow-md">
                        box Breathing
                    </Link>
                    <Link href="/wimhof" className="px-6 py-3 rounded-2xl font-medium bg-blue-300 hover:bg-blue-400 transition shadow-md">
                        Wim Hof Breathing
                    </Link>
                </div>
            </main>
        </div>
    );
}
