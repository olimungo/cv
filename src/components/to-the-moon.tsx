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
            />

            <h1 className="absolute bottom-12 rounded-md text-xl tracking-wider text-fuchsia-200 md:bottom-24 md:text-4xl">
                To the Moon and beyond...
            </h1>
        </div>
    );
}
