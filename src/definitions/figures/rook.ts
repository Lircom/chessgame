import { Figure } from "./figure";
import { TileColor } from "../tile"
import { tileDescriptionToRowAndColumn, rowAndColumnToIndex } from "../functions"
import { Board } from "../board"

export class Rook extends Figure {
  getCharacter() {
    return this.color === TileColor.White ? "♖" : "♜"
  }
  isPermittedMove(from: string, to: string, board: Board): boolean {
    let [fromRow, fromColumn] = tileDescriptionToRowAndColumn(from)
    let [toRow, toColumn] = tileDescriptionToRowAndColumn(to)

    if(fromRow !== toRow && fromColumn !== toColumn) {
      return false
    }

    // TODO: Rochade
    // TODO: Figur im Weg
    
    return true
  }


}
