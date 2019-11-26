//powershell//
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var TileColor;
(function (TileColor) {
    TileColor[TileColor["White"] = 0] = "White";
    TileColor[TileColor["Black"] = 1] = "Black";
})(TileColor || (TileColor = {}));
var Figure = /** @class */ (function () {
    function Figure(color) {
        this.color = color;
    }
    Figure.prototype.getCharacter = function () {
        return "";
    };
    Figure.prototype.isPermittedMove = function (from, to, board) {
        return true;
    };
    return Figure;
}());
var Pawn = /** @class */ (function (_super) {
    __extends(Pawn, _super);
    function Pawn() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Pawn.prototype.getCharacter = function () {
        return this.color === TileColor.White ? "♙" : "♟";
    };
    Pawn.prototype.isPermittedMove = function (from, to, board) {
        var _a = tileDescriptionToRowAndColumn(from), fromRow = _a[0], fromColumn = _a[1];
        var _b = tileDescriptionToRowAndColumn(to), toRow = _b[0], toColumn = _b[1];
        if (!(toRow < fromRow && this.color === TileColor.Black)) {
            return false;
        }
        return true;
    };
    return Pawn;
}(Figure));
var Rook = /** @class */ (function (_super) {
    __extends(Rook, _super);
    function Rook() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Rook.prototype.getCharacter = function () {
        return this.color === TileColor.White ? "♖" : "♜";
    };
    return Rook;
}(Figure));
var Knight = /** @class */ (function (_super) {
    __extends(Knight, _super);
    function Knight() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Knight.prototype.getCharacter = function () {
        return this.color === TileColor.White ? "♘" : "♞";
    };
    return Knight;
}(Figure));
var Bishop = /** @class */ (function (_super) {
    __extends(Bishop, _super);
    function Bishop() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Bishop.prototype.getCharacter = function () {
        return this.color === TileColor.White ? "♗" : "♝";
    };
    return Bishop;
}(Figure));
var Queen = /** @class */ (function (_super) {
    __extends(Queen, _super);
    function Queen() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Queen.prototype.getCharacter = function () {
        return this.color === TileColor.White ? "♕" : "♛";
    };
    return Queen;
}(Figure));
var King = /** @class */ (function (_super) {
    __extends(King, _super);
    function King() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    King.prototype.getCharacter = function () {
        return this.color === TileColor.White ? "♔" : "♚";
    };
    return King;
}(Figure));
var Tile = /** @class */ (function () {
    function Tile(color) {
        this.color = color;
        this.figure = null;
    }
    Tile.prototype.getCharacter = function () {
        if (this.figure) {
            return this.figure.getCharacter();
        }
        else {
            return this.color === TileColor.White ? "	□" : "■	";
        }
    };
    return Tile;
}());
function rowAndColumnToIndex(row, column) {
    return row * 8 + column;
}
function tileDescriptionToIndex(tileDescription) {
    var _a = tileDescriptionToRowAndColumn(tileDescription), row = _a[0], column = _a[1];
    return rowAndColumnToIndex(row, column);
}
function tileDescriptionToRowAndColumn(tileDescription) {
    var column;
    switch (tileDescription.charAt(0).toLowerCase()) {
        case "a":
            column = 0;
            break;
        case "b":
            column = 1;
            break;
        case "c":
            column = 2;
            break;
        case "d":
            column = 3;
            break;
        case "e":
            column = 4;
            break;
        case "f":
            column = 5;
            break;
        case "g":
            column = 6;
            break;
        case "h":
            column = 7;
            break;
    }
    var row = 8 - parseInt(tileDescription.charAt(1));
    return [row, column];
}
var Board = /** @class */ (function () {
    function Board() {
        this.tiles = [];
        for (var row = 0; row < 8; row++) {
            for (var column = 0; column < 8; column++) {
                var color = void 0;
                if (row % 2 === 0) {
                    color = (column % 2 === 0) ? TileColor.White : TileColor.Black;
                }
                else {
                    color = (column % 2 === 1) ? TileColor.White : TileColor.Black;
                }
                var tile = new Tile(color);
                this.tiles.push(tile);
            }
        }
        this.setUpFigures();
    }
    Board.prototype.setUpFigures = function () {
        this.tiles[0].figure = new Rook(TileColor.White);
        this.tiles[1].figure = new Knight(TileColor.White);
        this.tiles[2].figure = new Bishop(TileColor.White);
        this.tiles[3].figure = new King(TileColor.White);
        this.tiles[4].figure = new Queen(TileColor.White);
        this.tiles[5].figure = new Bishop(TileColor.White);
        this.tiles[6].figure = new Knight(TileColor.White);
        this.tiles[7].figure = new Rook(TileColor.White);
        for (var i = 8; i < 16; i++) {
            this.tiles[i].figure = new Pawn(TileColor.White);
        }
        this.tiles[63].figure = new Rook(TileColor.Black);
        this.tiles[62].figure = new Knight(TileColor.Black);
        this.tiles[61].figure = new Bishop(TileColor.Black);
        this.tiles[60].figure = new King(TileColor.Black);
        this.tiles[59].figure = new Queen(TileColor.Black);
        this.tiles[58].figure = new Bishop(TileColor.Black);
        this.tiles[57].figure = new Knight(TileColor.Black);
        this.tiles[56].figure = new Rook(TileColor.Black);
        for (var i = 48; i < 56; i++) {
            this.tiles[i].figure = new Pawn(TileColor.Black);
        }
    };
    Board.prototype.moveFigure = function (from, to) {
        var _a = tileDescriptionToRowAndColumn(from), fromRow = _a[0], fromColumn = _a[1];
        var fromIndex = rowAndColumnToIndex(fromRow, fromColumn);
        var _b = tileDescriptionToRowAndColumn(to), toRow = _b[0], toColumn = _b[1];
        var toIndex = rowAndColumnToIndex(toRow, toColumn);
        var fromTile = board.tiles[fromIndex];
        var toTile = board.tiles[toIndex];
        if (!fromTile.figure) {
            alert("Ursprungsfeld ist leer");
            return;
        }
        if (toTile.figure && fromTile.figure.color === toTile.figure.color) {
            alert("Feld ist Besetzt");
            return;
        }
        if (!fromTile.figure.isPermittedMove(from, to, this)) {
            alert("Figur darf sich nicht so bewegen!");
            return;
        }
        toTile.figure = fromTile.figure;
        fromTile.figure = null;
    };
    return Board;
}());
//---------
function displayBoard() {
    var boardElement = document.getElementById("board");
    boardElement.innerHTML = "";
    for (var row = 0; row < 8; row++) {
        for (var column = 0; column < 8; column++) {
            var index = rowAndColumnToIndex(row, column);
            var tile = board.tiles[index];
            var tileElement = document.createElement("div");
            tileElement.classList.add("tile");
            tileElement.classList.add(tile.color === TileColor.White ? "white" : "black");
            var figure = tile.figure;
            if (figure) {
                var figureElement = document.createElement("div");
                figureElement.classList.add("figure");
                figureElement.classList.add(figure.color === TileColor.White ? "white" : "black");
                figureElement.append(tile.getCharacter());
                tileElement.appendChild(figureElement);
            }
            boardElement.appendChild(tileElement);
        }
    }
}
function handleMove() {
    var input = document.getElementById("input").value;
    var parts = input.split(" ");
    var from = parts[0];
    var to = parts[1];
    board.moveFigure(from, to);
    displayBoard();
}
document.getElementById("move").addEventListener("click", handleMove);
//---------
var board = new Board();
displayBoard();
