import React, { Children, PropsWithChildren } from 'react';

interface CenteredContainerProps {
    className?: string;
}

export function CenteredContainer(
    props: PropsWithChildren<CenteredContainerProps>
) {
    const { className, children } = { ...props };

    return (
        <div className="flex w-full justify-center">
            <div className={`${className} w-full max-w-xs md:max-w-5xl`}>
                {children}
            </div>
        </div>
    );
}
