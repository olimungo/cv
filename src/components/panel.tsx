import React from 'react';
import { PropsWithChildren } from 'react';

export function Panel(props: PropsWithChildren) {
    const { children } = { ...props };

    return (
        <div className="flex items-center justify-center bg-dark-space">
            {children}
        </div>
    );
}
