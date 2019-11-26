import {Tile, TileColor} from "./tile";
import {rowAndColumnToIndex, tileDescriptionToRowAndColumn} from "./functions"
import { Rook } from "./figures/rook"
import { Pawn } from "./figures/pawn"
import { King } from "./figures/king"
import { Queen } from "./figures/queen"
import { Knight } from "./figures/knight"
import { Bishop } from "./figures/bishop"



export class Board {
  tiles: Tile[] = []

  constructor() {
    for (let row = 0; row < 8; row++) {
      for (let column = 0; column < 8; column++) {
        let color;

        if (row % 2 === 0) {
          color = (column % 2 === 0) ? TileColor.White : TileColor.Black;
        } else {
          color = (column % 2 === 1) ? TileColor.White : TileColor.Black;
        }

        let tile: Tile = new Tile(color)
        this.tiles.push(tile)
      }
    }

    this.setUpFigures()
  }

  setUpFigures() {

    this.tiles[0].figure = new Rook(TileColor.White)
    this.tiles[1].figure = new Knight(TileColor.White)
    this.tiles[2].figure = new Bishop(TileColor.White)
    this.tiles[3].figure = new King(TileColor.White)
    this.tiles[4].figure = new Queen(TileColor.White)
    this.tiles[5].figure = new Bishop(TileColor.White)
    this.tiles[6].figure = new Knight(TileColor.White)
    this.tiles[7].figure = new Rook(TileColor.White)
    for (let i = 8; i < 16; i++) {
      this.tiles[i].figure = new Pawn(TileColor.White)
    }
    this.tiles[63].figure = new Rook(TileColor.Black)
    this.tiles[62].figure = new Knight(TileColor.Black)
    this.tiles[61].figure = new Bishop(TileColor.Black)
    this.tiles[60].figure = new King(TileColor.Black)
    this.tiles[59].figure = new Queen(TileColor.Black)
    this.tiles[58].figure = new Bishop(TileColor.Black)
    this.tiles[57].figure = new Knight(TileColor.Black)
    this.tiles[56].figure = new Rook(TileColor.Black)
    for (let i = 48 ; i < 56; i++) {
      this.tiles[i].figure = new Pawn(TileColor.Black)
  }
}

moveFigure(from: string, to: string) {
  let [fromRow, fromColumn] = tileDescriptionToRowAndColumn(from)
  let fromIndex = rowAndColumnToIndex(fromRow, fromColumn)

  let [toRow, toColumn] = tileDescriptionToRowAndColumn(to)
  let toIndex = rowAndColumnToIndex(toRow, toColumn)

  let fromTile = this.tiles[fromIndex]
  let toTile = this.tiles[toIndex]

  if (!fromTile.figure) {
    alert("Ursprungsfeld ist leer")
    return
  }

  if (toTile.figure && fromTile.figure.color === toTile.figure.color) {
    alert("Feld ist Besetzt")
    return
  }

  if (!fromTile.figure.isPermittedMove(from, to, this)) {
    alert("Figur darf sich nicht so bewegen!")
    return
  }

  toTile.figure = fromTile.figure
  fromTile.figure = null;
}
}
