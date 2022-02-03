import {
  board,
} from 'stores/board.js'
import {
  selectedTile,
} from 'stores/game.js'

let boardValue
board.subscribe(value => {
  boardValue = value
})

let selectedTileValue
selectedTile.subscribe(value => {
  selectedTileValue = value
})

export function selectTile(x, y) {
  if (selectedTileValue && selectedTileValue.x > -1 && selectedTileValue.y > -1) {
    boardValue.tiles[selectedTileValue.y][selectedTileValue.x].update(tile => ({
      ...tile,
      selected: false
    }))
  }
  boardValue.tiles[y][x].update(tile => ({
    ...tile,
    selected: true
  }))
  selectedTile.set({
    x,
    y,
  })
}