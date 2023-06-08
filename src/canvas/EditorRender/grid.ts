import { Layers } from "../../layer/layer";
import { CanvasContext } from "../canvas";
import { Render } from "./Render";
import { MusicInfo } from "./music";

export class Grid extends Render {
  music: MusicInfo;
  gutter: number;
  timeDivideNumber = 4;

  constructor(
    ctx: CanvasContext,
    layers: Layers,
    options: { music: MusicInfo; gutter: number, divide: number }
  ) {
    super(ctx, layers);
    this.music = options.music;
    this.gutter = options.gutter;
    this.timeDivideNumber = options.divide;
  }

  render(): void {
    this.ctx.ctx.strokeStyle = "#fff";
    for (
      let i = Math.floor(-this.ctx.translate[1] / this.gutter);
      i <= this.music.beatCount;
      i++
    ) {
      const y = i * this.gutter + 30;
      if (y > this.ctx.height + -this.ctx.translate[1]) {
        break;
      }
      this.ctx.ctx.font = "16px sans-serif";
      this.ctx.ctx.textAlign = "right";
      this.ctx.ctx.strokeText(`${this.music.beatCount - i}`, 40, y + 3);
      for (let j = 0; j < this.timeDivideNumber; j++) {
        if(j !== 0) {
          this.ctx.ctx.font = "12px sans-serif";
          this.ctx.ctx.lineWidth = 1;
          this.ctx.ctx.strokeText(`${this.timeDivideNumber - j}`, 40, y + j * (this.gutter / this.timeDivideNumber) + 3);
        } else {
          this.ctx.ctx.lineWidth = 2;
        }
        this.ctx.ctx.strokeStyle = "#fff";
        this.ctx.ctx.beginPath();
        this.ctx.ctx.moveTo(48, y + j * (this.gutter / this.timeDivideNumber));
        this.ctx.ctx.lineTo(
          this.ctx.width - 24,
          y + j * (this.gutter / this.timeDivideNumber)
        );
        this.ctx.ctx.stroke();
      }
    }
  }
}
