import { Figure } from "./figure";
import { TileColor } from "../tile"

export class Queen extends Figure {
  getCharacter() {
    return this.color === TileColor.White ? "♕" : "♛"
  }
}
