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
  ELEMENTS_MAP[id].update(element => {
    let currentX
    let currentY
    TILES_MAP[element.tile].update(tile => {
      currentX = tile.x
      currentY = tile.y
      tile.elements.splice(tile.elements.indexOf(id), 1)
      return {
        ...tile,
      }
    })
    const newX = Math.min(Math.max(currentX + deltaX, 0), boardValue.width - 1)
    const newY = Math.min(Math.max(currentY + deltaY, 0), boardValue.height - 1)
    const newTile = boardValue.tiles[newY][newX]
    TILES_MAP[newTile].update(tile => ({
      ...tile,
      elements: [...tile.elements, id],
    }))
    const result = {
      ...element,
      tile: newTile
    }
    return result
  })
}
