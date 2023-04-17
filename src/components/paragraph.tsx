import React from 'react';
import { Tag } from './tag';

export function Paragraph(props: {
    title: string;
    period?: string;
    content: string[];
    className?: string;
}) {
    const { className, title, content, period } = { ...props };

    return (
        <div className={`${className} m-8 ml-8`}>
            <div className="text-xl">
                {title}

                {period && <Tag label={period} />}
            </div>

            <div className="text-md mt-5 text-violet-50">
                {content.map((paragraph, index) => (
                    <div key={index} className="mt-4">
                        {paragraph}
                    </div>
                ))}
            </div>
        </div>
    );
}
