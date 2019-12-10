import { Figure } from "./figure";
import { TileColor } from "../tile"
import { tileDescriptionToRowAndColumn, rowAndColumnToIndex } from "../functions"
import { Board } from "../board"

export class Knight extends Figure {
  getCharacter() {
    return this.color === TileColor.White ? "♘" : "♞"
  }
  isPermittedMove(from: string, to: string, board: Board): boolean {
    let [fromRow, fromColumn] = tileDescriptionToRowAndColumn(from)
    let [toRow, toColumn] = tileDescriptionToRowAndColumn(to)
    let toIndex = rowAndColumnToIndex(toRow, toColumn)
    let fromIndex = rowAndColumnToIndex(fromRow, fromColumn)
    let indexDistance = Math.abs(fromIndex - toIndex)

    let validDistances = [17,15,6,10]
    for (let distance of validDistances) {
      if(indexDistance === distance) {
        return true
      }
    }

    return false
  }
}
