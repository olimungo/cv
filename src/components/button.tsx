import React from 'react';
import { PropsWithChildren } from 'react';

export function Button(props: PropsWithChildren) {
    const { children } = { ...props };

    return (
        <button className="round-button px-3 py-2 text-fuchsia-200">
            {children}
        </button>
    );
}
