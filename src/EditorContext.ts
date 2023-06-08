import React from "react";
import { Note, NoteType } from "./type";

export interface EditorContextValue {
  beatGutter: number;
  dividerNumber: number;
  noteType: NoteType;
  note: Note[]
}

export interface EditorContextState {
  set: React.Dispatch<React.SetStateAction<EditorContextValue>> | null;
  value: EditorContextValue
}

export const EditorContext = React.createContext<EditorContextState>({
  set: null,
  value: {
    beatGutter: 240,
    dividerNumber: 4,
    noteType: 'note',
    note: []
  }
});
