import { CounterGroup } from './counter-group';
import { TelemetryData } from './mission-events';
import { SetupProps } from './setup-props';
import { Timer } from './timer';
import { Vector } from './vector';

export class Hub {
    setupProps: SetupProps;
    anchor: Vector;
    timer: Timer;
    stage1Counters: CounterGroup;
    stage2Counters: CounterGroup;
    stage1Opacity = 100;
    stage1OpacityStep = 0;
    stage2Opacity = 0;
    stage2OpacityStep = 0;

    constructor(setupProps: SetupProps, anchor: Vector) {
        this.setupProps = setupProps;
        this.anchor = anchor;

        this.timer = new Timer(setupProps);

        this.stage1Counters = new CounterGroup(
            setupProps,
            new Vector(100, 65),
            'STAGE 1 TELEMETRY'
        );

        this.stage2Counters = new CounterGroup(
            setupProps,
            new Vector(setupProps.width - 230, 65),
            'STAGE 2 TELEMETRY'
        );
    }

    update(telemetry: TelemetryData) {
        this.timer.update();

        this.stage1Counters.update(
            telemetry.stage1Speed,
            telemetry.stage1Altitude,
            telemetry.stage1SpeedGauge,
            telemetry.stage1AltitudeGauge
        );

        this.stage2Counters.update(
            telemetry.stage2Speed,
            telemetry.stage2Altitude,
            telemetry.stage2SpeedGauge,
            telemetry.stage2AltitudeGauge
        );

        this.stage2Opacity += this.stage2OpacityStep;

        this.stage1Opacity += this.stage1OpacityStep;

        if (this.stage1Opacity <= 0) {
            this.stage1OpacityStep = 0;
            this.stage1Opacity = 0;
        }

        if (this.stage1Opacity >= 100) {
            this.stage1OpacityStep = 0;
            this.stage1Opacity = 100;
        }

        if (this.stage2Opacity <= 0) {
            this.stage2OpacityStep = 0;
            this.stage2Opacity = 0;
        }

        if (this.stage2Opacity >= 100) {
            this.stage2OpacityStep = 0;
            this.stage2Opacity = 100;
        }
    }

    draw() {
        const setupProps = this.setupProps;
        const ctx = setupProps.ctx;
        const anchor = this.anchor;

        ctx.save();

        // back grey lightly transparent
        ctx.beginPath();

        ctx.arc(
            anchor.x,
            anchor.y,
            setupProps.height + setupProps.centerX + 45,
            0,
            2 * Math.PI
        );

        ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
        ctx.lineWidth = 2;
        ctx.fill();

        // bottom dark
        ctx.beginPath();

        ctx.arc(
            anchor.x,
            anchor.y,
            setupProps.height + setupProps.centerX - 45,
            0,
            2 * Math.PI
        );

        ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
        ctx.lineWidth = 2;
        ctx.fill();

        // main line
        ctx.beginPath();

        ctx.arc(
            anchor.x,
            anchor.y,
            setupProps.height + setupProps.centerX,
            0,
            2 * Math.PI
        );

        ctx.lineWidth = 2;
        ctx.strokeStyle = '#aaa';
        ctx.stroke();

        // overlay grey line
        ctx.beginPath();

        ctx.arc(
            anchor.x,
            anchor.y,
            setupProps.height + setupProps.centerX,
            0,
            Vector.toRadian(270)
        );

        ctx.strokeStyle = '#fff';
        ctx.lineWidth = 3;
        ctx.stroke();

        // overlay grey line caret
        ctx.beginPath();

        ctx.moveTo(
            anchor.x,
            anchor.y - setupProps.height - setupProps.centerX - 5
        );
        ctx.lineTo(
            anchor.x,
            anchor.y - setupProps.height - setupProps.centerX + 5
        );

        ctx.lineWidth = 2;
        ctx.stroke();

        // sub grey line
        ctx.beginPath();

        ctx.arc(
            anchor.x,
            anchor.y,
            setupProps.height + setupProps.centerX - 45,
            0,
            2 * Math.PI
        );

        ctx.strokeStyle = '#555';
        ctx.lineWidth = 2;
        ctx.stroke();

        this.timer.draw();

        if (this.setupProps.width > 1000) {
            ctx.save();

            ctx.filter = `opacity(${this.stage1Opacity}%)`;
            this.stage1Counters.draw();

            ctx.restore();

            ctx.save();

            ctx.filter = `opacity(${this.stage2Opacity}%)`;
            this.stage2Counters.draw();

            ctx.restore();
        }

        ctx.restore();
    }

    startTimer() {
        this.timer.start();
    }
    resetTimer() {
        this.timer.reset();
    }

    displayStage1() {
        this.stage1OpacityStep = 3;
    }

    hideStage1() {
        this.stage1OpacityStep = -6;
    }

    displayStage2() {
        this.stage2OpacityStep = 3;
    }

    hideStage2() {
        this.stage2OpacityStep = -6;
    }
}
