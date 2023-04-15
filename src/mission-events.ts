import { MissionEvent } from './mission-event';
import { SetupProps } from './setup-props';
import { Vector } from './vector';

export type MissionEventLabel =
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

export type MissionEventLabelPosition = 'up' | 'down';

const samples: Record<
    MissionEventLabel,
    {
        labelPosition: MissionEventLabelPosition;
        angle: number;
        moveToAngle: number;
    }
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

export class MissionEvents {
    setupProps: SetupProps;
    anchor: Vector;
    angle: number;
    missionEvents: MissionEvent[] = [];

    constructor(setupProps: SetupProps, anchor: Vector) {
        this.setupProps = setupProps;
        this.anchor = anchor;

        for (const [key, value] of Object.entries(samples)) {
            this.missionEvents.push(
                new MissionEvent(
                    setupProps,
                    value.angle,
                    anchor,
                    setupProps.height + setupProps.centerX,
                    key as MissionEventLabel,
                    value.labelPosition,
                    value.moveToAngle,
                    this.callbackCompleted
                )
            );
        }
    }

    update(angle: number) {
        this.angle = angle;
    }

    draw() {
        this.setupProps.ctx.save();

        this.setupProps.ctx.translate(this.anchor.x, this.anchor.y);
        this.setupProps.ctx.rotate(Vector.toRadian(this.angle));
        this.setupProps.ctx.translate(-this.anchor.x, -this.anchor.y);

        for (const missionEvent of this.missionEvents) {
            missionEvent.update(this.angle);
            missionEvent.draw();
        }

        this.setupProps.ctx.restore();
    }

    private callbackCompleted(
        eventLabel: MissionEventLabel,
        completed: boolean
    ) {
        if (eventLabel === 'LIFTOFF') {
            for (const missionEvent of this.missionEvents) {
                missionEvent.moveTo(completed);
            }
        }
    }
}
