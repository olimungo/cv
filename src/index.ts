import { EventTag, LabelPosition } from './eventTag';
import { Hub } from './hub';
import { SetupProps } from './setup-props';
import { Vector } from './vector';

const eventTags: EventTag[] = [];
let previousTimestamp = 0;
let elapsed = 0;

const setupProps = setup();

const anchor = new Vector(
    setupProps.centerX,
    setupProps.height + setupProps.height / 5 + setupProps.centerX
);

let hubAngle = 0;

const hub = new Hub(setupProps, anchor);

export type EventLabel =
    | 'ENGINE CHILL'
    | 'STRONGBACK\nRETRACT'
    | 'STARTUP'
    | 'LIFTOFF'
    | 'MAX-Q'
    | 'MECO'
    | 'FAIRING'
    | 'ENTRY'
    | 'LANDING'
    | 'SECO-1';

const samples: Record<
    EventLabel,
    { labelPosition: LabelPosition; angle: number; moveToAngle: number }
> = {
    'ENGINE CHILL': { labelPosition: 'down', angle: 270, moveToAngle: 260 },
    'STRONGBACK\nRETRACT': {
        labelPosition: 'up',
        angle: 275,
        moveToAngle: 265,
    },
    STARTUP: { labelPosition: 'down', angle: 282, moveToAngle: 278 },
    LIFTOFF: { labelPosition: 'up', angle: 284, moveToAngle: 284 },
    'MAX-Q': { labelPosition: 'down', angle: 287, moveToAngle: 290 },
    MECO: { labelPosition: 'up', angle: 291, moveToAngle: 297 },
    FAIRING: { labelPosition: 'down', angle: 292, moveToAngle: 300 },
    ENTRY: { labelPosition: 'up', angle: 300, moveToAngle: 318 },
    LANDING: { labelPosition: 'down', angle: 303, moveToAngle: 323 },
    'SECO-1': { labelPosition: 'up', angle: 304.4, moveToAngle: 328 },
};

for (const [key, value] of Object.entries(samples)) {
    eventTags.push(
        new EventTag(
            setupProps,
            value.angle,
            anchor,
            setupProps.height + setupProps.centerX,
            key as EventLabel,
            value.labelPosition,
            value.moveToAngle,
            callbackCompleted
        )
    );
}

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

// setTimeout(() => {
//     for (const eventTag of eventTags) {
//         eventTag.moveTo();
//     }
// }, 1000);

renderLoop(0);

//
//
//

function renderLoop(timestamp) {
    elapsed += timestamp - previousTimestamp;
    previousTimestamp = timestamp;

    if (elapsed > 0) {
        elapsed = 0;

        setupProps.ctx.save();

        setupProps.ctx.clearRect(0, 0, setupProps.width, setupProps.height);

        hub.draw();

        setupProps.ctx.translate(anchor.x, anchor.y);
        setupProps.ctx.rotate(Vector.toRadian(hubAngle));
        setupProps.ctx.translate(-anchor.x, -anchor.y);

        for (const eventTag of eventTags) {
            eventTag.update(hubAngle);
            eventTag.draw();
        }

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

function callbackCompleted(eventLabel: EventLabel, completed: boolean) {
    if (eventLabel === 'LIFTOFF') {
        for (const eventTag of eventTags) {
            eventTag.moveTo(completed);
        }
    }
}
