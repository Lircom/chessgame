//powershell//

enum TileColor {
    White,
    Black,
}

class Figure {

  color: TileColor;
  constructor(color: TileColor) {
    this.color = color
  }
  getCharacter(): string {
    return ""
  }
  isPermittedMove(from: string, to: string, board: Board): boolean {
    return true
  }

}

class Pawn extends Figure {
  getCharacter() {
    return this.color === TileColor.White ? "♙" : "♟"
  }
  isPermittedMove(from: string, to: string, board: Board): boolean {
    let [fromRow, fromColumn] = tileDescriptionToRowAndColumn(from)
    let [toRow, toColumn] = tileDescriptionToRowAndColumn(to)

    if(!(toRow < fromRow && this.color === TileColor.Black)) {
      return false
    }

    return true
  }
}

class Rook extends Figure {
  getCharacter() {
    return this.color === TileColor.White ? "♖" : "♜"
  }

}

class Knight extends Figure {
  getCharacter() {
    return this.color === TileColor.White ? "♘" : "♞"
  }
}

class Bishop extends Figure {
  getCharacter() {
    return this.color === TileColor.White ? "♗" : "♝"
  }
}

class Queen extends Figure {
  getCharacter() {
    return this.color === TileColor.White ? "♕" : "♛"
  }
}

class King extends Figure {
  getCharacter() {
    return this.color === TileColor.White ? "♔" : "♚"
  }
}



class Tile {
  color: TileColor;
  figure: Figure;

  constructor(color: TileColor) {
    this.color = color;
    this.figure = null;
  }

  getCharacter() {
    if (this.figure) {
      return this.figure.getCharacter()
    } else {
      return this.color === TileColor.White ? "	□" : "■	"
    }
  }
}


function rowAndColumnToIndex(row, column): number {
  return row * 8 + column;
}

function tileDescriptionToIndex(tileDescription: string): number {
  let [row, column] = tileDescriptionToRowAndColumn(tileDescription)
  return rowAndColumnToIndex(row, column)
}

function tileDescriptionToRowAndColumn(tileDescription: string): [number, number] {
  let column;
  switch(tileDescription.charAt(0).toLowerCase()) {
    case "a": column = 0; break;
    case "b": column = 1; break;
    case "c": column = 2; break;
    case "d": column = 3; break;
    case "e": column = 4; break;
    case "f": column = 5; break;
    case "g": column = 6; break;
    case "h": column = 7; break;
  }

  let row = 8 - parseInt(tileDescription.charAt(1));

  return [row,column]
}

class Board {
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

    let fromTile = board.tiles[fromIndex]
    let toTile = board.tiles[toIndex]

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

//---------

function displayBoard() {
  let boardElement = document.getElementById("board")
  boardElement.innerHTML = ""

  for (let row = 0; row < 8; row++) {
    for (let column = 0; column < 8; column++) {
      let index = rowAndColumnToIndex(row, column)
      let tile = board.tiles[index];

      let tileElement = document.createElement("div");
      tileElement.classList.add("tile")
      tileElement.classList.add(tile.color === TileColor.White ? "white" : "black")

      let figure = tile.figure;
      if (figure) {
        let figureElement = document.createElement("div");
        figureElement.classList.add("figure")
        figureElement.classList.add(figure.color === TileColor.White ? "white" : "black")
        figureElement.append(tile.getCharacter())
        tileElement.appendChild(figureElement)
      }

      boardElement.appendChild(tileElement)
    }
  }

}

function handleMove() {
  let input = (<HTMLInputElement>document.getElementById("input")).value;
  let parts = input.split(" ");
  let from = parts[0]
  let to = parts[1]

  board.moveFigure(from, to)
  displayBoard()
}

document.getElementById("move").addEventListener("click", handleMove);

//---------
let board = new Board()
displayBoard()
