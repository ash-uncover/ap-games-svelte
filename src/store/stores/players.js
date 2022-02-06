import { writable } from 'svelte/store'

let ID_NUM = 1
export const PLAYERS = {}

export const createPlayer = ({}) => {
  const id = `player-${PLAYERS.length + 1}`
  const name = name || `Player ${PLAYERS.length + 1}`
  const { subscribe, set, update } = writable({
    id,
    name,
    elements: [],
  })
  const result = {
    subscribe,
    addElement: (element) => update(player => ({
      ...player,
      elements: [...player.elements, element]
    })),
    removeElement: (element) => update(player => ({
      ...player,
      elements: player.elements.remove(player.elements.index)
    })),
  }
  PLAYERS[id] = result
  return result
}
