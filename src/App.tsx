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
    Rocket,
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

        setMarginTopFirstPanel();

        const beep = document.getElementById('beep') as HTMLAudioElement;

        if (beep) {
            setSoundBeep(beep);
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

    // Animate elements on the page
    useEffect(() => {
        if (mainElement && revealElements) {
            const onscroll = () => {
                for (const element of revealElements) {
                    const windowHeight = window.innerHeight;
                    const elementTop = element.getBoundingClientRect().top;
                    const elementVisible = 400;

                    if (elementTop < windowHeight - elementVisible) {
                        element.classList.add('active');
                    } else {
                        element.classList.remove('active');
                    }
                }
            };

            let delaySet = 0;

            const onresize = () => {
                clearTimeout(delaySet);

                delaySet = setTimeout(() => {
                    setMarginTopFirstPanel();
                }, 100);
            };

            mainElement.addEventListener('scroll', onscroll);
            window.addEventListener('resize', onresize);

            return () => {
                mainElement.removeEventListener('scroll', onscroll);
                window.removeEventListener('resize', onresize);
            };
        }
    }, [mainElement, revealElements]);

    const setMarginTopFirstPanel = () => {
        const introCareerPanel = document.getElementById('intro-career-panel');
        const hero = document.getElementById('hero');

        if (introCareerPanel && hero) {
            const windowHeight = window.innerHeight;
            // Make sure that the first panel is not visible, independently of the
            // devices' height
            introCareerPanel.style.marginTop =
                windowHeight - hero.clientHeight + 50 + 'px';
        }
    };

    const startAnimatingCatchPhrase = () => {
        const flipItems = document.getElementsByClassName('flip-item');

        for (const item of flipItems) {
            item.classList.add('active');
        }
        setTimeout(() => {
            signal.emit(startHeroAnimation);
        }, 3000);

        if (soundBeep) {
            setInterval(() => {
                if (!mutedRef.current && !document.hidden) {
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

            <div id="hero">
                <Hero />
            </div>

            <div id="intro-career-panel">
                <IntroCareerPanel />
            </div>

            <Connector />

            <BachelorCareerPanel />

            <Rocket />

            <StartCareerPanel />

            <Connector />

            <PrivateSectorCareerPanel />

            <div className="self-center opacity-50">
                <img
                    className="white reveal-top my-12 w-[300px] self-center md:my-40 md:w-[800px]"
                    srcSet="assets/pioneer.webp"
                    alt="illustration on the Pioneer plaque"
                />
            </div>

            <TrueQuestion />

            <div className="self-center opacity-20">
                <img
                    className="white reveal-top my-12 w-[250px] md:my-40 md:w-[500px]"
                    srcSet="assets/iss.webp"
                    alt="illustration of the Internation Space Station"
                />
            </div>

            <BankingSectorCareerPanel />

            <div className="self-center opacity-20">
                <img
                    className="white reveal-top my-12 w-[250px] md:my-16 md:w-[400px]"
                    srcSet="assets/james-webb.webp"
                    alt="illustration of the James Webb telescope"
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
