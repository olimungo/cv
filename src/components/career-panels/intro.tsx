import React from 'react';
import { SkewedPanel } from '../skewed-panel';
import { CenteredContainer } from '../centered-container';

export function IntroCareerPanel(props: { className?: string }) {
    const { className = '' } = { ...props };

    return (
        <div className={`${className} flex justify-center`}>
            <SkewedPanel>
                <CenteredContainer className="flex flex-col items-center md:flex-row">
                    <div className="text-md text-fuchsia-100 md:text-2xl">
                        <div className="mb-5">
                            I'm born in the early 1970's in Brussels, Belgium.
                        </div>

                        <div className="mb-5">
                            On the wall of my childhood bedroom, a poster of a
                            man - <i>Bruce McCandless</i> - floating around in a
                            chair. To me, one of the most iconic space picture.
                        </div>
                    </div>

                    <img
                        className="reveal-left mt-12 w-[150px] rounded-full md:ml-16 md:mt-0 md:w-[500px]"
                        srcSet="assets/mc-candless.png"
                        alt=""
                    />
                </CenteredContainer>
            </SkewedPanel>
        </div>
    );
}
