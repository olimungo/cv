import React, { useEffect, useRef, useState } from 'react';
import signal from 'signal-js';
import {
    Card,
    Hero,
    CardSkills,
    Paragraph,
    Intro,
    startHeroAnimation,
    Panel,
    GetToKnowMe,
    Speaker,
    speakerEventMuted,
    CenteredContainer,
    ProgressBar,
    SkewedPanel,
    Button,
    IntroCareerPanel,
    BachelorCareerPanel,
    StartCareerPanel,
    Connector,
} from './components';
import data from './data.json';
import { missionEventCompleted } from './hub/components/mission-events/mission-event';
import { MissionEventLabel } from './hub/components/mission-events/mission-events';

export function App() {
    const [waitForIt, setWaitForIt] = useState(true);
    const [mainElement, setMainElement] = useState<HTMLElement>();
    const [revealElements, setRevealElement] = useState<Element[]>();
    const [soundBeep, setSoundBeep] = useState<HTMLAudioElement>();
    const [muted, setMuted] = useState(false);
    const mutedRef = useRef(muted);
    mutedRef.current = muted;

    // Load assets
    useEffect(() => {
        const soundBeepUrl = new URL(
            '../static/assets/beep.mp3',
            import.meta.url
        );

        if (soundBeepUrl) {
            setSoundBeep(new Audio(soundBeepUrl.href));
        }
    }, []);

    // Get sections from the DOM
    useEffect(() => {
        const main = document.getElementById('main');

        if (main) {
            setMainElement(main);

            const revealsTop = document.getElementsByClassName('reveal-top');
            const revealsLeft = document.getElementsByClassName('reveal-left');
            const revealsRight =
                document.getElementsByClassName('reveal-right');

            setRevealElement([...revealsTop, ...revealsLeft, ...revealsRight]);
        }

        const firstPanel = document.getElementById('first-panel');

        if (firstPanel) {
            const windowHeight = window.innerHeight;

            // Make sure that the first panel is not visible independently of the
            // devices' height
            firstPanel.style.marginTop =
                windowHeight - firstPanel.offsetTop + 300 + 'px';
        }
    }, []);

    // Check if sound is muted
    useEffect(() => {
        signal.on(speakerEventMuted, (event: { muted: boolean }) => {
            setMuted(event.muted);
        });

        return () => signal.off(speakerEventMuted);
    }, []);

    // Check mission events for completion
    useEffect(() => {
        let timeoutLiftoff;

        signal.on(
            missionEventCompleted,
            (event: { label: MissionEventLabel; completed: boolean }) => {
                if (event.label === 'LIFTOFF') {
                    const rocket = document.getElementById('rocket');

                    if (rocket) {
                        if (event.completed) {
                            timeoutLiftoff = setTimeout(() => {
                                rocket.classList.add('active');
                            }, 1500);
                        } else {
                            clearTimeout(timeoutLiftoff);
                            rocket.classList.remove('active');
                        }
                    }
                }
            }
        );

        return () => signal.off(missionEventCompleted);
    }, []);

    useEffect(() => {
        if (mainElement && revealElements) {
            const onscroll = () => {
                for (let index = 0; index < revealElements.length; index++) {
                    const windowHeight = window.innerHeight;
                    const elementTop =
                        revealElements[index].getBoundingClientRect().top;
                    const elementVisible = 400;

                    if (elementTop < windowHeight - elementVisible) {
                        revealElements[index].classList.add('active');
                    } else {
                        revealElements[index].classList.remove('active');
                    }
                }
            };

            mainElement.addEventListener('scroll', onscroll);

            return () => {
                mainElement.removeEventListener('scroll', onscroll);
            };
        }
    }, [mainElement, revealElements]);

    const startAnimatingCatchPhrase = () => {
        setTimeout(() => {
            signal.emit(startHeroAnimation);
        }, 3000);

        if (soundBeep) {
            setInterval(() => {
                if (!mutedRef.current) {
                    soundBeep.volume = 0.005;
                    soundBeep.play().catch(() => {
                        /* ignore */
                    });
                }
            }, 15000);
        }
    };

    return (
        <div className="flex flex-col pb-60">
            {/* <Intro onClick={startAnimatingCatchPhrase} /> */}

            <Speaker />

            <CenteredContainer>
                <Hero />

                <GetToKnowMe />
            </CenteredContainer>

            <div id="first-panel">
                <IntroCareerPanel />
            </div>

            <img
                id="rocket"
                className="liftoff mt-20 w-[200px] self-center opacity-60 md:w-[300px]"
                srcSet="assets/ariane-6.png"
                alt=""
            />

            <BachelorCareerPanel />

            <Connector />

            <StartCareerPanel />

            <img
                className="white reveal-top my-12 w-[300px] self-center md:my-40 md:w-[800px]"
                srcSet="assets/pioneer.png"
                alt=""
            />

            <SkewedPanel className="py-12">
                <CenteredContainer className="flex flex-col justify-center text-xl text-fuchsia-100 md:flex-row md:text-2xl">
                    <i>
                        The true question is not "Have we ever been to the
                        Moon?"
                        <br />
                        ... but more "What color is the flag?"
                    </i>
                </CenteredContainer>
            </SkewedPanel>

            <img
                className="white my-16 w-[250px] self-center opacity-25 md:my-32 md:w-[500px]"
                srcSet="assets/iss.png"
                alt=""
            />

            <CenteredContainer className="flex flex-col py-12">
                <Paragraph
                    period={data.sections['fairing'].period}
                    content={data.sections['fairing'].content}
                />

                <Card className="reveal-right mt-12">
                    <CardSkills
                        role={data.sections['fairing'].role}
                        skillsAcquired={
                            data.sections['fairing']['skills-acquired']
                        }
                        technologiesUsed={
                            data.sections['fairing']['technologies-used']
                        }
                    />
                </Card>
            </CenteredContainer>

            <img
                className="white my-12 w-[250px] self-center opacity-25 md:my-16 md:w-[400px]"
                srcSet="assets/james-webb.png"
                alt=""
            />

            <CenteredContainer className="flex flex-col py-12">
                <Paragraph
                    period={data.sections['entry'].period}
                    content={data.sections['entry'].content}
                />

                <Card className="reveal-top mt-12">
                    <CardSkills
                        role={data.sections['entry'].role}
                        skillsAcquired={
                            data.sections['entry']['skills-acquired']
                        }
                        technologiesUsed={
                            data.sections['entry']['technologies-used']
                        }
                    />
                </Card>
            </CenteredContainer>

            <CenteredContainer className="flex flex-col py-12 md:flex-row">
                <Paragraph
                    period={data.sections['landing'].period}
                    content={data.sections['landing'].content}
                />

                <Card className="reveal-left mt-12 md:ml-10 md:mt-0">
                    <CardSkills
                        role={data.sections['landing'].role}
                        skillsAcquired={
                            data.sections['landing']['skills-acquired']
                        }
                        technologiesUsed={
                            data.sections['landing']['technologies-used']
                        }
                    />
                </Card>
            </CenteredContainer>

            <Panel>
                <CenteredContainer className="flex flex-col py-12 md:flex-row">
                    <Paragraph
                        period={data.sections['seco'].period}
                        content={data.sections['seco'].content}
                    />

                    <Card className="reveal-left mt-12 md:ml-10 md:mt-0">
                        <CardSkills
                            role={data.sections['seco'].role}
                            skillsAcquired={
                                data.sections['seco']['skills-acquired']
                            }
                            technologiesUsed={
                                data.sections['seco']['technologies-used']
                            }
                        />
                    </Card>
                </CenteredContainer>
            </Panel>

            <Panel className="mt-12 flex-col items-center py-12">
                <div className="mb-10 text-2xl uppercase text-fuchsia-300">
                    Recap skills
                </div>

                <CenteredContainer className="flex justify-center">
                    <div className="flex-col">
                        <ProgressBar label="HTML" value="ten" />
                        <ProgressBar label="SQL" value="twentyfive" />
                        <ProgressBar label="Oracle" value="fifty" />
                        <ProgressBar label="Java" value="seventyfive" />
                        <ProgressBar
                            label="JavaScript/TypeScript"
                            value="eighty"
                        />
                        <ProgressBar label="Rust" value="ninety" />
                        <ProgressBar label="Flash/Flex" value="onehundred" />
                    </div>

                    <div className="ml-20 flex-col">
                        <ProgressBar label="HTML" value="ten" />
                        <ProgressBar label="SQL" value="twentyfive" />
                        <ProgressBar label="Oracle" value="fifty" />
                        <ProgressBar label="Java" value="seventyfive" />
                        <ProgressBar
                            label="JavaScript/TypeScript"
                            value="eighty"
                        />
                        <ProgressBar label="Rust" value="ninety" />
                        <ProgressBar label="Flash/Flex" value="onehundred" />
                    </div>

                    <div>Senior Assistant</div>
                </CenteredContainer>
            </Panel>

            <CenteredContainer className="py-12 text-lg">
                <div className="mb-10 text-center text-2xl uppercase text-fuchsia-200">
                    Languages
                </div>

                <div className="mt-12 flex-col items-center py-12">
                    <div>French</div>
                    <div>Italian</div>
                    <div>English</div>
                    <div>Dutch</div>
                </div>
            </CenteredContainer>

            <Panel className="mt-12 flex-col items-center py-12">
                <div className="mb-10 text-2xl uppercase text-fuchsia-200">
                    Personal projects
                </div>

                <CenteredContainer className="text-lg">
                    <div>Github</div>
                    <div>Asteroids</div>
                    <div>Game of life</div>
                    <div>Planning Poker</div>
                </CenteredContainer>
            </Panel>

            <h1 className="my-16 self-center rounded-md  px-5 py-2 text-2xl md:my-32 md:text-4xl">
                To the Moon and beyond...
            </h1>
        </div>
    );
}
