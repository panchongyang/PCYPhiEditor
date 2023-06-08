import { Layers } from "../../layer/layer";
import { NoteColor, NoteType } from "../../type";
import { CanvasContext } from "../canvas";
import { Render } from "./Render";

export class CursorNote extends Render {
  public ctx: CanvasContext;
  public x: number;
  public y: number;
  public noteType: NoteType;
  public width = 60;

  constructor(ctx: CanvasContext, layers: Layers, x: number, y: number, type: NoteType) {
    super(ctx, layers);
    this.ctx = ctx;
    this.x = x;
    this.y = y;
    this.noteType = type;
  }

  render() {
    this.ctx.ctx.lineWidth = 6;
    this.ctx.ctx.strokeStyle = NoteColor[this.noteType]
    this.ctx.ctx.beginPath();
    this.ctx.ctx.moveTo(this.x - 40 - this.width / 2, this.y + -this.ctx.translate[1] - 4);
    this.ctx.ctx.lineTo(this.x - 40 - this.width / 2 + this.width, this.y + -this.ctx.translate[1] - 4);
    this.ctx.ctx.stroke();
  }
}