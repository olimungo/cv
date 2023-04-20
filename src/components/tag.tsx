import React from 'react';

export function Tag(props: { label: string }) {
    const { label } = { ...props };

    return (
        <span className="tag mx-2 rounded-xl bg-ternary px-2 py-1 text-xs text-secondary md:text-base">
            {label}
        </span>
    );
}
