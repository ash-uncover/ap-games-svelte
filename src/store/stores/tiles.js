import { writable } from 'svelte/store'

export const TILES = []
export const TILES_MAP = {}

export const createTile = ({x, y, terrain}) => {
  const id = `tile-${TILES.length + 1}`
  const result = writable({
    id,
    x,
    y,
    terrain,
    selected: false,
    elements: []
  })
  TILES.push(result)
  TILES_MAP[id] = result
  return id
}
