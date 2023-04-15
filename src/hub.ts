import { SetupProps } from './setup-props';
import { Vector } from './vector';

export class Hub {
    setupProps: SetupProps;
    anchor: Vector;

    constructor(setupProps: SetupProps, anchor: Vector) {
        this.setupProps = setupProps;
        this.anchor = anchor;
    }

    update() {}

    draw() {
        const setupProps = this.setupProps;
        const ctx = setupProps.ctx;
        const anchor = this.anchor;

        ctx.save();

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

        ctx.restore();
    }
}
