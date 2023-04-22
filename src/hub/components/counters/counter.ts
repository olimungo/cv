import { CanvasProps } from '../../utils/canvas';
import { Vector } from '../../utils/vector';

export class Counter {
    setupProps: CanvasProps;
    position: Vector;
    label: string;
    unit: string;
    gauge: number;

    constructor(
        setupProps: CanvasProps,
        position: Vector,
        label: string,
        unit: string
    ) {
        this.setupProps = setupProps;
        this.position = position;
        this.label = label;
        this.unit = unit;
    }

    update(gauge: number) {
        this.gauge = gauge;
    }

    render(value: string) {
        const setupProps = this.setupProps;
        const ctx = setupProps.ctx;

        ctx.save();

        // Dark background
        ctx.beginPath();

        ctx.arc(this.position.x, this.position.y, 60, 0, 2 * Math.PI);

        ctx.fillStyle = 'rgba(0, 0, 0, 0.3)';
        ctx.fill();

        // Purple ring
        ctx.strokeStyle = 'rgba(255, 144, 200, 0.4)';
        ctx.lineWidth = 4;

        ctx.beginPath();

        ctx.arc(
            this.position.x,
            this.position.y,
            52,
            Vector.toRadian(-20),
            Vector.toRadian(40)
        );

        ctx.stroke();

        // White ring
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.8)';

        ctx.beginPath();

        ctx.arc(
            this.position.x,
            this.position.y,
            52,
            Vector.toRadian(140),
            Vector.toRadian(-20)
        );

        ctx.stroke();

        // Grey ring
        ctx.strokeStyle = 'rgba(0, 0, 0, 0.5)';

        ctx.beginPath();

        ctx.arc(
            this.position.x,
            this.position.y,
            52,
            Vector.toRadian(2 * this.gauge + 140),
            Vector.toRadian(-20)
        );

        ctx.stroke();

        // Text
        ctx.fillStyle = 'rgba(255, 255, 255, 0.7';
        ctx.textAlign = 'center';
        ctx.font = '300 11px "Exo 2"';

        ctx.fillText(this.label, this.position.x, this.position.y - 20);
        ctx.fillText(this.unit, this.position.x, this.position.y + 35);

        ctx.fillStyle = 'rgba(255, 255, 255, 0.9';
        ctx.textAlign = 'center';
        ctx.font = '300 32px "Exo 2"';

        ctx.fillText(value, this.position.x, this.position.y + 15);

        ctx.restore();
    }
}
