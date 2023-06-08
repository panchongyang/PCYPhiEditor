export type NoteType = "note" | "flicker" | "hold" | "drag";

export enum NoteColor {
  "note" = "#0088ff",
  "flicker" = "#ff4646",
  "hold" = "#0088ff",
  "drag" = "#fff347", 
}

export interface Note {
  type: NoteType;
  beat: [number, number, number];
}
