import React from 'react';

type Color = 'green' | 'orange';

export function Skill(props: {
    className?: string;
    value: number;
    label: string;
    color?: Color;
}) {
    const { className = '', value = 0, label = '', color = 'green' } = props;

    return (
        <div className={`${className} flex items-center`}>
            <div className="my-3 w-24 md:w-52">
                <div className="progress">
                    <div
                        className={`progress-bar ${
                            color === 'green'
                                ? 'bg-skill-green'
                                : 'bg-skill-orange'
                        }`}
                        style={{ width: value + '%' }}
                    ></div>
                </div>
            </div>

            <div
                className="ml-5 text-sm text-fuchsia-50 md:text-base"
                dangerouslySetInnerHTML={{ __html: label }}
            ></div>
        </div>
    );
}
