import { rowAndColumnToIndex } from "../definitions/functions";
import { Board } from "../definitions/board";
import { TileColor} from "../definitions/tile";

export class Game {
  board: Board

  constructor() {
    this.board = new Board()
  }

  play() {
    document.getElementById("move").addEventListener("click", () => this.handleMove());

    this.displayBoard()
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

    this.board.moveFigure(from, to)
    this.displayBoard()
  }
}
