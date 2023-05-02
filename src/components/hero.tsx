import React, { useEffect, useRef, useState } from 'react';
import signal from 'signal-js';
import { speakerEventMuted } from './speaker';
import { GetToKnowMe } from './get-to-know-me';
import { CenteredContainer } from './centered-container';

export const startHeroAnimation = 'startAnimation';
const playTypewriterSound = 'playTypewriterSound';
let globalMuted = false;

export function Hero() {
    const [soundTypewriter1, setSoundTypewriter1] =
        useState<HTMLAudioElement>();
    const [soundTypewriter2, setSoundTypewriter2] =
        useState<HTMLAudioElement>();
    const [soundTypewriter3, setSoundTypewriter3] =
        useState<HTMLAudioElement>();
    const [catchPhrase, setCatchPhrase] = useState<HTMLSpanElement>();

    useEffect(() => {
        const typewriter1 = document.getElementById(
            'typewriter-1'
        ) as HTMLAudioElement;
        const typewriter2 = document.getElementById(
            'typewriter-2'
        ) as HTMLAudioElement;
        const typewriter3 = document.getElementById(
            'typewriter-3'
        ) as HTMLAudioElement;

        if (typewriter1) {
            setSoundTypewriter1(typewriter1);
        }

        if (typewriter2) {
            setSoundTypewriter2(typewriter2);
        }

        if (typewriter3) {
            setSoundTypewriter3(typewriter3);
        }

        const catchPhrase = document.getElementById('catch-phrase');

        if (catchPhrase) {
            setCatchPhrase(catchPhrase);
        }
    }, []);

    useEffect(() => {
        if (soundTypewriter1 && catchPhrase) {
            signal.on(startHeroAnimation, () => {
                removeCatchPhrase();
            });

            return () => signal.off(startHeroAnimation);
        }
    }, [catchPhrase, soundTypewriter1]);

    // Check if sound is muted
    useEffect(() => {
        signal.on(speakerEventMuted, (event: { muted: boolean }) => {
            globalMuted = event.muted;
        });

        return () => signal.off(speakerEventMuted);
    }, []);

    const removeCatchPhrase = () => {
        if (!catchPhrase) {
            return;
        }

        if (catchPhrase.innerText !== '') {
            setTimeout(() => {
                const text = catchPhrase.innerText;

                setTimeout(() => {
                    catchPhrase.innerText = text.substring(0, text.length - 1);
                    removeCatchPhrase();
                }, 150);

                signal.emit(playTypewriterSound);
            }, Math.floor(Math.random() * 150) + 150);
        } else {
            addCatchPhrase();
        }
    };

    const addCatchPhrase = () => {
        const newCatchPhrase = 'Space enthusiast!';

        if (!catchPhrase) {
            return;
        }

        if (catchPhrase.innerText.length !== newCatchPhrase.length) {
            setTimeout(() => {
                const text = catchPhrase.textContent || '';
                const char = newCatchPhrase.substring(
                    text.length,
                    text.length + 1
                );

                signal.emit(playTypewriterSound);

                setTimeout(() => {
                    catchPhrase.textContent += char;
                    addCatchPhrase();
                }, 150);
            }, Math.floor(Math.random() * 150) + 150);
        }
    };

    useEffect(() => {
        if (soundTypewriter1 && soundTypewriter2 && soundTypewriter3) {
            soundTypewriter1.volume = 0.2;
            soundTypewriter2.volume = 0.2;
            soundTypewriter3.volume = 0.2;

            let alternateTypewriter = 0;

            signal.on(playTypewriterSound, (event) => {
                if (!document.hidden && !globalMuted) {
                    if (alternateTypewriter === 0) {
                        soundTypewriter1.play().catch(() => {
                            /*ignore*/
                        });

                        alternateTypewriter++;
                    } else if (alternateTypewriter === 1) {
                        soundTypewriter2.play().catch(() => {
                            /*ignore*/
                        });
                        alternateTypewriter++;
                    } else {
                        soundTypewriter3.play().catch(() => {
                            /*ignore*/
                        });

                        alternateTypewriter = 0;
                    }
                }
            });

            return () => signal.off(playTypewriterSound);
        }
    }, [soundTypewriter1, soundTypewriter2]);

    return (
        <CenteredContainer className="mx-6 sm:mx-24 md:mx-0">
            <audio id="typewriter-1" src="assets/typewriter.mp3" />
            <audio id="typewriter-2" src="assets/typewriter.mp3" />
            <audio id="typewriter-3" src="assets/typewriter.mp3" />

            <div className="mt-8 md:mt-16">
                <h1 className="text-5xl tracking-widest md:text-6xl">
                    olimungo
                </h1>
                <div className="text-sm tracking-wide text-violet-200">
                    SPACE MISSION: POSSIBLE!
                </div>

                <div className="mt-12 text-3xl md:mt-36 md:text-4xl">
                    <div>
                        Experienced developer. IT&nbsp;Project&nbsp;Manager.
                    </div>

                    <div id="catch-phrase" className="gradient inline-block">
                        Food&nbsp;lover.
                    </div>
                </div>
            </div>

            <GetToKnowMe />
        </CenteredContainer>
    );
}
