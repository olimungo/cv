import React from 'react';

interface RocketProps {
    className?: string;
}

export function Rocket(props: { className?: string }) {
    const { className = '' } = props;

    return (
        <div
            id="move-shake-rocket"
            className={`${className} move-shake mt-80 flex flex-col self-center`}
        >
            <div id="rocket" className="liftoff">
                <img
                    className="relative mt-32 w-[200px] opacity-60 md:w-[300px]"
                    srcSet="assets/ariane-6.webp"
                    alt="illustration of the Ariane 6 space rocket"
                />

                <div className="absolute -bottom-16 -z-10 mx-3 flex -translate-x-3 rotate-180 justify-between gap-x-3 md:-translate-x-5 md:translate-y-12 md:gap-x-2">
                    <div className="flame-container">
                        <div className="red flame"></div>
                        <div className="orange flame"></div>
                        <div className="yellow flame"></div>
                    </div>

                    <div className="flame-container delay-75">
                        <div className="red flame"></div>
                        <div className="orange flame"></div>
                        <div className="yellow flame"></div>
                    </div>

                    <div className="flame-container delay-500">
                        <div className="red flame"></div>
                        <div className="orange flame"></div>
                        <div className="yellow flame"></div>
                    </div>
                </div>
            </div>
        </div>
    );
}
