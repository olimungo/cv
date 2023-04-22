import { CounterGroup } from './counters/counter-group';
import { TelemetryData } from './mission-events/mission-events';
import { Timer } from './timer';
import { Vector } from '../utils/vector';
import { CanvasProps } from '../utils/canvas';

export class Dashboard {
    canvasProps: CanvasProps;
    anchor: Vector;
    timer: Timer;
    stage1Counters: CounterGroup;
    stage2Counters: CounterGroup;
    stage1Opacity = 100;
    stage1OpacityStep = 0;
    stage2Opacity = 0;
    stage2OpacityStep = 0;

    constructor(canvasProps: CanvasProps, anchor: Vector) {
        this.canvasProps = canvasProps;
        this.anchor = anchor;

        this.timer = new Timer(canvasProps);

        this.stage1Counters = new CounterGroup(
            canvasProps,
            new Vector(100, 65),
            'STAGE 1 TELEMETRY'
        );

        this.stage2Counters = new CounterGroup(
            canvasProps,
            new Vector(canvasProps.width - 230, 65),
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

    render() {
        const setupProps = this.canvasProps;
        const ctx = setupProps.ctx;
        const anchor = this.anchor;

        ctx.save();

        // Back grey lightly transparent
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

        // Bottom dark
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

        // Main line
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

        // Overlay grey line
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

        // Overlay grey line caret
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

        // Sub grey line
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

        this.timer.render();

        if (this.canvasProps.width > 1000) {
            ctx.save();

            ctx.filter = `opacity(${this.stage1Opacity}%)`;
            this.stage1Counters.render();

            ctx.restore();

            ctx.save();

            ctx.filter = `opacity(${this.stage2Opacity}%)`;
            this.stage2Counters.render();

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
