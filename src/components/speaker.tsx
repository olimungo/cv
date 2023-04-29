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
            className="pink fixed right-5 top-6 z-10 w-8 opacity-75 md:right-8 md:top-10 md:w-10"
            srcSet={muted ? 'assets/speaker-muted.png' : 'assets/speaker.png'}
            onClick={mute}
        />
    );
}
