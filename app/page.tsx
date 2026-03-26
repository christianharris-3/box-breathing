function AnimatedBox() {
    return (
        <div className="box-breathing-container">
            <div className="top-text">Top Text</div>
            <div className="middle-row">
                <div className="left-text content">Left Text</div>
                <div className="box">
                    <span className="background-line top"></span>
                    <span className="slider-line top"></span>
                    <span className="background-line right"></span>
                    <span className="slider-line right"></span>
                    <span className="background-line bottom"></span>
                    <span className="slider-line bottom"></span>
                    <span className="background-line left"></span>
                    <span className="slider-line left"></span>

                    <div className="content">Hello</div>
                </div>
                <div className="right-text">Right Text</div>
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
