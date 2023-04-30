import React from 'react';
import { Panel } from './panel';
import { CenteredContainer } from './centered-container';
import { Button } from './button';
import { SkewedPanel } from './skewed-panel';
import { RaisedCard } from './raised-card';

export function PersonalProjects(props: { className?: string }) {
    const { className = '' } = props;

    return (
        <SkewedPanel className={`${className} flex-col items-center py-16`}>
            <div className="gradient-soft text-2xl uppercase text-fuchsia-300">
                PERSONAL PROJECTS
            </div>

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
                        alt=""
                    />

                    <div className="ml-3 mr-1 text-fuchsia-200 md:text-xl">
                        Personal projects hosted on GitHub
                    </div>

                    <img
                        className="pink relative top-[1px] h-3 -rotate-90"
                        srcSet="assets/chevron.png"
                    />
                </div>
            </button>

            <CenteredContainer className="text-lg text-fuchsia-200">
                <CardElement
                    title="Asteroids"
                    description="A reboot of the famous video game from 1979.
                    3 implementations: in Java, TypeScript and Rust."
                    url="https://github.com/olimungo/asteroids"
                />

                <CardElement
                    title="Game of life"
                    description="An implementation of John Conway's game of life for
                    comparing Rust and JavaScript performances in the
                    browser."
                    url="https://github.com/olimungo/wasm-game-of-life"
                />

                <CardElement
                    title="Planning Poker"
                    description="For helping developers to etimate stories during a
                    Sprint planning, implemented with React and using the
                    Firebase service for hosting the data."
                    url="https://github.com/olimungo/planning-poker-v3"
                />

                <CardElement
                    title="Moviepolis"
                    description="Use case for searching movies from the themoviedb.org
                    database, implemented with React."
                    url="https://github.com/olimungo/moviepolis"
                />

                <CardElement
                    title="This project"
                    description="Using React, tailwindcss and signal-js."
                    url="https://github.com/olimungo/cv"
                />
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
        <RaisedCard className="reveal-top my-4 flex items-center justify-center p-2 md:my-8 md:p-6">
            <Button
                className="h-min w-5/12 md:w-3/12"
                color="purple"
                onClick={() => window.open(url, '_blank')}
            >
                <div className="text-xs uppercase md:text-base">{title}</div>

                <img
                    className="pink relative ml-2 h-2 -rotate-90 md:top-[1px] md:h-2"
                    srcSet="assets/chevron.png"
                />
            </Button>

            <div className="ml-3 w-7/12 text-left text-xs md:ml-5 md:w-9/12 md:text-lg">
                {description}
            </div>
        </RaisedCard>
    );
}
