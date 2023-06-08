import React, { useMemo, useState } from "react";
import "./App.css";
import { ICanvas } from "./canvas";
import { NotesControl } from "./controls/notes/NotesControl";
import { EditorContext, EditorContextValue } from "./EditorContext";
import { DividerNumberControl } from "./controls/divider/DividerNumberControl";
import { GutterControl } from "./controls/gutter/GutterControl";
import { debounce } from "./debounce";

function App() {
  const [canvasScrollTop, setTop] = useState(0);
  const [editorContextValue, setEditor] = useState<EditorContextValue>({
    beatGutter: 240,
    dividerNumber: 4,
    noteType: 'note',
    note: []
  });

  const callback = useMemo(
    () =>
      debounce((e) => {
        setTop((e.target as HTMLDivElement).scrollTop);
      }, 0),
    []
  );

  return (
    <EditorContext.Provider value={{
      value: editorContextValue,
      set: setEditor
    }}>
      <div className="App">
        <div
          onScroll={(e) => {
            callback(e);
          }}
          className="canvas-content"
        >
          <ICanvas scrollTop={canvasScrollTop}></ICanvas>
        </div>
        <div className="controls">
          <NotesControl />
          <DividerNumberControl />
          <GutterControl />
        </div>
      </div>
    </EditorContext.Provider>
  );
}

export default App;
