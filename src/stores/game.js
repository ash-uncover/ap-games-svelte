import { writable } from 'svelte/store'

export const selectedTile = writable(null)
export const activeElement = writable(null)
export const activePlayer = writable(null)

