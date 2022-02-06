import { writable } from 'svelte/store'

let id = 1
export const TILES = {}

export const createTile = ({x, y, terrain}) => {
  const id = `tile-${id++}`
  const { subscribe, set, update } = writable({
    id,
    x,
    y,
    terrain,
  })
  const result = {
    subscribe
  }
  TILES[id] = result
  return result
}

export const deleteTile = ({id}) => {
  delete TILES[id]
}
