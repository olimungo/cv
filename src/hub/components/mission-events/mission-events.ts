import { CanvasProps } from '../../utils/canvas';
import { Vector } from '../../utils/vector';
import { MissionEvent } from './mission-event';
import { defaultTelemetryData, missionEventsData } from './mission-events-data';

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
    | 'SECO'
    | 'DEPLOY';

export type MissionEventLabelPosition = 'up' | 'down';

export type MissionEventState = 'contract' | 'expand';

export interface TelemetryData {
    stage1Speed: number;
    stage1Altitude: number;
    stage1SpeedGauge: number;
    stage1AltitudeGauge: number;
    stage2Speed: number;
    stage2Altitude: number;
    stage2SpeedGauge: number;
    stage2AltitudeGauge: number;
}

export class MissionEvents {
    setupProps: CanvasProps;
    anchor: Vector;
    angle: number;
    missionEvents: MissionEvent[] = [];
    missionEventsState: MissionEventState = 'contract';
    mecoCompleted: boolean = false;
    secoCompleted: boolean = false;
    telemetry = defaultTelemetryData;

    constructor(setupProps: CanvasProps, anchor: Vector) {
        this.setupProps = setupProps;
        this.anchor = anchor;

        for (const [key, value] of Object.entries(missionEventsData)) {
            this.missionEvents.push(
                new MissionEvent(
                    setupProps,
                    value.fromAngle,
                    value.toAngle,
                    anchor,
                    setupProps.height + setupProps.centerX,
                    key as MissionEventLabel,
                    value.labelPosition,
                    value.telemetry
                )
            );
        }
    }

    update(angle: number) {
        this.angle = angle;

        const missionEventsState = this.missionEventsState;
        let telemetry: TelemetryData = defaultTelemetryData;

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

            if (missionEvent.label === 'MECO') {
                this.mecoCompleted = missionEvent.completed;
            }

            if (missionEvent.label === 'SECO') {
                this.secoCompleted = missionEvent.completed;
            }

            if (missionEvent.completed) {
                this.telemetry = missionEvent.telemetry;
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

    render() {
        this.setupProps.ctx.save();

        this.setupProps.ctx.translate(this.anchor.x, this.anchor.y);
        this.setupProps.ctx.rotate(Vector.toRadian(this.angle));
        this.setupProps.ctx.translate(-this.anchor.x, -this.anchor.y);

        for (const missionEvent of this.missionEvents) {
            missionEvent.render();
        }

        this.setupProps.ctx.restore();
    }

    getMaxAngle(): number {
        return this.missionEvents.reduce((acc, missionEvent) => {
            return missionEvent.toAngle > acc ? missionEvent.toAngle : acc;
        }, 0);
    }
}
