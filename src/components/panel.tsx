import React from 'react';
import { PropsWithChildren } from 'react';

interface PanelProps {
    className?: string;
}

export function Panel(props: PropsWithChildren<PanelProps>) {
    const { className = '', children } = { ...props };

    return (
        <div className={`${className} flex justify-center bg-dark-space`}>
            {children}
        </div>
    );
}
