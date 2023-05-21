import React from 'react';

export function ToTheMoon(props: { className?: string }) {
    const { className = '' } = props;

    return (
        <div
            className={`${className} relative flex h-[40rem] flex-col items-center overflow-hidden bg-gradient-to-b from-dark-space to-slate-950 md:h-[50rem]`}
        >
            <div className="absolute top-64 text-3xl font-medium text-fuchsia-200 opacity-50 md:top-72 md:text-5xl">
                Get in touch...
            </div>

            <div className="planet two"></div>
        </div>
    );
}
