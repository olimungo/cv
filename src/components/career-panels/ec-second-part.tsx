import React from 'react';
import { CenteredContainer } from '../centered-container';
import { Tag } from '../tag';
import { Panel } from '../panel';
import { Card } from '../card';
import { CardSkills } from '../card-skills';

export function EcSecondPartCareerPanel(props: { className?: string }) {
    const { className = '' } = { ...props };

    return (
        <div className={`${className} flex justify-center`}>
            <Panel className="w-full p-12">
                <CenteredContainer className="flex flex-col items-center">
                    <div className="text-md text-fuchsia-100 md:text-2xl">
                        <div className="mb-5">
                            The second part of my career at the Commission has
                            been focused on working for COMP and OIB.
                            <Tag label="2012-today" className="ml-3" />
                        </div>

                        <div className="mb-5">
                            During my time at COMP, I worked as an IT Project
                            Manager, primarily focused on maintaining existing
                            IT systems. Due to the nature of this work,
                            confidentiality was of utmost importance, and I am
                            proud to say that I strictly adhered to the
                            professional code of conduct and ethics.
                        </div>

                        <div className="mb-5">
                            I'm in OIB for about 8 years now (as of mid-2023).
                            In my portfolio, there are IT systems related to
                            operational or logistics operations:
                            <ul className="list-disc py-8 pl-16">
                                <li className="mb-5">
                                    Historical Archives of the Commission
                                </li>
                                <li className="mb-5">
                                    Mobility (to recover commuting expenses)
                                </li>
                                <li className="mb-5">
                                    Catering (to order food and drinks for
                                    professional events)
                                </li>
                                <li className="mb-5">
                                    VIPs Transport Service and cars fleet
                                    management
                                </li>
                                <li>Business cards</li>
                            </ul>
                            My role is supported by a dedicated team of 12
                            professionals who work with me to ensure that these
                            systems operate efficiently and effectively.
                        </div>
                    </div>

                    <Card className="reveal-top mt-12 w-min shrink-0">
                        <CardSkills
                            role="IT Project Manager"
                            skillsAcquired={[
                                'TypeScript',
                                'Tomcat',
                                'Amazon Web Services (AWS)',
                                'PM<sup>2</sup> certification',
                                'PM<sup>2</sup> Practioneer',
                                'Agile@EC certificaton',
                                'Kanban (Agile methodology)',
                            ]}
                        />
                    </Card>
                </CenteredContainer>
            </Panel>
        </div>
    );
}
