import { Layers } from "../../layer/layer";
import { CanvasContext } from "../canvas";

export class Render {
  public ctx: CanvasContext;
  public layers: Layers;
  
  constructor(ctx: CanvasContext, layers: Layers) {
    this.ctx = ctx;
    this.layers = layers;
  }

  render() {

  }
}