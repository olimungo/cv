import React from 'react';

export type ProgressValue =
    | 'ten'
    | 'twentyfive'
    | 'fifty'
    | 'seventyfive'
    | 'eighty'
    | 'ninety'
    | 'onehundred';

export function ProgressBar(props: { label?: string; value: ProgressValue }) {
    const { label, value } = { ...props };

    return (
        <div className="flex items-center">
            <div className="my-3 w-52">
                <div className="progress">
                    <div className={`progress-bar ${value}`}></div>
                </div>
            </div>
            <div className="ml-3 text-fuchsia-200">{label}</div>
        </div>
    );
}
