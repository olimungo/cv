import React, { useEffect, useState } from 'react';
import { PropsWithChildren } from 'react';

interface ButtonProps {
    className?: string;
    color?: 'purple' | 'blue';
    onClick?: () => void;
}

export function Button(props: PropsWithChildren<ButtonProps>) {
    const defaultHandler = () => {};
    const { className = '', children, color, onClick = defaultHandler } = props;

    const [internalClassName, setInternalClassName] = useState('round-button');

    useEffect(() => {
        if (color && color === 'blue') {
            setInternalClassName('round-button-blue');
        }
    }, [color]);

    return (
        <button
            className={`${className} ${internalClassName} px-3 py-1 text-fuchsia-200 md:px-5 md:py-2`}
            onClick={onClick}
        >
            <div className="flex items-center justify-center">{children}</div>
        </button>
    );
}
