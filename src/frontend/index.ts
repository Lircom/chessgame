import { rowAndColumnToIndex, indexToTileDescription, tileDescriptionToIndex } from "../definitions/functions";
import { Board } from "../definitions/board";
import { TileColor} from "../definitions/tile";

export class Game {
  board: Board
  selectedTile: number
  turnNumber: number

  constructor() {
    this.board = new Board()
  }

  play() {
    document.getElementById("move").addEventListener("click", () => this.handleMove());

    this.displayBoard()
  }

  moveFigure(from, to) {
    let figureIndex = tileDescriptionToIndex(from)
    let figureColor = this.board.tiles[figureIndex].figure.color
    let turnColor =(this.turnNumber||0) % 2 === 0 ? TileColor.White : TileColor.Black

    if (figureColor !== turnColor) {
      alert("Du bist nicht am Zug")
      return
    }

    let wasMoved = this.board.moveFigure(from, to)
    if (wasMoved) {
      this.incrementTurnNumber()
    }
  }

  incrementTurnNumber() {
    this.turnNumber = (this.turnNumber||0) + 1
    let turnNumberElement = document.getElementById("turn-number")
    turnNumberElement.innerHTML = "" + this.turnNumber
  }

  handleClick(row, column){
    let index = rowAndColumnToIndex(row, column)

    if (this.selectedTile) {
      if (this.selectedTile === index ) {
        this.selectedTile = null
        this.displayBoard()
         return
      }
      else {
        let from = indexToTileDescription(this.selectedTile)
        let to = indexToTileDescription(index)

        this.moveFigure(from, to)
        this.selectedTile = null
        this.displayBoard()
      }
    }
    else {
      let tile = this.board.tiles[index];
      if (!tile.figure) {
          return
      }
      else {
        this.selectedTile = index
        this.displayBoard()
      }
    }

  }

   displayBoard() {
    let boardElement = document.getElementById("board")
    boardElement.innerHTML = ""

    for (let row = 0; row < 8; row++) {
      for (let column = 0; column < 8; column++) {
        let index = rowAndColumnToIndex(row, column)
        let tile = this.board.tiles[index];

        let tileElement = document.createElement("div");
        tileElement.classList.add("tile")
        tileElement.classList.add(tile.color === TileColor.White ? "white" : "black")
        if(this.selectedTile === index) {
          tileElement.classList.add("selected")
        }

        tileElement.addEventListener("click", event => this.handleClick(row, column))

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

   handleMove() {
    let input = (<HTMLInputElement>document.getElementById("input")).value;
    let parts = input.split(" ");
    let from = parts[0]
    let to = parts[1]

    this.moveFigure(from, to)
    this.displayBoard()
  }
}
