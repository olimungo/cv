import React, { useEffect, useRef, useState } from 'react';
import signal from 'signal-js';
import { muteEvent } from './speaker';

export const startAnimation = 'startAnimation';

export function Hero() {
    const [soundTypewriter, setSoundTypewriter] = useState<HTMLAudioElement>();
    const [catchPhrase, setCatchPhrase] = useState<HTMLSpanElement>();
    const [muted, setMuted] = useState(false);
    const mutedRef = useRef(muted);
    mutedRef.current = muted;

    useEffect(() => {
        const typewriterUrl = new URL(
            '../assets/typewriter.mp3',
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
            signal.on(startAnimation, () => {
                setTimeout(() => {
                    removeCatchPhrase(catchPhrase, soundTypewriter);
                }, 3000);
            });

            return () => signal.off(startAnimation);
        }
    }, [catchPhrase, soundTypewriter]);

    // Check if sound is muted
    useEffect(() => {
        signal.on(muteEvent, (event: { muted: boolean }) => {
            setMuted(event.muted);
        });

        return () => signal.off(muteEvent);
    }, []);

    return (
        <div className="ml-12 mt-8 h-80 md:ml-24 md:mt-16">
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

function removeCatchPhrase(
    catchPhrase: HTMLSpanElement,
    typewriterSound: HTMLAudioElement
) {
    if (!catchPhrase) {
        return;
    }

    if (catchPhrase.innerText !== '') {
        setTimeout(() => {
            const text = catchPhrase.innerText;
            catchPhrase.innerText = text.substring(0, text.length - 1);
            playSoundTyperwriter(typewriterSound);
            removeCatchPhrase(catchPhrase, typewriterSound);
        }, Math.floor(Math.random() * 150) + 200);
    } else {
        addCatchPhrase(catchPhrase, typewriterSound);
    }
}

function addCatchPhrase(
    catchPhrase: HTMLSpanElement,
    typewriterSound: HTMLAudioElement
) {
    const newCatchPhrase = 'Space enthusiast!';

    if (!catchPhrase) {
        return;
    }

    if (catchPhrase.innerText.length !== newCatchPhrase.length) {
        setTimeout(() => {
            const text = catchPhrase.textContent || '';
            const char = newCatchPhrase.substring(text.length, text.length + 1);
            catchPhrase.textContent += char;

            playSoundTyperwriter(typewriterSound);

            addCatchPhrase(catchPhrase, typewriterSound);
        }, Math.floor(Math.random() * 150) + 200);
    }
}

function playSoundTyperwriter(soundTtypewriter: HTMLAudioElement) {
    if (soundTtypewriter) {
        soundTtypewriter.volume = 0.2;

        soundTtypewriter.play().catch(() => {
            /*ignore*/
        });
    }
}
