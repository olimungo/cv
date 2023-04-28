import React from 'react';
import { CenteredContainer } from '../centered-container';
import { Tag } from '../tag';
import { Panel } from '../panel';
import { Card } from '../card';
import { CardSkills } from '../card-skills';

export function EcFirstPartCareerPanel(props: { className?: string }) {
    const { className = '' } = { ...props };

    return (
        <div className={`${className} flex justify-center`}>
            <Panel className="w-full p-12">
                <CenteredContainer className="flex flex-col items-center md:flex-row">
                    <div className="text-md text-fuchsia-100 md:text-2xl">
                        <div className="mb-5">
                            Back at the European Commission as an Official
                            agent.
                            <Tag label="2001-2012" className="ml-3" />
                        </div>

                        <div className="mb-5">
                            I started in EuropeAid (now INTPA). My job was to
                            improve a local financial system used back then to
                            monitor the European budget allocated for
                            sustanaible developement of emerging countries
                            (CRIS). I had to travel to a few European
                            Delegations around the world to train end-users to
                            use CRIS.
                        </div>

                        <div className="mb-5">
                            I also had the opportunity to work for the PMO and
                            DIGIT where my assignments were to maintain and
                            improve the sickness insurance IT system: Assmal.
                            Then, the decision was taken to rewrite it from
                            scratch using new technologies. It was my first
                            experience working with a team of around 10 people.
                            Surprisingly, the new project was called Assmal2.
                        </div>
                    </div>

                    <Card className="reveal-left mt-12 shrink-0 md:ml-10 md:mt-0 md:w-min">
                        <CardSkills
                            role="Analyst/Software developer"
                            skillsAcquired={[
                                'Adobe ColdFusion',
                                'Adobe Flex/Flash',
                                'WebLogic',
                                'Java',
                                'JavaScript',
                                'Ant',
                                'ClearCase/ClearQuest',
                                'Atlassian Jira/Confluence',
                                'Scrum (Agile methodology)',
                            ]}
                        />
                    </Card>
                </CenteredContainer>
            </Panel>
        </div>
    );
}
