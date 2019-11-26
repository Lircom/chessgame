import { Figure } from "./figure";
import { TileColor } from "../tile"

export class Rook extends Figure {
  getCharacter() {
    return this.color === TileColor.White ? "♖" : "♜"
  }

}
