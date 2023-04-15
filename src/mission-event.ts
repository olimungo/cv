import { MissionEventLabel, MissionEventLabelPosition } from './mission-events';
import { SetupProps } from './setup-props';
import { Vector } from './vector';

export class MissionEvent {
    position = new Vector();
    velocity = new Vector(0.5, 0.5);
    initAngle: number;
    angle: number;
    anchor: Vector;
    radius: number;
    setupProps: SetupProps;
    moveToAngle: number;
    moveToVelocity = 0;
    label: MissionEventLabel;
    labelPosition: MissionEventLabelPosition;
    completed = false;
    callbackCompleted: Function;

    constructor(
        setupProps: SetupProps,
        angle: number,
        anchor: Vector,
        radius: number,
        label: MissionEventLabel,
        labelPosition: MissionEventLabelPosition,
        moveToAngle: number,
        callbackCompleted: Function
    ) {
        this.setupProps = setupProps;
        this.initAngle = this.angle = angle;
        this.anchor = anchor;
        this.radius = radius;
        this.label = label;
        this.labelPosition = labelPosition;
        this.moveToAngle = moveToAngle;
        this.callbackCompleted = callbackCompleted;
    }

    update(hubAngle: number) {
        this.position.add(this.velocity);

        this.angle += this.moveToVelocity;

        this.checkMoveTo();

        if (this.angle + hubAngle <= 270) {
            if (!this.completed) {
                this.callbackCompleted(this.label, true);
            }

            this.completed = true;
        } else {
            if (this.completed) {
                this.callbackCompleted(this.label, false);
            }

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
        ctx.fillStyle = '#000';
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

    moveTo(expand: boolean) {
        if (expand) {
            this.moveToVelocity = this.moveToAngle > this.angle ? 0.1 : -0.1;
        } else {
            this.moveToVelocity = this.moveToAngle > this.angle ? -0.1 : 0.1;
        }
    }

    private checkMoveTo() {
        if (this.moveToVelocity) {
            if (this.moveToVelocity > 0) {
                const distance = this.moveToAngle - this.angle;

                if (distance < 0.02) {
                    this.moveToVelocity = 0.01;
                } else {
                    this.moveToVelocity = distance / 50;
                }

                if (this.angle > this.moveToAngle) {
                    this.moveToVelocity = 0;
                }
            } else {
                const distance = this.angle - this.moveToAngle;

                if (distance < 0.02) {
                    this.moveToVelocity = -0.01;
                } else {
                    this.moveToVelocity = -distance / 50;
                }

                if (this.angle < this.moveToAngle) {
                    this.moveToVelocity = 0;
                }
            }
        }
    }
}
