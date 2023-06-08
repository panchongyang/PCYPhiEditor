import { Layers } from "../../layer/layer";
import { NoteColor, NoteType } from "../../type";
import { CanvasContext } from "../canvas";
import { CursorNote } from "./cursornote";

export class PreGridNote extends CursorNote {
  grid: {
    gutter: number;
    divide: number;
  };
  beat: number = 0;

  constructor(
    ctx: CanvasContext,
    layers: Layers,
    x: number,
    y: number,
    type: NoteType,
    grid: {
      gutter: number;
      divide: number;
    }
  ) {
    super(ctx, layers, x, y, type);
    this.grid = grid;
  }

  render() {
    this.ctx.ctx.lineWidth = 6;
    this.ctx.ctx.strokeStyle = NoteColor[this.noteType] + "aa";
    this.ctx.ctx.beginPath();
    const cursorY = this.y + -this.ctx.translate[1] - 4 - 30;
    const renderY =
      (cursorY % (this.grid.gutter / this.grid.divide) >
      this.grid.gutter / this.grid.divide / 2
        ? cursorY +
          this.grid.gutter / this.grid.divide -
          (cursorY % (this.grid.gutter / this.grid.divide))
        : cursorY - (cursorY % (this.grid.gutter / this.grid.divide))) + 30;
    this.beat = (cursorY - (cursorY % (this.grid.gutter / this.grid.divide))) / (this.grid.gutter / this.grid.divide) / this.grid.divide;
    this.ctx.ctx.moveTo(this.x - 40 - this.width / 2, renderY);
    this.ctx.ctx.lineTo(this.x - 40 - this.width / 2 + this.width, renderY);
    this.ctx.ctx.stroke();
  }
}
