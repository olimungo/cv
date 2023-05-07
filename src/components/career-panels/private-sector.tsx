import React from 'react';
import { CenteredContainer } from '../centered-container';
import { Tag } from '../tag';
import { Button } from '../button';
import { Panel } from '../panel';
import { Card } from '../card';
import { CardSkills } from '../card-skills';

export function PrivateSectorCareerPanel(props: { className?: string }) {
    const { className = '' } = props;

    return (
        <div className={`${className} flex justify-center`}>
            <Panel className="w-full p-12 text-lg md:text-2xl">
                <CenteredContainer className="flex flex-col items-center md:flex-row">
                    <div className="text-fuchsia-100">
                        <div className="mb-5">
                            Then I switched to the private sector as an employee
                            for CANAL+ Belgique.
                            <Tag label="1995-1997" className="ml-3" />
                        </div>

                        <div className="mb-5">
                            I had to develop modules for the digital
                            transformation, maintain existing applications and
                            collaborate with other branches of the CANAL+ group
                            (France and Poland).
                        </div>
                    </div>

                    <Card className="reveal-left mt-12 w-72 shrink-0 md:ml-10 md:mt-0">
                        <CardSkills
                            role="Analyst/Software developer"
                            skillsAcquired={[
                                'Oracle*Forms 3',
                                'Oracle Forms 4.5',
                                'Oracle PL/SQL',
                                'BusinessObjects',
                            ]}
                        />
                    </Card>
                </CenteredContainer>
            </Panel>
        </div>
    );
}
