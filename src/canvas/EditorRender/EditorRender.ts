import { Layers } from "../../layer/layer";
import { RenderUnit } from "../../renderunit/renderunit";
import { CanvasContext } from "../canvas";
import { Render } from "./Render";

export class Editor {
  ctx: CanvasContext;
  layers: Layers;
  
  constructor(ctx: CanvasContext, layers: Layers) {
    this.ctx = ctx;
    this.layers = layers;
  }

  appendRender(render: Render, level: number) {
    this.layers.layers[level].appendRender(new RenderUnit(this.ctx, render.render.bind(render)));
  }

  flush() {
    this.layers.flush();
  }
}
