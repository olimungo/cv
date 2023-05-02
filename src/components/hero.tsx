import React, { useEffect, useRef, useState } from 'react';
import signal from 'signal-js';
import { speakerEventMuted } from './speaker';
import { GetToKnowMe } from './get-to-know-me';
import { CenteredContainer } from './centered-container';

export const startHeroAnimation = 'startAnimation';

export function Hero() {
    const [soundTypewriter1, setSoundTypewriter1] =
        useState<HTMLAudioElement>();
    const [soundTypewriter2, setSoundTypewriter2] =
        useState<HTMLAudioElement>();
    const [alternateTypewriter, setAlternateTypewriter] = useState(false);
    const [catchPhrase, setCatchPhrase] = useState<HTMLSpanElement>();
    const [muted, setMuted] = useState(false);
    const mutedRef = useRef(muted);
    mutedRef.current = muted;

    useEffect(() => {
        const typewriter1 = document.getElementById(
            'typewriter-1'
        ) as HTMLAudioElement;
        const typewriter2 = document.getElementById(
            'typewriter-2'
        ) as HTMLAudioElement;

        if (typewriter1) {
            setSoundTypewriter1(typewriter1);
        }

        if (typewriter2) {
            setSoundTypewriter2(typewriter2);
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
            setMuted(event.muted);
        });

        return () => signal.off(speakerEventMuted);
    }, []);

    const removeCatchPhrase = () => {
        if (!catchPhrase) {
            return;
        }

        if (catchPhrase.innerText !== '') {
            setAlternateTypewriter(!alternateTypewriter);

            setTimeout(() => {
                const text = catchPhrase.innerText;
                catchPhrase.innerText = text.substring(0, text.length - 1);

                playSoundTyperwriter(
                    alternateTypewriter ? soundTypewriter1 : soundTypewriter2
                );

                removeCatchPhrase();
            }, Math.floor(Math.random() * 200) + 200);
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
            setAlternateTypewriter(!alternateTypewriter);

            setTimeout(() => {
                const text = catchPhrase.textContent || '';
                const char = newCatchPhrase.substring(
                    text.length,
                    text.length + 1
                );
                catchPhrase.textContent += char;

                playSoundTyperwriter(
                    alternateTypewriter ? soundTypewriter1 : soundTypewriter2
                );

                addCatchPhrase();
            }, Math.floor(Math.random() * 100) + 200);
        }
    };

    const playSoundTyperwriter = (
        soundTypewriter: HTMLAudioElement | undefined
    ) => {
        if (soundTypewriter && !mutedRef.current) {
            soundTypewriter.volume = 0.25;

            console.log(soundTypewriter.id);

            soundTypewriter.play().catch(() => {
                /*ignore*/
            });
        }
    };

    return (
        <CenteredContainer className="mx-6 sm:mx-24 md:mx-0">
            <audio id="typewriter-1" src="assets/typewriter.mp3" />
            <audio id="typewriter-2" src="assets/typewriter.mp3" />

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
