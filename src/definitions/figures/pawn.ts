import { Figure } from "./figure";
import { TileColor } from "../tile"
import { tileDescriptionToRowAndColumn, rowAndColumnToIndex } from "../functions"
import { Board } from "../board"

export class Pawn extends Figure {
  getCharacter() {
    return this.color === TileColor.White ? "♙" : "♟"
  }
  isPermittedMove(from: string, to: string, board: Board): boolean {
    let [fromRow, fromColumn] = tileDescriptionToRowAndColumn(from)
    let [toRow, toColumn] = tileDescriptionToRowAndColumn(to)

    // Verbietet es weiß zurück zu gehen
    if(toRow <= fromRow && this.color === TileColor.White) {
      return false
    }

    // Verbietet es Schwarz zurück zu gehen
    if(toRow >= fromRow && this.color === TileColor.Black) {
      return false
    }

    // Verbietet es mehr als 2 Felder zur Seite zu gehen
    if(toColumn > fromColumn + 1 || toColumn < fromColumn - 1) {
      return false
    }

    // Verbietet es Schwarz mehr als 1 Feld zu gehen es sei denn es ist das Anfangsfeld
    if(toRow < fromRow - 1 && this.color === TileColor.Black && fromRow !== 6){
      return false
    }

    // Verbietet es Weiß mehr als 1 Feld zu gehen es sei denn es ist das Anfangsfeld
    if(toRow > fromRow + 1 && this.color === TileColor.White && fromRow !== 1){
      return false
    }

    // Verbietet es Schwarz mehr als 2 Felder zu gehen
    if(toRow < fromRow - 2 && this.color === TileColor.Black){
      return false
    }

    // Verbietet es Weiß mehr als 2 Felder zu gehen
    if(toRow > fromRow + 2 && this.color === TileColor.White){
      return false
    }

    // Verbietet diagonale Bewegungen außer es wird dabei geschlagen
    let toIndex = rowAndColumnToIndex(toRow, toColumn)
    let fromIndex = rowAndColumnToIndex(fromRow, fromColumn)

    if(this.color === TileColor.Black && toIndex === fromIndex - 9  && !board.tiles[toIndex].figure) {
      return false
    }

    if(this.color === TileColor.Black && toIndex === fromIndex - 7  && !board.tiles[toIndex].figure) {
      return false
    }

    if(this.color === TileColor.White && toIndex === fromIndex + 7  && !board.tiles[toIndex].figure) {
      return false
    }

    if(this.color === TileColor.White && toIndex === fromIndex + 9  && !board.tiles[toIndex].figure) {
      return false
    }

    // TODO: En Passant
    
    return true
  }
}
