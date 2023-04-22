import React, { useEffect, useRef, useState } from 'react';
import signal from 'signal-js';
import {
    Card,
    Hero,
    CardSkills,
    Paragraph,
    Intro,
    startAnimation,
    Panel,
    GetToKnowMe,
    Speaker,
    muteEvent,
    CenteredContainer,
    ProgressBar,
} from './components';
import data from './data.json';

export function App() {
    const [mainElement, setMainElement] = useState<HTMLElement>();
    const [revealElements, setRevealElement] = useState<Element[]>();
    const [soundBeep, setSoundBeep] = useState<HTMLAudioElement>();
    const [imageJamesWebbHref, setImageJamesWebbHref] = useState('');
    const [imageIssHref, setImageIssHref] = useState('');
    const [imagePioneerHref, setImagePioneerHref] = useState('');
    const [muted, setMuted] = useState(false);
    const mutedRef = useRef(muted);
    mutedRef.current = muted;

    // Load assets
    useEffect(() => {
        const soundBeepUrl = new URL('./assets/beep.mp3', import.meta.url);

        if (soundBeepUrl) {
            setSoundBeep(new Audio(soundBeepUrl.href));
        }

        const imageJamesWebbUrl = new URL(
            './assets/james-webb.png',
            import.meta.url
        );

        if (imageJamesWebbUrl) {
            setImageJamesWebbHref(imageJamesWebbUrl.href);
        }

        const imageIssUrl = new URL('./assets/iss.png', import.meta.url);

        if (imageIssUrl) {
            setImageIssHref(imageIssUrl.href);
        }

        const imagePioneerUrl = new URL(
            './assets/pioneer.png',
            import.meta.url
        );

        if (imagePioneerUrl) {
            setImagePioneerHref(imagePioneerUrl.href);
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
    }, []);

    // Check if sound is muted
    useEffect(() => {
        signal.on(muteEvent, (event: { muted: boolean }) => {
            setMuted(event.muted);
        });

        return () => signal.off(muteEvent);
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
        console.log('000');
        signal.emit(startAnimation);

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
            <Intro onClick={startAnimatingCatchPhrase} />

            <Speaker />

            <CenteredContainer>
                <Hero />

                <GetToKnowMe />
            </CenteredContainer>

            <img
                className="white reveal-top my-12 w-[300px] self-center md:my-40 md:w-[800px]"
                srcSet={imagePioneerHref}
                alt=""
            />

            <Panel className="py-12">
                <CenteredContainer>
                    <Paragraph
                        title={data.sections['strongback-retract'].title}
                        period={data.sections['strongback-retract'].period}
                        content={data.sections['strongback-retract'].content}
                    />
                </CenteredContainer>
            </Panel>

            <CenteredContainer className="py-12">
                <Paragraph
                    title={data.sections['startup'].title}
                    period={data.sections['startup'].period}
                    content={data.sections['startup'].content}
                />
            </CenteredContainer>

            <Panel className="py-12">
                <CenteredContainer className="flex flex-col md:flex-row">
                    <Paragraph
                        title={data.sections['liftoff'].title}
                        period={data.sections['liftoff'].period}
                        content={data.sections['liftoff'].content}
                    />

                    <Card className="reveal-left mt-12 md:ml-10 md:mt-0">
                        <CardSkills
                            role={data.sections['liftoff'].role}
                            skillsAcquired={
                                data.sections['liftoff']['skills-acquired']
                            }
                            technologiesUsed={
                                data.sections['liftoff']['technologies-used']
                            }
                        />
                    </Card>
                </CenteredContainer>
            </Panel>

            <img
                className="white my-16 w-[250px] self-center opacity-25 md:my-32 md:w-[500px]"
                srcSet={imageIssHref}
                alt=""
            />

            <CenteredContainer className="flex flex-col py-12">
                <Paragraph
                    title={data.sections['max-q'].title}
                    period={data.sections['max-q'].period}
                    content={data.sections['max-q'].content}
                />

                <Card className="reveal-right mt-12">
                    <CardSkills
                        role={data.sections['max-q'].role}
                        skillsAcquired={
                            data.sections['max-q']['skills-acquired']
                        }
                        technologiesUsed={
                            data.sections['max-q']['technologies-used']
                        }
                    />
                </Card>
            </CenteredContainer>

            <img
                className="white my-12 w-[250px] self-center opacity-25 md:my-16 md:w-[400px]"
                srcSet={imageJamesWebbHref}
                alt=""
            />

            <CenteredContainer className="flex flex-col py-12">
                <Paragraph
                    title={data.sections['meco'].title}
                    period={data.sections['meco'].period}
                    content={data.sections['meco'].content}
                />

                <Card className="reveal-top mt-12">
                    <CardSkills
                        role={data.sections['meco'].role}
                        skillsAcquired={
                            data.sections['meco']['skills-acquired']
                        }
                        technologiesUsed={
                            data.sections['meco']['technologies-used']
                        }
                    />
                </Card>
            </CenteredContainer>

            <CenteredContainer className="flex flex-col py-12 md:flex-row">
                <Paragraph
                    title={data.sections['fairing'].title}
                    period={data.sections['fairing'].period}
                    content={data.sections['fairing'].content}
                />

                <Card className="reveal-left mt-12 md:ml-10 md:mt-0">
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

            <Panel>
                <CenteredContainer className="flex flex-col py-12 md:flex-row">
                    <Paragraph
                        title={data.sections['entry'].title}
                        period={data.sections['entry'].period}
                        content={data.sections['entry'].content}
                    />

                    <Card className="reveal-left mt-12 md:ml-10 md:mt-0">
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
            </Panel>

            <Panel className="mt-12 flex-col items-center py-12">
                <div className="mb-10 text-2xl uppercase text-fuchsia-200">
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
