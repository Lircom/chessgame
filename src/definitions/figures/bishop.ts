import { Figure } from "./figure";
import { TileColor } from "../tile"
import { tileDescriptionToRowAndColumn, rowAndColumnToIndex } from "../functions"
import { Board } from "../board"


export class Bishop extends Figure {
  getCharacter() {
    return this.color === TileColor.White ? "♗" : "♝"
  }
  isPermittedMove(from: string, to: string, board: Board): boolean {
    let [fromRow, fromColumn] = tileDescriptionToRowAndColumn(from)
    let [toRow, toColumn] = tileDescriptionToRowAndColumn(to)
    let columnDistance = Math.abs(toColumn - fromColumn)
    let rowDistance = Math.abs(toRow - fromRow)

    if( columnDistance !== rowDistance ) {
      return false
    }

    // TODO: Figur im Weg
    return true
  }
}
