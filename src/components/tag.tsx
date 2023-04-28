import React, { PropsWithChildren, useEffect, useState } from 'react';

type Type = 'rounded' | 'rounded-xl';
type Color = 'ternary' | 'primary' | 'accent';

export function Tag(props: {
    className?: string;
    type?: Type;
    color?: Color;
    label: string;
}) {
    const {
        className = '',
        type = 'rounded-xl',
        color = 'ternary',
        label,
    } = { ...props };

    return (
        <span
            className={`${type} bg-${color} ${className} tag whitespace-nowrap px-3 py-1 text-xs text-secondary md:text-base`}
            dangerouslySetInnerHTML={{ __html: label }}
        ></span>
    );
}
