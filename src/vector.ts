export class Vector {
    x: number;
    y: number;

    constructor(x?: number, y?: number) {
        this.x = x || 0;
        this.y = y || 0;
    }

    static toRadian(angle: number) {
        return (angle * Math.PI) / 180;
    }

    add(vector: Vector) {
        this.x += vector.x;
        this.y += vector.y;
    }

    // pub fn div(&mut self, value: f64) -> Self {
    //     self.x /= value;
    //     self.y /= value;

    //     *self
    // }

    // pub fn mult(&mut self, value: f64) -> Self {
    //     self.x *= value;
    //     self.y *= value;

    //     *self
    // }

    // pub fn distance(self, v: Vector) -> f64 {
    //     let x = v.x - self.x;
    //     let y = v.y - self.y;
    //     (x * x + y * y).sqrt()
    // }
}
