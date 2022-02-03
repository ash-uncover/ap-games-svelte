import { writable } from 'svelte/store'

export const PLAYERS = []
export const PLAYERS_MAP = {}

export const createPlayer = (n) => {
  const id = `player-${PLAYERS.length + 1}`
  const name = n || `Player ${PLAYERS.length + 1}`
  const result = writable({
    id,
    name,
  })
  PLAYERS.push(result)
  PLAYERS_MAP[id] = result
  return id
}
