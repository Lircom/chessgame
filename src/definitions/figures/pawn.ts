import { Figure } from "./figure";
import { TileColor } from "../tile"
import { tileDescriptionToRowAndColumn } from "../functions"
import { Board } from "../board"

export class Pawn extends Figure {
  getCharacter() {
    return this.color === TileColor.White ? "♙" : "♟"
  }
  isPermittedMove(from: string, to: string, board: Board): boolean {
    let [fromRow, fromColumn] = tileDescriptionToRowAndColumn(from)
    let [toRow, toColumn] = tileDescriptionToRowAndColumn(to)

    if(!(toRow < fromRow && this.color === TileColor.Black)) {
      return false
    }

    return true
  }
}
