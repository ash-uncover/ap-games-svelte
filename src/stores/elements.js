import { writable } from 'svelte/store'

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
  TILES_MAP[tile].update(tile => ({
    ...tile,
    elements: [...tile.elements, id]
  }))
  return id
}
