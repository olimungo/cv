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

const content = document.getElementById('content');

if (content) {
    content.onscroll = () => {
        const completion =
            (content.scrollTop /
                (content.scrollHeight - content.clientHeight)) *
            100;

        hubAngle = -(34.4 / 100) * completion;
    };
}

renderLoop(0);

//
//
//

function renderLoop(timestamp) {
    elapsed += timestamp - previousTimestamp;
    previousTimestamp = timestamp;

    if (elapsed > 50) {
        elapsed = 0;

        // Updates
        hub.update();
        missionEvents.update(hubAngle);

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
