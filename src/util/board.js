export function computeTile(board, x, y, deltaX, deltaY) {
  const newX = x + deltaX
  const newY = y + deltaY
  const validX = deltaX ? (-1 < newX && newX < board.width) : true
  const validY = deltaY ? (-1 < newY && newY < board.height) : true
  if (validX && validY) {
    return board.tiles[newY][newX]
  }
  return null
}