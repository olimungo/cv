import React, { Children, PropsWithChildren } from 'react';

interface CenteredContainerProps {
    className?: string;
}

export function CenteredContainer(
    props: PropsWithChildren<CenteredContainerProps>
) {
    const { className = '', children } = props;

    return (
        <div className="flex justify-center">
            <div
                className={`${className} w-full max-w-xs sm:max-w-xl md:max-w-2xl lg:max-w-4xl xl:max-w-6xl`}
            >
                {children}
            </div>
        </div>
    );
}
