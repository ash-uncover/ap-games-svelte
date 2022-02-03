import {
  selectedTile,
} from 'stores/game.js'
import {
  TILES_MAP,
} from 'stores/tiles.js'

let selectedTileValue
selectedTile.subscribe(value => {
  selectedTileValue = value
})

export function selectTile(id) {
  if (selectedTileValue) {
    TILES_MAP[selectedTileValue].update(tile => ({
      ...tile,
      selected: false
    }))
  }
  if (id !== selectedTileValue) {
    TILES_MAP[id].update(tile => ({
      ...tile,
      selected: true
    }))
    selectedTile.set(id)
  } else {
    selectedTile.set(null)
  }
}