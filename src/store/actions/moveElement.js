import {
  computeTile
} from 'util/board.js'

export function moveElement(board, element, deltaX, deltaY) {
  let currentX
  let currentY
  element.subscribe(e => {
    e.tile.subscribe(t => {
      currentX = t.x
      currentY = t.y
    })()
  })()
  const newTile = computeTile(board, currentX, currentY, deltaX, deltaY)
  if (newTile) {
    element.setTile(newTile)
    return true
  }
  return false
}
