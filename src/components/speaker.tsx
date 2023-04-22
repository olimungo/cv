import React, { useEffect, useState } from 'react';
import signal from 'signal-js';

export const muteEvent = 'muteEvent';

export function Speaker() {
    const [imageSpeakerHref, setImageSpeakerHref] = useState('');
    const [imageSpeakerMuteHref, setImageSpeakerMuteHref] = useState('');
    const [muted, setMuted] = useState(false);

    useEffect(() => {
        const imageSpeakerUrl = new URL(
            '../assets/speaker.svg',
            import.meta.url
        );

        if (imageSpeakerUrl) {
            setImageSpeakerHref(imageSpeakerUrl.href);
        }

        const imageSpeakerMuteUrl = new URL(
            '../assets/speaker-mute.svg',
            import.meta.url
        );

        if (imageSpeakerMuteUrl) {
            setImageSpeakerMuteHref(imageSpeakerMuteUrl.href);
        }
    }, []);

    const mute = () => {
        setMuted(!muted);
        signal.emit(muteEvent, { muted: !muted });
    };

    return (
        <img
            className="fixed right-6 top-6 w-6 opacity-70 md:right-12 md:top-10 md:w-8"
            srcSet={muted ? imageSpeakerMuteHref : imageSpeakerHref}
            onClick={mute}
        />
    );
}
