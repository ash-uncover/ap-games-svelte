import { writable } from 'svelte/store'

import {
  BOARD_TYPE,
  TILE_TERRAINS,
} from 'util/model.js'

import {
  createTile,
} from 'store/stores/tiles.js'

function createBoard() {
  const { subscribe, set, update } = writable({
    type: null,
    width: 0,
    height: 0,
    tiles: []
  });

	return {
		subscribe,
		handleGenerateBoard: ({ type, width, height }) => {
      const tiles = []
      for (let y = 0 ; y < height ; y++) {
        const row = []
        tiles.push(row)
        for (let x = 0 ; x < (width + (type === BOARD_TYPE.HEX ? (y)%2 : 0)) ; x++) {
          const tileId = createTile({
            x,
            y,
            terrain: TILE_TERRAINS[(x+y)%TILE_TERRAINS.length],
          })
          row.push(tileId)
        }
      }
      const board = {
        type,
        width,
        height,
        tiles,
      }
      set(board)
    }
	}
}
export const board = createBoard()
