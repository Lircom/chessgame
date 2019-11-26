import { Figure } from "./figure";
import { TileColor } from "../tile"
import { tileDescriptionToRowAndColumn } from "../functions"

export class King extends Figure {
  getCharacter() {
    return this.color === TileColor.White ? "♔" : "♚"
  }
}
