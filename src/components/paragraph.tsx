import React from 'react';
import { Tag } from './tag';

export function Paragraph(props: {
    title: string;
    period?: string;
    content: string[];
    className?: string;
}) {
    const { className = '', title, content, period } = { ...props };

    return (
        <div className={`${className}`}>
            <div className="text-xl md:text-2xl">
                {title}

                {period && <Tag label={period} />}
            </div>

            <div className="text-md mt-5 text-violet-50 md:text-lg">
                {content.map((paragraph, index) => (
                    <div key={index} className="mt-4">
                        {paragraph}
                    </div>
                ))}
            </div>
        </div>
    );
}
