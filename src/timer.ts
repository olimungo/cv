import { SetupProps } from './setup-props';

export class Timer {
    setupProps: SetupProps;
    referenceTime: number;

    constructor(setupProps: SetupProps) {
        this.setupProps = setupProps;
    }

    update() {}

    draw() {
        const setupProps = this.setupProps;
        const ctx = setupProps.ctx;
        let timerText = 'T + 00:00:00';

        if (this.referenceTime > 0) {
            const secondsElapsed = Math.floor(
                (Date.now() - this.referenceTime) / 1000
            );

            timerText = `T + ${new Date(secondsElapsed * 1000)
                .toISOString()
                .substring(11, 19)}`;
        }

        ctx.save();

        ctx.fillStyle = '#fff';
        ctx.font = '42px "Exo 2"';
        ctx.textAlign = 'left';

        ctx.fillText(
            timerText,
            setupProps.centerX - 130,
            setupProps.centerY + 50
        );

        ctx.fillStyle = '#999';
        ctx.textAlign = 'center';
        ctx.font = 'bold 15px "Exo 2"';

        ctx.fillText('STARLINK', setupProps.centerX, setupProps.centerY + 80);

        ctx.restore();
    }

    start() {
        this.referenceTime = Date.now();
    }

    reset() {
        this.referenceTime = 0;
    }
}
