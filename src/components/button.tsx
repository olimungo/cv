import React, { useEffect, useState } from 'react';
import { PropsWithChildren } from 'react';

interface ButtonProps {
    className?: string;
    color?: 'purple' | 'blue';
    onClick?: () => void;
}

export function Button(props: PropsWithChildren<ButtonProps>) {
    const defaultHandler = () => {};
    const {
        className = '',
        children,
        color,
        onClick = defaultHandler,
    } = { ...props };

    const [internalClassName, setInternalClassName] = useState('round-button');

    useEffect(() => {
        if (color && color === 'blue') {
            setInternalClassName('round-button-blue');
        }
    }, [color]);

    return (
        <button
            className={`${className} ${internalClassName} px-5 py-2 text-fuchsia-200`}
            onClick={onClick}
        >
            <div className="flex items-center justify-center">{children}</div>
        </button>
    );
}
