import { writable } from 'svelte/store'

import {
  BOARD_TYPE,
  TILE_TERRAINS,
} from 'util/model.js'

import {
  createTile,
} from 'stores/tiles.js'

export const board = writable({
  type: BOARD_TYPE.SQUARE,
  width: 15,
  height: 15,
  tiles: []
})

let storeBoard
board.subscribe(value => {
  storeBoard = value
})

export function generateBoard(type, width, height) {
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
  board.set({
    type,
    width,
    height,
    tiles,
  })
}
