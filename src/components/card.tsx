import React from 'react';
import { PropsWithChildren } from 'react';

interface CardProps {
    className?: string;
}

export function Card(props: PropsWithChildren<CardProps>) {
    const { className, children } = { ...props };

    return (
        <div
            className={`${className} text-md self-center rounded-xl bg-dark-space p-4 shadow-glow`}
        >
            {children}
        </div>
    );
}
