import { Figure } from "./figure";
import { TileColor } from "../tile"
import { tileDescriptionToRowAndColumn, rowAndColumnToIndex } from "../functions"
import { Board } from "../board"

export class King extends Figure {
  getCharacter() {
    return this.color === TileColor.White ? "♔" : "♚"
  }
  isPermittedMove(from: string, to: string, board: Board): boolean {
    let [fromRow, fromColumn] = tileDescriptionToRowAndColumn(from)
    let [toRow, toColumn] = tileDescriptionToRowAndColumn(to)
    let toIndex = rowAndColumnToIndex(toRow, toColumn)
    let fromIndex = rowAndColumnToIndex(fromRow, fromColumn)
    let indexDistance = Math.abs(fromIndex - toIndex)

    let validDistances = [1,7,8,9]
    for (let distance of validDistances) {
      if(indexDistance === distance) {
        return true
      }
    }
    // TODO: Patt
    // TODO: Rochade
    return false
  }
}
