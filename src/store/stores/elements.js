import { writable } from 'svelte/store'

let ID_NUM = 1
export const ELEMENTS = {}

export const createElement = ({ player, type }) => {
  const id = `element-${ID_NUM++}`
  const { subscribe, set, update } = writable({
    id,
    player,
    type,
  })
  const result = {
    subscribe,
    handleAddTileElement: (element, tile) => {
      if (element === result) {
        update(elem => ({
          ...elem,
          tile
        }))
      }
    },
    handleRemoveTileElement: (element) => {
      if (element === result) {
        update(element => ({
          ...element,
          tile: null
        }))
      }
    }
  }
  ELEMENTS [id] = result
  return result
}

export const deleteElement = ({id}) => {
  delete ELEMENTS[id]
}