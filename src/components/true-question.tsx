import React from 'react';
import { SkewedPanel } from './skewed-panel';
import { CenteredContainer } from './centered-container';

export function TrueQuestion(props: { className?: string }) {
    const { className = '' } = props;

    return (
        <SkewedPanel className="py-12">
            <CenteredContainer className="flex justify-center text-xl text-fuchsia-100 md:text-2xl">
                <img
                    className="pink relative bottom-1 mr-2 h-8 md:bottom-2 md:mr-4 md:h-16"
                    srcSet="assets/quote.png"
                />
                <i>
                    The true question is not "Have we ever been to the Moon?"
                    <br />
                    ... but more "What color is the flag?"
                </i>
            </CenteredContainer>
        </SkewedPanel>
    );
}
