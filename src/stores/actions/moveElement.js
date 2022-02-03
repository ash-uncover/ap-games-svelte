import {
  board,
} from 'stores/board.js'
import {
  ELEMENTS_MAP,
} from 'stores/elements.js'
import {
  TILES_MAP,
} from 'stores/tiles.js'

let boardValue
board.subscribe(value => {
  boardValue = value
})

export function moveElement(id, deltaX, deltaY) {
  let result = false
  ELEMENTS_MAP[id].update(element => {
    let currentX
    let currentY
    TILES_MAP[element.tile].subscribe(tile => {
      currentX = tile.x
      currentY = tile.y
    })()
    const newX = currentX + deltaX
    const newY = currentY + deltaY
    const validX = deltaX ? (-1 < newX && newX < boardValue.width) : true
    const validY = deltaY ? (-1 < newY && newY < boardValue.height) : true
    if (validX && validY) {
      TILES_MAP[element.tile].update(tile => {
        tile.elements.splice(tile.elements.indexOf(id), 1)
        return {
          ...tile,
        }
      })
      const newTileId = boardValue.tiles[newY][newX]
      TILES_MAP[newTileId].update(tile => ({
        ...tile,
        elements: [...tile.elements, id],
      }))
      result = true
      return {
        ...element,
        tile: newTileId
      }
    }
    return element
  })
  return result
}
