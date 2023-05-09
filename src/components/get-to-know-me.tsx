import React from 'react';

export function GetToKnowMe() {
    return (
        <div className="flip-container mt-24 flex justify-center text-2xl font-bold tracking-wide text-fuchsia-200 md:mt-44 md:text-3xl">
            <div className="flip-item">WAIT FOR IT!</div>

            <div className="flip-item">GET TO KNOW ME</div>

            <div className="flip-item flex">
                <img
                    className="inline w-5 animate-ping md:w-6"
                    srcSet="assets/chevrons.svg"
                    alt="icon chevron down"
                />

                <div className="mx-3 ">SCROLL DOWN</div>

                <img
                    className="inline w-5 animate-ping md:w-6"
                    srcSet="assets/chevrons.svg"
                    alt="icon chevron down"
                />
            </div>
        </div>
    );
}
