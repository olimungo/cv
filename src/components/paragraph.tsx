import React from 'react';
import { Tag } from './tag';

export function Paragraph(props: {
    period?: string;
    content: string[];
    className?: string;
}) {
    const { className = '', content, period } = { ...props };

    return (
        <div className={`${className}`}>
            <div className="text-md text-fuchsia-100 md:text-2xl">
                {content.map((paragraph, index) => (
                    <div
                        className="mb-5"
                        key={index}
                        dangerouslySetInnerHTML={{ __html: paragraph }}
                    ></div>
                ))}
            </div>
        </div>
    );
}
