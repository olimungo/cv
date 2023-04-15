import {
    MissionEventLabel,
    MissionEventLabelPosition,
    TelemetryData,
} from './mission-events';
import { SetupProps } from './setup-props';
import { Vector } from './vector';

export class MissionEvent {
    setupProps: SetupProps;
    fromAngle: number;
    toAngle: number;
    anchor: Vector;
    radius: number;
    label: MissionEventLabel;
    labelPosition: MissionEventLabelPosition;
    telemetry: TelemetryData;

    completed = false;
    angle: number;
    targetAngle: number;
    velocity = 0;

    constructor(
        setupProps: SetupProps,
        fromAngle: number,
        toAngle: number,
        anchor: Vector,
        radius: number,
        label: MissionEventLabel,
        labelPosition: MissionEventLabelPosition,
        telemetry: TelemetryData
    ) {
        this.setupProps = setupProps;
        this.fromAngle = fromAngle;
        this.toAngle = toAngle;
        this.anchor = anchor;
        this.radius = radius;
        this.label = label;
        this.labelPosition = labelPosition;
        this.telemetry = telemetry;

        this.angle = fromAngle;
        this.targetAngle = fromAngle;
    }

    update(hubAngle: number) {
        this.move();

        this.angle += this.velocity;

        if (this.angle + hubAngle <= 270) {
            this.completed = true;
        } else {
            this.completed = false;
        }
    }

    draw() {
        const ctx = this.setupProps.ctx;
        const angle = Vector.toRadian(this.angle);

        const x = this.radius * Math.cos(angle) + this.anchor.x;
        const y = this.radius * Math.sin(angle) + this.anchor.y;

        ctx.save();

        ctx.translate(x, y);
        ctx.rotate(angle + Vector.toRadian(90));

        ctx.beginPath();
        ctx.fillStyle = '#222';
        ctx.arc(0, 0, 6, 0, 2 * Math.PI);
        ctx.fill();

        ctx.beginPath();
        ctx.fillStyle = '#fff';
        ctx.lineWidth = 1.5;
        ctx.arc(0, 0, 6, 0, 2 * Math.PI);
        ctx.stroke();

        if (this.completed) {
            ctx.beginPath();
            ctx.arc(0, 0, 2.5, 0, 2 * Math.PI);
            ctx.fill();
        }

        let textY;

        if (this.labelPosition == 'down') {
            textY = 22;

            ctx.beginPath();
            ctx.moveTo(0, 6);
            ctx.lineTo(0, 11);
            ctx.stroke();
        } else {
            textY = -14;

            ctx.beginPath();
            ctx.moveTo(0, -6);
            ctx.lineTo(0, -11);
            ctx.stroke();
        }

        ctx.translate(0, textY);

        ctx.textAlign = 'center';
        ctx.font = '11px "Exo 2"';

        textY = 0;
        let decY = 0;
        let splitlabel = this.label.split('\n');

        if (this.labelPosition == 'up') {
            decY = -12;
            splitlabel = splitlabel.reverse();
        } else {
            decY = 12;
        }

        for (const text of splitlabel) {
            ctx.fillText(text, 0, textY);
            textY += decY;
        }

        ctx.restore();
    }

    expand() {
        this.targetAngle = this.toAngle;
    }

    contract() {
        this.targetAngle = this.fromAngle;
    }

    move() {
        const distance = this.targetAngle - this.angle;

        if (Math.abs(distance) > 0.01) {
            if (Math.abs(distance) < 0.05) {
                this.velocity = 0.01;
            } else {
                this.velocity = distance / 30;
            }
        } else {
            this.velocity = 0;
        }
    }
}
