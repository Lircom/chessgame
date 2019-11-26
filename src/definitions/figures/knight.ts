import { Figure } from "./figure";
import { TileColor } from "../tile"
import { tileDescriptionToRowAndColumn } from "../functions"

export class Knight extends Figure {
  getCharacter() {
    return this.color === TileColor.White ? "♘" : "♞"
  }
}
