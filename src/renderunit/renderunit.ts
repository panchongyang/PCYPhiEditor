import { CanvasContext } from "../canvas/canvas";

export class RenderUnit {
  renderer: () => void;
  ctx: CanvasContext;

  constructor(ctx: CanvasContext, render: () => void) {
    this.ctx = ctx;
    this.renderer = render;
  }

  render() {
    this.ctx.ctx.save();
    this.renderer();
    this.ctx.ctx.restore();
  }
}
