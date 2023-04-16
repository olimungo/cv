import { Hub } from './hub';
import { MissionEvents } from './mission-events';
import { SetupProps } from './setup-props';
import { Vector } from './vector';

let previousTimestamp = 0;
let elapsed = 0;

const setupProps = setup();

const anchor = new Vector(
    setupProps.centerX,
    setupProps.height + setupProps.height / 5 + setupProps.centerX
);

let hubAngle = 0;

const hub = new Hub(setupProps, anchor);
const missionEvents = new MissionEvents(setupProps, anchor);

const main = document.getElementById('main');

if (main) {
    main.onscroll = () => {
        const completion =
            (main.scrollTop / (main.scrollHeight - main.clientHeight)) * 100;

        hubAngle =
            -((missionEvents.getMaxAngle() + 0.01 - 270) / 100) * completion;
    };
}

renderLoop(0);

setTimeout(() => {
    removeCatchPhrase();
}, 3000);

//
//
//

function renderLoop(timestamp) {
    elapsed += timestamp - previousTimestamp;
    previousTimestamp = timestamp;

    if (elapsed > 30) {
        elapsed = 0;

        // Updates
        const prevMissionEventsState = missionEvents.missionEventsState;
        const prevMecoCompleted = missionEvents.mecoCompleted;
        const prevSecoCompleted = missionEvents.secoCompleted;

        missionEvents.update(hubAngle);

        if (missionEvents.missionEventsState !== prevMissionEventsState) {
            if (missionEvents.missionEventsState === 'contract') {
                hub.resetTimer();
            } else {
                hub.startTimer();
            }
        }

        if (missionEvents.mecoCompleted !== prevMecoCompleted) {
            if (missionEvents.mecoCompleted) {
                hub.displayStage2();
            } else {
                hub.hideStage2();
            }
        }

        if (missionEvents.secoCompleted !== prevSecoCompleted) {
            if (missionEvents.secoCompleted) {
                hub.hideStage1();
            } else {
                hub.displayStage1();
            }
        }

        hub.update(missionEvents.telemetry);

        // Draws
        setupProps.ctx.save();

        setupProps.ctx.clearRect(0, 0, setupProps.width, setupProps.height);

        hub.draw();
        missionEvents.draw();

        setupProps.ctx.restore();
    }

    requestAnimationFrame(renderLoop);
}

function setup(): SetupProps {
    const canvas = document.getElementById('hub') as HTMLCanvasElement;
    let ctx: CanvasRenderingContext2D | null;
    let centerX: number = 0;
    let centerY: number = 0;
    let width: number = 0;
    let height: number = 0;

    if (!canvas) {
        throw 'No canvas element named "hub" was found in the DOM!';
    }

    ctx = canvas.getContext('2d');

    if (!ctx) {
        throw 'The 2D context could not be found on the canvas element!';
    }

    fitWithParent(canvas);

    let setupProps = {
        canvas,
        width,
        height,
        centerX,
        centerY,
        ctx: ctx as CanvasRenderingContext2D,
    };

    setupProps.ctx.strokeStyle = '#ffffff';
    setupProps.ctx.fillStyle = '#ffffff';

    calcCanvasDimensions(setupProps);

    onresize = () => {
        calcCanvasDimensions(setupProps);
        fitWithParent(canvas);
    };

    return setupProps;
}

function calcCanvasDimensions(setupProps: SetupProps) {
    setupProps.width = setupProps.canvas.width;
    setupProps.height = setupProps.canvas.height;
    setupProps.centerX = setupProps.width / 2;
    setupProps.centerY = setupProps.height / 2;
}

function fitWithParent(canvas) {
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
}

function removeCatchPhrase() {
    const catchPhrase = document.getElementById('catch-phrase');

    if (!catchPhrase) {
        return;
    }

    if (catchPhrase.innerText !== '') {
        setTimeout(() => {
            const text = catchPhrase.innerText;
            catchPhrase.innerText = text.substring(0, text.length - 1);
            typewriterSound();
            removeCatchPhrase();
        }, Math.floor(Math.random() * 250) + 300);
    } else {
        addCatchPhrase();
    }
}

function addCatchPhrase() {
    const catchPhrase = document.getElementById('catch-phrase');
    const newCatchPhrase = 'Space enthusiast!';

    if (!catchPhrase) {
        return;
    }

    if (catchPhrase.innerText.length !== newCatchPhrase.length) {
        setTimeout(() => {
            const text = catchPhrase.textContent || '';
            const char = newCatchPhrase.substring(text.length, text.length + 1);
            catchPhrase.textContent += char;
            typewriterSound();
            addCatchPhrase();
        }, Math.floor(Math.random() * 250) + 300);
    }
}

function typewriterSound() {
    const audio = document.querySelector('audio');

    if (audio) {
        audio.play().catch(() => {
            /*ignore*/
        });
    }
}
