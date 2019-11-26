import { Board } from "../board"
import { TileColor } from "../tile"
import { tileDescriptionToRowAndColumn } from "../functions"

export class Figure {

  color: TileColor;
  constructor(color: TileColor) {
    this.color = color
  }
  getCharacter(): string {
    return ""
  }
  isPermittedMove(from: string, to: string, board: Board): boolean {
    return true
  }

}
