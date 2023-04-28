import React from 'react';
import { CenteredContainer } from '../centered-container';
import { Tag } from '../tag';
import { Button } from '../button';
import { Panel } from '../panel';
import { Card } from '../card';
import { CardSkills } from '../card-skills';

export function BankingSectorCareerPanel(props: { className?: string }) {
    const { className = '' } = { ...props };

    return (
        <div className={`${className} flex justify-center`}>
            <Panel className="w-full p-12">
                <CenteredContainer className="flex flex-col items-center md:flex-row">
                    <div className="text-md text-fuchsia-100 md:text-2xl">
                        <div className="mb-5">
                            During the next years, I worked as a free-lancer for
                            the Banking sector and the European Commission.
                            <Tag label="1997-2001" className="ml-3" />
                        </div>

                        <div className="mb-5">
                            My assignments were mostly about Database
                            administration, the migration of the Euro currency
                            and adaptating applications for preventing the
                            2000-year bug.
                        </div>
                    </div>

                    <Card className="reveal-left mt-12 shrink-0 md:ml-10 md:mt-0 md:w-min xl:w-auto">
                        <CardSkills
                            role="Analyst/Software developer"
                            skillsAcquired={[
                                'Oracle Pro*Cobol',
                                'Visual Basic',
                                'PowerBuilder',
                            ]}
                        />
                    </Card>
                </CenteredContainer>
            </Panel>
        </div>
    );
}
