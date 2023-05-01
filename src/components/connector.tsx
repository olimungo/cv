import React from 'react';

export function Connector(props: { className?: string }) {
    const { className = '' } = props;

    return (
        <div
            className={`${className} my-4 flex flex-col items-center opacity-50 md:my-8`}
        >
            <Dot />
            <Line />
            <Dot />
            <Line />
            <Dot />
        </div>
    );
}

function Dot() {
    return (
        <div className="h-4 w-4 rounded-full border-2 border-ternary md:h-6 md:w-6 md:border-4"></div>
    );
}

function Line() {
    return (
        <div>
            <div className="h-4 border-r-2 border-ternary md:h-6 md:border-r-4"></div>
            <div className="h-4 border-l-2 border-ternary md:h-6 md:border-l-4"></div>
        </div>
    );
}
