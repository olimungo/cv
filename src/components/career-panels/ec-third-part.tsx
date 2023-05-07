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
            <Panel className="w-full p-12 text-lg md:text-2xl">
                <CenteredContainer className="flex flex-col items-center">
                    <div className="text-fuchsia-100">
                        <div className="mb-5">
                            I'm in OIB for about 8 years now (as of mid-2023).
                            In my portfolio, there are IT systems related to
                            operational and logistics operations
                            <div className="py-8">
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

                        <div>I'm a Senior Assistant since 2019.</div>

                        <div className="mt-5">
                            I hold the EC Project Management Methodology (PM
                            <sup>2</sup>) certification and have recently
                            obtained the PM
                            <sup>2</sup> Practitioner certification. These
                            certifications have equipped me with the knowledge
                            and skills to effectively manage projects, from
                            drafting Business Cases and Project Charters to
                            developing Project Handbooks.
                        </div>

                        <div className="mt-5">
                            In addition, I have contributed to the elaboration
                            of the budget and planning for the IT Master Plan,
                            ensuring that projects are aligned with
                            organizational goals and objectives. I also have
                            experience leading interviews when recruiting new
                            team members, which has allowed me to develop strong
                            interpersonal skills and the ability to assess
                            candidates effectively.
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
        <RaisedCard className="reveal-top mb-9 table w-full rounded-md px-6 py-4 md:mb-12 md:text-lg">
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
