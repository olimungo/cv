import React from 'react';
import { SkewedPanel } from './skewed-panel';
import { CenteredContainer } from './centered-container';

export function TrueQuestion(props: { className?: string }) {
    const { className = '' } = { ...props };

    return (
        <SkewedPanel className="py-12">
            <CenteredContainer className="flex flex-col justify-center text-xl text-fuchsia-100 md:flex-row md:text-2xl">
                <i>
                    The true question is not "Have we ever been to the Moon?"
                    <br />
                    ... but more "What color is the flag?"
                </i>
            </CenteredContainer>
        </SkewedPanel>
    );
}
