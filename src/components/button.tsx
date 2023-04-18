import React, { useEffect, useState } from 'react';
import { PropsWithChildren } from 'react';

interface ButtonProps {
    color?: 'purple' | 'blue';
    onClick?: () => void;
}

export function Button(props: PropsWithChildren<ButtonProps>) {
    const defaultHandler = () => {};
    const { children, color, onClick = defaultHandler } = { ...props };

    const [className, setClassName] = useState('round-button');

    useEffect(() => {
        if (color && color === 'blue') {
            setClassName('round-button-blue');
        }
    }, [color]);

    return (
        <button
            className={`${className} px-5 py-2 text-fuchsia-200`}
            onClick={onClick}
        >
            {children}
        </button>
    );
}
