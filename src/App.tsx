import React, { useEffect, useState } from 'react';
import { Button, Card, Hero, Panel, CardSkills, Paragraph } from './components';
import data from './data.json';

export function App() {
    const [mainElement, setMainElement] = useState<HTMLElement>();
    const [revealElements, setRevealElement] = useState<Element[]>();

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

    return (
        <div className="flex flex-col pb-60">
            <Hero />

            <div className="mb-16 h-[23rem] "></div>

            <Paragraph
                title={data.sections['strongback-retract'].title}
                period={data.sections['strongback-retract'].period}
                content={data.sections['strongback-retract'].content}
            />

            <Paragraph
                title={data.sections['startup'].title}
                period={data.sections['startup'].period}
                content={data.sections['startup'].content}
            />

            <Paragraph
                title={data.sections['liftoff'].title}
                period={data.sections['liftoff'].period}
                content={data.sections['liftoff'].content}
            />

            <Card className="reveal-top mt-12">
                <CardSkills
                    role={data.sections['liftoff'].role}
                    skillsAcquired={data.sections['liftoff']['skills-acquired']}
                    technologiesUsed={
                        data.sections['liftoff']['technologies-used']
                    }
                />
            </Card>

            <Paragraph
                className="mt-28"
                title={data.sections['max-q'].title}
                period={data.sections['max-q'].period}
                content={data.sections['max-q'].content}
            />

            <Card className="reveal-left mt-12">
                <CardSkills
                    role={data.sections['max-q'].role}
                    skillsAcquired={data.sections['max-q']['skills-acquired']}
                    technologiesUsed={
                        data.sections['max-q']['technologies-used']
                    }
                />
            </Card>

            <Paragraph
                className="mt-28"
                title={data.sections['meco'].title}
                period={data.sections['meco'].period}
                content={data.sections['meco'].content}
            />

            <Card className="reveal-right mt-12">
                <CardSkills
                    role={data.sections['meco'].role}
                    skillsAcquired={data.sections['meco']['skills-acquired']}
                    technologiesUsed={
                        data.sections['meco']['technologies-used']
                    }
                />
            </Card>

            <Paragraph
                className="mt-28"
                title={data.sections['fairing'].title}
                period={data.sections['fairing'].period}
                content={data.sections['fairing'].content}
            />

            <Card className="reveal-top mt-12">
                <CardSkills
                    role={data.sections['fairing'].role}
                    skillsAcquired={data.sections['fairing']['skills-acquired']}
                    technologiesUsed={
                        data.sections['fairing']['technologies-used']
                    }
                />
            </Card>

            <Paragraph
                className="mt-28"
                title={data.sections['fairing'].title}
                period={data.sections['fairing'].period}
                content={data.sections['fairing'].content}
            />

            <Card className="reveal-left mt-12">
                <CardSkills
                    role={data.sections['fairing'].role}
                    skillsAcquired={data.sections['fairing']['skills-acquired']}
                    technologiesUsed={
                        data.sections['fairing']['technologies-used']
                    }
                />
            </Card>

            <Paragraph
                className="mt-28"
                title={data.sections['entry'].title}
                period={data.sections['entry'].period}
                content={data.sections['entry'].content}
            />

            <Card className="reveal-right mt-12">
                <CardSkills
                    role={data.sections['entry'].role}
                    skillsAcquired={data.sections['entry']['skills-acquired']}
                    technologiesUsed={
                        data.sections['entry']['technologies-used']
                    }
                />
            </Card>

            {/* <Panel>
                <Button>OK</Button>
            </Panel> */}

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

            <h1 className="m-8 mt-16 text-xl">To Jupiter and beyond...</h1>
        </div>
    );
}
