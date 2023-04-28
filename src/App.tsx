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
    IntroCareerPanel,
    BachelorCareerPanel,
    StartCareerPanel,
    Connector,
    PrivateSectorCareerPanel,
    TrueQuestion,
    BankingSectorCareerPanel,
    EcFirstPartCareerPanel,
    EcSecondPartCareerPanel,
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

            <Connector />

            <PrivateSectorCareerPanel />

            <img
                className="white reveal-top my-12 w-[300px] self-center md:my-40 md:w-[800px]"
                srcSet="assets/pioneer.png"
                alt=""
            />

            <TrueQuestion />

            <img
                className="white my-12 w-[250px] self-center opacity-25 md:my-40 md:w-[500px]"
                srcSet="assets/iss.png"
                alt=""
            />

            <BankingSectorCareerPanel />

            <img
                className="white my-12 w-[250px] self-center opacity-25 md:my-16 md:w-[400px]"
                srcSet="assets/james-webb.png"
                alt=""
            />

            <EcFirstPartCareerPanel />

            <Connector />

            <EcSecondPartCareerPanel />

            <Connector />

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
