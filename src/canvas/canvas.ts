export class CanvasContext {
  public width: number;
  public height: number;
  public ctx: CanvasRenderingContext2D;
  public translate: [number, number] = [0, 0];
  public canvas: HTMLCanvasElement;

  constructor(width: number, height: number, ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement) {
    this.ctx = ctx;
    this.width = width;
    this.height = height;
    this.canvas = canvas;
  }

  setTranslate(x: number, y: number) {
    this.translate = [x, y];
  }

  clear() {
    this.canvas.width = this.width;
  }
}
