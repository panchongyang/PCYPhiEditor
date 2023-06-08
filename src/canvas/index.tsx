import { useContext, useEffect, useMemo, useRef, useState } from "react";
import { Layer, Layers } from "../layer/layer";
import { Editor } from "./EditorRender/EditorRender";
import { CanvasContext } from "./canvas";
import { BackgroundRender } from "./EditorRender/bg";
import { MusicInfo } from "./EditorRender/music";
import { Grid } from "./EditorRender/grid";
import { EditorContext, EditorContextValue } from "../EditorContext";
import { CursorNote } from "./EditorRender/cursornote";
import { PreGridNote } from "./EditorRender/pregridnote";

const layers = new Layers();

for (let i = 0; i < 5; i++) {
  const layer = new Layer(i);
  layers.add(layer);
}

const music = new MusicInfo(120, 180);
const height = 976;
const width = 1200;

export const ICanvas: React.FC<{
  scrollTop: number;
}> = (props) => {
  const { scrollTop } = props;
  const ref = useRef<HTMLCanvasElement>(null);
  const [canvasContext, setCanvasContext] = useState<CanvasContext | null>(
    null
  );
  const [editor, setEditor] = useState<Editor | null>(null);
  const {
    value: { beatGutter, dividerNumber },
  } = useContext(EditorContext);
  const [move, setMove] = useState<[number, number]>([0, 0]);
  const {
    value: { noteType, note },
    set,
  } = useContext(EditorContext);

  useEffect(() => {
    if (ref.current) {
      const ctx = ref.current.getContext("2d");
      if (ctx) {
        const canvasContext = new CanvasContext(
          width,
          height,
          ctx,
          ref.current
        );
        setCanvasContext(canvasContext);
        const editor = new Editor(canvasContext, layers);
        setEditor(editor);
      }
    }
  }, []);

  useEffect(() => {
    if (canvasContext && editor) {
      canvasContext.ctx.save();
      canvasContext.clear();
      canvasContext.setTranslate(0, -scrollTop);
      canvasContext.ctx.translate(0, -scrollTop);
      editor.appendRender(new BackgroundRender(canvasContext, layers), 0);
      editor.appendRender(
        new Grid(canvasContext, layers, {
          music: music,
          gutter: beatGutter,
          divide: dividerNumber,
        }),
        1
      );
      editor.appendRender(
        new CursorNote(canvasContext, layers, move[0], move[1], noteType),
        2
      );
      editor.appendRender(
        new PreGridNote(canvasContext, layers, move[0], move[1], noteType, {
          gutter: beatGutter,
          divide: dividerNumber,
        }),
        2
      );
      editor.flush();
      canvasContext.ctx.translate(0, 0);
      canvasContext.ctx.restore();
    }
  }, [
    scrollTop,
    canvasContext,
    editor,
    beatGutter,
    dividerNumber,
    move,
    noteType,
  ]);

  const preGridNoteBeat = useMemo(() => {
    if (canvasContext) {
      const cursorY = move[1] + -canvasContext.translate[1] - 4 - 30;
      const renderY =
        (cursorY % (beatGutter / dividerNumber) > beatGutter / dividerNumber / 2
          ? cursorY +
            beatGutter / dividerNumber -
            (cursorY % (beatGutter / dividerNumber))
          : cursorY - (cursorY % (beatGutter / dividerNumber))) + 30;
      const beat =
        music.beatCount -
        (renderY - (renderY % (beatGutter / dividerNumber))) /
          (beatGutter / dividerNumber) /
          dividerNumber;
      return [
        Math.floor(beat),
        ((renderY - 30) % beatGutter) / (beatGutter / dividerNumber) === 0
          ? 0
          : dividerNumber -
            ((renderY - 30) % beatGutter) / (beatGutter / dividerNumber),
        dividerNumber,
      ];
    } else {
      return [NaN, NaN, NaN];
    }
  }, [beatGutter, canvasContext, dividerNumber, move]);

  return (
    <div
      style={{
        position: "relative",
      }}
    >
      <canvas
        onClick={() => {
          if (set) {
            set((value) => {
              console.log(preGridNoteBeat);
              return {
                ...value,
                note: [
                  ...value.note,
                  {
                    beat: preGridNoteBeat,
                    type: noteType,
                  },
                ],
              } as EditorContextValue;
            });
          }
        }}
        style={{
          position: "sticky",
          top: 6,
          left: 15,
          cursor: "none",
        }}
        onMouseMove={(e) => {
          const x = e.clientX;
          const y = e.clientY;
          setMove([x, y]);
        }}
        width={width}
        height={height}
        ref={ref}
      ></canvas>
      <div
        style={{
          height: beatGutter * music.beatCount + 60 - height,
        }}
      ></div>
    </div>
  );
};
