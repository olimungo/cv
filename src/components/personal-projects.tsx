import React from 'react';
import { CenteredContainer } from './centered-container';
import { Button } from './button';
import { SkewedPanel } from './skewed-panel';
import { RaisedCard } from './raised-card';

export function PersonalProjects(props: { className?: string }) {
    const { className = '' } = props;

    return (
        <SkewedPanel className={`${className} items-center py-16`}>
            <CenteredContainer className="flex flex-col text-lg text-fuchsia-200">
                <div className="gradient-soft items-center text-center text-2xl uppercase text-fuchsia-300">
                    PERSONAL PROJECTS
                </div>

                <div className="mt-12 text-lg text-fuchsia-100 md:text-xl">
                    As someone who enjoys delving into technical aspects, I
                    actively pursue various hobby projects on Github to further
                    enhance my skills and knowledge.
                </div>

                <div className="self-center">
                    <button
                        className="my-12 rounded-lg border border-fuchsia-200 px-3 py-1 shadow-2xl hover:bg-slate-900 active:relative active:left-[1px] active:top-[1px] active:bg-slate-800 md:my-20 md:px-5 md:py-3"
                        onClick={() =>
                            window.open('https://github.com/olimungo', '_blank')
                        }
                    >
                        <div className="flex items-center">
                            <img
                                className="w-10 md:w-16"
                                srcSet="assets/github.svg"
                                alt="icon github"
                            />

                            <div className="ml-3 mr-1 text-fuchsia-200 md:text-xl">
                                Personal projects hosted on GitHub
                            </div>

                            <img
                                className="pink relative top-[1px] h-3 -rotate-90"
                                srcSet="assets/chevron.png"
                                alt="icon chevron right"
                            />
                        </div>
                    </button>
                </div>

                <div className="md:mx-40">
                    <CardElement
                        title="Asteroids"
                        description="A reboot of the famous video game from 1979.
                    3 implementations: in Java, TypeScript and Rust."
                        url="https://olimungo.github.io/asteroids/"
                    />

                    <CardElement
                        title="Game of life"
                        description="An implementation of John Conway's game of life for
                    comparing Rust and JavaScript performances in the
                    browser."
                        url="https://game-of-life-9a203.web.app/"
                    />

                    <CardElement
                        title="Planning Poker"
                        description="For helping developers to etimate stories during a
                    Sprint planning, implemented with React and using the
                    Firebase service for hosting the data."
                        url="https://planning-poker-af648.web.app/"
                    />

                    <CardElement
                        title="Moviepolis"
                        description="Use case for searching movies from the themoviedb.org
                    database, implemented with React."
                        url="https://moviepolis-647c7.web.app/"
                    />

                    <CardElement
                        title="This project"
                        description="Using React, tailwindcss and signal-js."
                        url="https://github.com/olimungo/cv"
                    />
                </div>
            </CenteredContainer>
        </SkewedPanel>
    );
}

function CardElement(props: {
    title: string;
    description: string;
    url?: string;
}) {
    const { title, description, url } = props;
    return (
        <RaisedCard className="reveal-top my-9 items-center justify-center rounded-2xl p-8 md:my-12 md:rounded-3xl">
            <div className="">{title}</div>

            <div className="mb-4 text-left text-base md:text-xl">
                {description}
            </div>

            <Button
                className="mt-4 h-min md:mt-8"
                color="purple"
                onClick={() => window.open(url, '_blank')}
            >
                <div className="text-sm uppercase md:text-base">{title}</div>

                <img
                    className="pink relative ml-2 h-2 -rotate-90 md:top-[1px] md:h-2"
                    srcSet="assets/chevron.png"
                    alt="icon chevron right"
                />
            </Button>
        </RaisedCard>
    );
}
