import React from 'react';

export function ToTheMoon(props: { className?: string }) {
    const { className = '' } = props;

    return (
        <div
            className={`${className} reveal-top relative mt-36 flex justify-center`}
        >
            <img
                className="w-[300px] opacity-20 md:w-[600px]"
                srcSet="assets/moon.webp"
                alt="illustration of the moon"
            />

            <h1 className="absolute bottom-12 px-6 py-1 text-3xl tracking-widest text-fuchsia-100 opacity-80 md:bottom-20 md:text-5xl">
                Back to the Moon!
            </h1>
        </div>
    );
}
