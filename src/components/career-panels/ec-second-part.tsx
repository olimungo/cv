import React from 'react';
import { CenteredContainer } from '../centered-container';
import { Tag } from '../tag';
import { Panel } from '../panel';

export function EcSecondPartCareerPanel(props: { className?: string }) {
    const { className = '' } = props;

    return (
        <div className={`${className} flex justify-center`}>
            <Panel className="w-full p-12 text-lg md:text-2xl">
                <CenteredContainer className="flex flex-col items-center">
                    <div className="text-fuchsia-100">
                        <div className="mb-5">
                            The second part of my career at the Commission has
                            been focused on working for DG COMP and OIB. Since
                            then, my role changed from Senior software developer
                            to IT Project Manager.
                            <Tag label="2012-today" className="ml-3" />
                        </div>

                        <div className="mb-5">
                            During my time at DG COMP, my job was primarily
                            focused on maintaining existing IT systems managing
                            a team of 3 persons. Due to the nature of this work,
                            confidentiality was of utmost importance and I
                            strictly adhered to the professional code of conduct
                            and ethics.
                        </div>
                    </div>
                </CenteredContainer>
            </Panel>
        </div>
    );
}
