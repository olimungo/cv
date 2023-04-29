import React from 'react';
import { PropsWithChildren } from 'react';

interface RaisedCardProps {
    className?: string;
}

export function RaisedCard(props: PropsWithChildren<RaisedCardProps>) {
    const { className = '', children } = props;

    return (
        <div className={`${className} raised-card rounded-md bg-light-space`}>
            {children}
        </div>
    );
}
