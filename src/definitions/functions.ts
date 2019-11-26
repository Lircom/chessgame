export function rowAndColumnToIndex(row, column): number {
  return row * 8 + column;
}

export function tileDescriptionToIndex(tileDescription: string): number {
  let [row, column] = tileDescriptionToRowAndColumn(tileDescription)
  return rowAndColumnToIndex(row, column)
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
