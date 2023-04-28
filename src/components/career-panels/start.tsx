import React from 'react';
import { CenteredContainer } from '../centered-container';
import { Tag } from '../tag';
import { Button } from '../button';
import { Panel } from '../panel';
import { Card } from '../card';
import { CardSkills } from '../card-skills';

export function StartCareerPanel(props: { className?: string }) {
    const { className = '' } = { ...props };

    return (
        <div className={`${className} flex justify-center`}>
            <Panel className="w-full p-12">
                <CenteredContainer className="flex flex-col items-center md:flex-row">
                    <div className="text-md text-fuchsia-100 md:text-2xl">
                        <div className="mb-5">
                            My career started at the European Commission as a
                            contractual agent.
                            <Tag label="1993-1995" className="ml-3" />
                        </div>

                        <div className="mb-5">
                            My job was to maintain existing applications.
                        </div>
                    </div>

                    <Card className="reveal-left mt-12 shrink-0 md:ml-10 md:mt-0">
                        <CardSkills
                            role="Analyst/Programmer"
                            skillsAcquired={[
                                'Oracle',
                                'Pro*C',
                                'Accell/SQL (4GL)',
                            ]}
                        />
                    </Card>
                </CenteredContainer>
            </Panel>
        </div>
    );
}
