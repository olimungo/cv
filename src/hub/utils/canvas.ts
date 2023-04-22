export interface CanvasProps {
    canvas: HTMLCanvasElement;
    width: number;
    height: number;
    centerX: number;
    centerY: number;
    ctx: CanvasRenderingContext2D;
}

export function getCanvasProps(): CanvasProps {
    const canvas = document.getElementById('hub') as HTMLCanvasElement;

    let ctx: CanvasRenderingContext2D | null;
    let centerX: number = 0;
    let centerY: number = 0;
    let width: number = 0;
    let height: number = 0;

    if (!canvas) {
        throw 'No canvas element named "hub" was found in the DOM!';
    }

    ctx = canvas.getContext('2d');

    if (!ctx) {
        throw 'The 2D context could not be found on the canvas element!';
    }

    // Fit size to parent's element
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    let setupProps = {
        canvas,
        width,
        height,
        centerX,
        centerY,
        ctx: ctx as CanvasRenderingContext2D,
    };

    // Calc canvas dimensions
    setupProps.width = setupProps.canvas.width;
    setupProps.height = setupProps.canvas.height;
    setupProps.centerX = setupProps.width / 2;
    setupProps.centerY = setupProps.height / 2;

    // Default fill and stroke style
    setupProps.ctx.strokeStyle = '#ffffff';
    setupProps.ctx.fillStyle = '#ffffff';

    return setupProps;
}
