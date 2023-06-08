declare class RenderUnit {
  render(): void;
}

export class Layer {
  level: number;
  renders: RenderUnit[] = [];

  constructor(level: number) {
    this.level = level;
  }

  appendRender(render: RenderUnit) {
    this.renders.push(render);
  }

  flushRenders() {
    while(this.renders.length) {
      this.renders.pop()?.render();
    }
  }
}

export class Layers {
  layers: Layer[] = [];

  add(layer: Layer) {
    let i = 0
    for(i; i < this.layers.length; i++) {
      if(this.layers[i].level > layer.level) {
        break;
      }
    }
    this.layers = [...this.layers.slice(0, i), layer, ...this.layers.slice(i)];
  }

  flush() {
    this.layers.forEach((item) => {
      item.flushRenders();
    });
  }
}