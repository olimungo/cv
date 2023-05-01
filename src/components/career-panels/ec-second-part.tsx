import React from 'react';
import { CenteredContainer } from '../centered-container';
import { Tag } from '../tag';
import { Panel } from '../panel';

export function EcSecondPartCareerPanel(props: { className?: string }) {
    const { className = '' } = props;

    return (
        <div className={`${className} flex justify-center`}>
            <Panel className="w-full p-12">
                <CenteredContainer className="flex flex-col items-center">
                    <div className="text-md text-fuchsia-100 md:text-2xl">
                        <div className="mb-5">
                            The second part of my career at the Commission has
                            been focused on working for DG COMP and OIB.
                            <Tag label="2012-today" className="ml-3" />
                        </div>

                        <div className="mb-5">
                            During my time at DG COMP, I worked as an IT Project
                            Manager, primarily focused on maintaining existing
                            IT systems. Due to the nature of this work,
                            confidentiality was of utmost importance, and I am
                            proud to say that I strictly adhered to the
                            professional code of conduct and ethics.
                        </div>
                    </div>
                </CenteredContainer>
            </Panel>
        </div>
    );
}
