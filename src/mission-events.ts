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

type MissionEventState = 'contract' | 'expand';

const samples: Record<
    MissionEventLabel,
    {
        labelPosition: MissionEventLabelPosition;
        fromAngle: number;
        toAngle: number;
    }
> = {
    'ENGINE CHILL': { labelPosition: 'down', fromAngle: 270, toAngle: 260 },
    'STRONGBACK\nRETRACT': {
        labelPosition: 'up',
        fromAngle: 275,
        toAngle: 265,
    },
    STARTUP: { labelPosition: 'down', fromAngle: 282, toAngle: 278 },
    LIFTOFF: { labelPosition: 'up', fromAngle: 284, toAngle: 284 },
    'MAX-Q': { labelPosition: 'down', fromAngle: 287, toAngle: 290 },
    MECO: { labelPosition: 'up', fromAngle: 291, toAngle: 297 },
    FAIRING: { labelPosition: 'down', fromAngle: 292, toAngle: 300 },
    ENTRY: { labelPosition: 'up', fromAngle: 300, toAngle: 318 },
    LANDING: { labelPosition: 'down', fromAngle: 303, toAngle: 323 },
    'SECO-1': { labelPosition: 'up', fromAngle: 304.4, toAngle: 328 },
};

export class MissionEvents {
    setupProps: SetupProps;
    anchor: Vector;
    angle: number;
    missionEvents: MissionEvent[] = [];
    missionEventsState: MissionEventState = 'contract';

    constructor(setupProps: SetupProps, anchor: Vector) {
        this.setupProps = setupProps;
        this.anchor = anchor;

        for (const [key, value] of Object.entries(samples)) {
            this.missionEvents.push(
                new MissionEvent(
                    setupProps,
                    value.fromAngle,
                    value.toAngle,
                    anchor,
                    setupProps.height + setupProps.centerX,
                    key as MissionEventLabel,
                    value.labelPosition
                )
            );
        }
    }

    update(angle: number) {
        this.angle = angle;

        const missionEventsState = this.missionEventsState;

        for (const missionEvent of this.missionEvents) {
            missionEvent.update(angle);

            if (missionEvent.label === 'LIFTOFF') {
                if (
                    missionEvent.completed &&
                    this.missionEventsState !== 'expand'
                ) {
                    this.missionEventsState = 'expand';
                }

                if (
                    !missionEvent.completed &&
                    this.missionEventsState !== 'contract'
                ) {
                    this.missionEventsState = 'contract';
                }
            }
        }

        if (missionEventsState !== this.missionEventsState) {
            for (const missionEvent of this.missionEvents) {
                if (this.missionEventsState === 'expand') {
                    missionEvent.expand();
                } else {
                    missionEvent.contract();
                }
            }
        }
    }

    draw() {
        this.setupProps.ctx.save();

        this.setupProps.ctx.translate(this.anchor.x, this.anchor.y);
        this.setupProps.ctx.rotate(Vector.toRadian(this.angle));
        this.setupProps.ctx.translate(-this.anchor.x, -this.anchor.y);

        for (const missionEvent of this.missionEvents) {
            missionEvent.draw();
        }

        this.setupProps.ctx.restore();
    }

    getMaxAngle(): number {
        return this.missionEvents.reduce((acc, missionEvent) => {
            return missionEvent.toAngle > acc ? missionEvent.toAngle : acc;
        }, 0);
    }
}
