import { Figure } from "./figures/figure";

export enum TileColor {
    White,
    Black,
}

export class Tile {
  color: TileColor;
  figure: Figure;


  constructor(color: TileColor) {
    this.color = color;
    this.figure = null;
  }

  getCharacter() {
    if (this.figure) {
      return this.figure.getCharacter()
    } else {
      return this.color === TileColor.White ? "	□" : "■	"
    }
  }
}
