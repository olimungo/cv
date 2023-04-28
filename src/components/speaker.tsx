import React, { useEffect, useState } from 'react';
import signal from 'signal-js';

export const speakerEventMuted = 'speaker-event-mute';

export function Speaker() {
    const [muted, setMuted] = useState(false);

    const mute = () => {
        setMuted(!muted);
        signal.emit(speakerEventMuted, { muted: !muted });
    };

    return (
        <img
            className="fixed right-6 top-6 z-50 w-6 opacity-70 md:right-12 md:top-10 md:w-8"
            srcSet={muted ? 'assets/speaker-mute.svg' : 'assets/speaker.svg'}
            onClick={mute}
        />
    );
}
