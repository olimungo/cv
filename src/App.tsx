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
                    const elementVisible = 300;
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
            {/* <Intro onClick={startAnimatingCatchPhrase} /> */}

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

                    <Card className="reveal-left mt-12 md:mt-0">
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

                <Card className="reveal-left mt-12">
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

                <Card className="reveal-top mt-12 md:ml-10 md:mt-0">
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

            {/* <div className="flex h-96 items-center justify-center bg-dark-space">
                <div className="round-button mb-3 p-3 text-fuchsia-200">
                    ACCEPT GDPR
                </div>
            </div> */}

            {/* <div className="text-md mx-56 my-20 rounded-md bg-slate-900 p-5 p-5 shadow-glow">
                <div className="flex">
                    <div>
                        <div className="">SKILLS ACQUIRED</div>
                        <div className="ml-5 mt-2 text-violet-50">Python</div>
                        <div className="ml-5 text-violet-50">
                            Micropython for IoT
                        </div>
                        <div className="ml-5 text-violet-50">Rust</div>
                        <div className="ml-5 text-violet-50">React</div>
                        <div className="ml-5 text-violet-50">HTML canvas</div>
                        <div className="ml-5 text-violet-50">TailwindCSS</div>
                    </div>
                </div>
            </div> */}

            {/* <div className="absolute right-[-3rem] top-52">
                    <img src="./illo-cpu-new.webp" alt="" width="600" />
                </div> */}

            {/* <div style="margin-bottom: 160rem"></div> */}

            <h1 className="my-16 self-center rounded-md  px-5 py-2 text-2xl md:my-32 md:text-4xl">
                To the Moon and beyond...
            </h1>
        </div>
    );
}
