import { writable } from 'svelte/store'

import {
  GAME_STATE
} from 'util/model.js'

export const gameState = writable(GAME_STATE.GAME_NOT_STARTED)
export const selectedTile = writable(null)
export const activeElement = writable(null)
export const activePlayer = writable(null)
export const playableElements = writable([])

