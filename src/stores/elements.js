import { writable } from 'svelte/store'

import {
  PLAYERS_MAP,
} from 'stores/players.js'
import {
  TILES_MAP,
} from 'stores/tiles.js'

let eCount = 1

export const ELEMENTS = []
export const ELEMENTS_MAP = {}

export const createElement = ({tile, type, player}) => {
  const id = `element-${eCount++}`
  const result = writable({
    id,
    type,
    tile,
    player,
  })
  ELEMENTS.push(result)
  ELEMENTS_MAP[id] = result
  PLAYERS_MAP[player].update(player => ({
    ...player,
    elements: [...player.elements, id]
  }))
  TILES_MAP[tile].update(tile => ({
    ...tile,
    elements: [...tile.elements, id]
  }))
  return id
}
