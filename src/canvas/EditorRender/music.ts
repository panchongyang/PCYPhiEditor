export class MusicInfo {
  time: number;
  bpm: number;
  beatCount: number;

  constructor(time: number, bpm: number) {
    this.time = time;
    this.bpm = bpm;
    this.beatCount = (time / 60) * bpm;
  }
}