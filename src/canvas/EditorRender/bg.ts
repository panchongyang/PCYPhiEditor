import { Render } from "./Render";

export class BackgroundRender extends Render {

  render() {
    this.ctx.ctx.fillStyle = '#3e3e3e';
    this.ctx.ctx.fillRect(0, -this.ctx.translate[1], this.ctx.width, this.ctx.height + -this.ctx.translate[1]);
  }
}