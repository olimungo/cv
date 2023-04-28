import React, { useEffect, useRef, useState } from 'react';
import signal from 'signal-js';
import { speakerEventMuted } from './speaker';

export const startHeroAnimation = 'startAnimation';

export function Hero() {
    const [soundTypewriter, setSoundTypewriter] = useState<HTMLAudioElement>();
    const [catchPhrase, setCatchPhrase] = useState<HTMLSpanElement>();
    const [muted, setMuted] = useState(false);
    const mutedRef = useRef(muted);
    mutedRef.current = muted;

    useEffect(() => {
        const typewriterUrl = new URL(
            '../../static/assets/typewriter.mp3',
            import.meta.url
        );

        if (typewriterUrl) {
            setSoundTypewriter(new Audio(typewriterUrl.href));
        }

        const catchPhrase = document.getElementById('catch-phrase');

        if (catchPhrase) {
            setCatchPhrase(catchPhrase);
        }
    }, []);

    useEffect(() => {
        if (soundTypewriter && catchPhrase) {
            signal.on(startHeroAnimation, () => {
                removeCatchPhrase();
            });

            return () => signal.off(startHeroAnimation);
        }
    }, [catchPhrase, soundTypewriter]);

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
            setTimeout(() => {
                const text = catchPhrase.innerText;
                catchPhrase.innerText = text.substring(0, text.length - 1);
                playSoundTyperwriter();
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
            setTimeout(() => {
                const text = catchPhrase.textContent || '';
                const char = newCatchPhrase.substring(
                    text.length,
                    text.length + 1
                );
                catchPhrase.textContent += char;

                playSoundTyperwriter();

                addCatchPhrase();
            }, Math.floor(Math.random() * 100) + 200);
        }
    };

    const playSoundTyperwriter = () => {
        if (soundTypewriter && !mutedRef.current) {
            soundTypewriter.volume = 0.2;

            soundTypewriter.play().catch(() => {
                /*ignore*/
            });
        }
    };

    return (
        <div className="mt-8 h-80 md:mt-16">
            <h1 className="text-5xl tracking-widest md:text-6xl">olimungo</h1>
            <div className="text-sm tracking-wide text-violet-200">
                SPACE MISSION: POSSIBLE!
            </div>

            <div className="mt-20 text-3xl md:mt-36 md:text-4xl">
                Experienced developer. IT&nbsp;Project&nbsp;Manager.
                <br />
                <span id="catch-phrase" className="gradient">
                    Food&nbsp;lover.
                </span>
            </div>
        </div>
    );
}
