import React, { useEffect, useState } from 'react';
import { PropsWithChildren } from 'react';

type Color = 'purple' | 'blue';
interface CardProps {
    className?: string;
}

export function Card(props: PropsWithChildren<CardProps>) {
    const { className = '', children } = props;

    return (
        <div
            className={`${className} text-md max-w-sm self-center rounded-md border-4 border-accent-secondary bg-dark-space shadow-glow sm:max-w-xl md:max-w-2xl lg:max-w-4xl xl:max-w-6xl`}
        >
            {children}
        </div>
    );
}
