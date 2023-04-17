import React, { useEffect, useState } from 'react';

export function Hero() {
    const [typewriterSound, setTypewriterSound] = useState<HTMLAudioElement>();
    const [catchPhrase, setCatchPhrase] = useState<HTMLSpanElement>();

    useEffect(() => {
        const audioElement = document.getElementById(
            'typewriter-sound'
        ) as HTMLAudioElement;

        if (audioElement) {
            setTypewriterSound(audioElement);
        }

        const catchPhrase = document.getElementById('catch-phrase');

        if (catchPhrase) {
            setCatchPhrase(catchPhrase);
        }
    }, []);

    useEffect(() => {
        if (typewriterSound && catchPhrase) {
            setTimeout(() => {
                removeCatchPhrase(catchPhrase, typewriterSound);
            }, 3000);
        }
    }, [typewriterSound, catchPhrase]);

    return (
        <div className="m-8 ml-12">
            <h1 className="text-5xl tracking-widest">olimungo</h1>
            <div className="text-sm tracking-wide text-violet-100">
                SPACE MISSION: POSSIBLE!
            </div>

            <div className="mt-20 text-2xl lg:mt-28">
                Experienced developer. IT Project Manager.&nbsp;
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
            playTyperwriterSound(typewriterSound);
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
            playTyperwriterSound(typewriterSound);
            addCatchPhrase(catchPhrase, typewriterSound);
        }, Math.floor(Math.random() * 150) + 200);
    }
}

function playTyperwriterSound(typewriterSound: HTMLAudioElement) {
    if (typewriterSound) {
        // typewriterSound.play().catch(() => {
        //     /*ignore*/
        // });
    }
}
