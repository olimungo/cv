import React, { useEffect, useRef, useState } from 'react';
import signal from 'signal-js';
import {
    Hero,
    Intro,
    startHeroAnimation,
    Speaker,
    speakerEventMuted,
    IntroCareerPanel,
    BachelorCareerPanel,
    StartCareerPanel,
    Connector,
    PrivateSectorCareerPanel,
    TrueQuestion,
    BankingSectorCareerPanel,
    EcFirstPartCareerPanel,
    EcSecondPartCareerPanel,
    EcThirdPartCareerPanel,
    RecapSkills,
    Languages,
    PersonalProjects,
    ToTheMoon,
} from './components';
import { missionEventCompleted } from './hub/components/mission-events/mission-event';
import { MissionEventLabel } from './hub/components/mission-events/mission-events';

export function App() {
    const [mainElement, setMainElement] = useState<HTMLElement>();
    const [revealElements, setRevealElement] = useState<Element[]>();
    const [soundBeep, setSoundBeep] = useState<HTMLAudioElement>();
    const [muted, setMuted] = useState(false);
    const mutedRef = useRef(muted);
    mutedRef.current = muted;

    // Load assets
    useEffect(() => {
        const beep = document.getElementById('beep') as HTMLAudioElement;

        if (beep) {
            setSoundBeep(beep);
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
                windowHeight - firstPanel.offsetTop + 50 + 'px';
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
        signal.on(
            missionEventCompleted,
            (event: { label: MissionEventLabel; completed: boolean }) => {
                if (event.label === 'LIFTOFF') {
                    const rocket = document.getElementById('rocket');

                    if (rocket) {
                        if (event.completed) {
                            rocket.classList.add('active');
                        } else {
                            rocket.classList.remove('active');
                        }
                    }
                }

                if (event.label === 'STARTUP') {
                    const rocket = document.getElementById('move-shake-rocket');

                    if (rocket) {
                        if (event.completed) {
                            rocket.classList.add('active');
                        } else {
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
        }, 2000);

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
        <div className="flex flex-col pb-72">
            <audio id="beep" src="assets/beep.mp3" />

            <Intro onClick={startAnimatingCatchPhrase} />

            <Speaker />

            <Hero />

            <div id="first-panel">
                <IntroCareerPanel />
            </div>

            <Connector />

            <BachelorCareerPanel />

            <div id="move-shake-rocket" className="move-shake self-center">
                <img
                    id="rocket"
                    className="liftoff mt-32 w-[200px] opacity-60 md:w-[300px]"
                    srcSet="assets/ariane-6.webp"
                />
            </div>

            <StartCareerPanel />

            <Connector />

            <PrivateSectorCareerPanel />

            <div className="self-center opacity-50">
                <img
                    className="white reveal-top my-12 w-[300px] self-center md:my-40 md:w-[800px]"
                    srcSet="assets/pioneer.webp"
                />
            </div>

            <TrueQuestion />

            <div className="self-center opacity-20">
                <img
                    className="white reveal-top my-12 w-[250px] md:my-40 md:w-[500px]"
                    srcSet="assets/iss.webp"
                />
            </div>

            <BankingSectorCareerPanel />

            <div className="self-center opacity-20">
                <img
                    className="white reveal-top my-12 w-[250px] md:my-16 md:w-[400px]"
                    srcSet="assets/james-webb.webp"
                />
            </div>

            <EcFirstPartCareerPanel />

            <Connector />

            <EcSecondPartCareerPanel />

            <Connector />

            <EcThirdPartCareerPanel />

            <Connector />

            <PersonalProjects />

            <Connector />

            <RecapSkills />

            <Connector />

            <Languages />

            <ToTheMoon />
        </div>
    );
}
