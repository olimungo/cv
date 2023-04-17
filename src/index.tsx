import { createRoot } from 'react-dom/client';
import { App } from './App';
import React from 'react';
import { Hub } from './hub/hub';

const app = document.getElementById('app');
const root = createRoot(app!);
root.render(<App />);

// Hub
const hub = new Hub();
let previousTimestamp = 0;
let elapsed = 0;

renderLoop(0);

function renderLoop(timestamp) {
    elapsed += timestamp - previousTimestamp;
    previousTimestamp = timestamp;

    if (elapsed > 30) {
        elapsed = 0;

        hub.render();
    }

    requestAnimationFrame(renderLoop);
}
