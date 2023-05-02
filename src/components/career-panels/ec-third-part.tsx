import React from 'react';
import { CenteredContainer } from '../centered-container';
import { Panel } from '../panel';
import { Card } from '../card';
import { CardSkills } from '../card-skills';
import { RaisedCard } from '../raised-card';

export function EcThirdPartCareerPanel(props: { className?: string }) {
    const { className = '' } = props;

    return (
        <div className={`${className} flex justify-center`}>
            <Panel className="w-full p-12">
                <CenteredContainer className="flex flex-col items-center">
                    <div className="text-md text-fuchsia-100 md:text-2xl">
                        <div className="mb-5">
                            I'm in OIB for about 8 years now (as of mid-2023).
                            In my portfolio, there are IT systems related to
                            operational and logistics operations
                            <div className="py-8 pl-8 md:pl-16">
                                <Domain
                                    image="document"
                                    label="Historical Archives of the Commission"
                                />
                                <Domain
                                    image="bike"
                                    label="Mobility (to recover commuting expenses)"
                                />
                                <Domain
                                    image="cutlery"
                                    label="Catering (to order food and drinks for professional events)"
                                />
                                <Domain
                                    image="car-key"
                                    label="VIPs Transport Service and cars fleet management"
                                />
                                <Domain
                                    image="business-cards"
                                    label="Business cards"
                                />
                            </div>
                            My role is supported by a dedicated team of 12
                            professionals who work with me to ensure that these
                            systems operate efficiently and effectively.
                        </div>

                        <div className="">
                            I'm a Senior Assistant since 2019.
                        </div>
                    </div>

                    <Card className="reveal-top mt-12 w-min shrink-0">
                        <CardSkills
                            role="IT Project Manager"
                            skillsAcquired={[
                                'TypeScript',
                                'Angular',
                                'RxJs/NgRx',
                                'Tomcat',
                                'Docker',
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

function Domain(props: { label: string; image?: string }) {
    const { label, image = 'folder' } = props;

    return (
        <RaisedCard className="reveal-top mb-3 table rounded-md bg-dark-space px-6 py-4 md:mb-5 md:text-lg">
            <div className="flex items-center">
                <div className="mr-5">
                    <div className="h-12 w-12 rounded-full border p-3 md:h-14 md:w-14">
                        <img
                            className="purple"
                            srcSet={`assets/${image}.webp`}
                            alt={`icon ${image}`}
                        />
                    </div>
                </div>

                <div className="text-left">{label}</div>
            </div>
        </RaisedCard>
    );
}
