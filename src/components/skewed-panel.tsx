import React from 'react';
import { PropsWithChildren } from 'react';

interface PanelProps {
    className?: string;
}

export function SkewedPanel(props: PropsWithChildren<PanelProps>) {
    const { className = '', children } = props;

    return (
        <div
            className={`${className} diagonal flex w-full justify-center bg-dark-space px-6 py-12 md:py-24`}
        >
            {children}
        </div>
    );
}
