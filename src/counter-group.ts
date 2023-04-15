import { Counter } from './counter';
import { SetupProps } from './setup-props';
import { Vector } from './vector';

export class CounterGroup {
    setupProps: SetupProps;
    position: Vector;
    groupLabel: string;

    speedCounter: Counter;
    altitudeCounter: Counter;
    speed: number;
    altitude: number;
    speedGauge: number;
    altitudeGauge: number;

    constructor(setupProps: SetupProps, position: Vector, groupLabel: string) {
        this.setupProps = setupProps;
        this.position = position;
        this.groupLabel = groupLabel;

        this.speedCounter = new Counter(
            setupProps,
            new Vector(position.x, position.y),
            'SPEED',
            'KM/H'
        );

        this.altitudeCounter = new Counter(
            setupProps,
            new Vector(position.x + 130, position.y),
            'ALTITUDE',
            'KM'
        );
    }

    update(
        speed: number,
        altitude: number,
        speedGauge: number,
        altitudeGauge: number
    ) {
        this.speed = speed;
        this.altitude = altitude;
        this.speedGauge = speedGauge;
        this.altitudeGauge = altitudeGauge;

        this.speedCounter.update(speedGauge);
        this.altitudeCounter.update(altitudeGauge);
    }

    draw() {
        const setupProps = this.setupProps;
        const ctx = setupProps.ctx;

        this.speedCounter.draw(this.speed + '');
        this.altitudeCounter.draw(this.altitude + '');

        ctx.save();

        ctx.fillStyle = 'rgba(255, 255, 255, .8)';
        ctx.font = '300 13px "Exo 2"';
        ctx.textAlign = 'center';

        ctx.fillText(
            this.groupLabel,
            this.position.x + 55,
            this.position.y + 60
        );

        ctx.restore();
    }
}
