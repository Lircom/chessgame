export function rowAndColumnToIndex(row, column): number {
  return row * 8 + column;
}

export function indexToRowAndColumn(index): [number, number] {
  let row = Math.floor(index/8)
  let column = index - row * 8
  return [row, column]
}

export function tileDescriptionToIndex(tileDescription: string): number {
  let [row, column] = tileDescriptionToRowAndColumn(tileDescription)
  return rowAndColumnToIndex(row, column)
}

export function rowAndColumnToTileDescription(row, column): string {
  switch(column) {
    case 0: column = "a"; break;
    case 1: column = "b"; break;
    case 2: column = "c"; break;
    case 3: column = "d"; break;
    case 4: column = "e"; break;
    case 5: column = "f"; break;
    case 6: column = "g"; break;
    case 7: column = "h"; break;
  }
  let tileDescription = column + (8 - row)
  return tileDescription
}

export function indexToTileDescription(index: number): string {
  return rowAndColumnToTileDescription(...indexToRowAndColumn(index))
}

export function tileDescriptionToRowAndColumn(tileDescription: string): [number, number] {
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
