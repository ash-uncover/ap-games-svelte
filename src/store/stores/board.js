import { writable } from 'svelte/store'

import {
  BOARD_TYPE,
  GAME_STATE,
  TILE_TERRAINS,
} from 'util/model.js'

let PLAYER_ID_NUM = 1

const createPlayer = () => {
  const id = PLAYER_ID_NUM++
  const { subscribe, set, update } = writable({
    id: `player-${id}`,
    name: `Player ${id}`,
    elements: []
  })
  const result = { subscribe }
  result.setActive = (active) => update(player => ({
    ...player,
    active
  }))
  result.createElement = (type) => {
    const element = createElement(result, type)
    update(player => ({
      ...player,
      elements: [...player.elements, element]
    }))
    return element
  }
  result.removeElement = (element) => update(player => {
    const elements = player.elements.slice()
    elements.remove(element)
    return {
      ...player,
      elements
    }
  })
  return result
}

function createBoard() {
  const { subscribe, set, update } = writable({
    type: null,
    width: 0,
    height: 0,
    tiles: []
  });

	return {
		subscribe,
		generate: ({ type, width, height }) => {
      const tiles = []
      for (let y = 0 ; y < height ; y++) {
        const row = []
        tiles.push(row)
        for (let x = 0 ; x < (width + (type === BOARD_TYPE.HEX ? (y)%2 : 0)) ; x++) {
          const tile = createTile({
            x,
            y,
            terrain: TILE_TERRAINS[(x+y)%TILE_TERRAINS.length],
          })
          row.push(tile)
        }
      }
      const board = {
        type,
        width,
        height,
        tiles,
      }
      set(board)
    }
	}
}

let TILE_ID_NUM = 1

const createTile = ({x, y, terrain}) => {
  const { subscribe, set, update } = writable({
    id: `tile-${TILE_ID_NUM++}`,
    x,
    y,
    terrain,
    elements: []
  })
  const result = { subscribe }
  result.setSelected = (selected) => update(tile => ({ ...tile, selected }))
  result.addElement = (element) => update(tile => ({
    ...tile,
    elements: [...tile.elements, element]
  }))
  result.removeElement = (element) => update(tile => {
    const elements = tile.elements.slice()
    elements.remove(element)
    return {
      ...tile,
      elements
    }
  })
  return result
}

let ELEMENT_ID_NUM = 1

const createElement = (player, type) => {
  const { subscribe, set, update } = writable({
    id: `element-${ELEMENT_ID_NUM++}`,
    player,
    type,
    tile: null
  })
  const result = { subscribe }
  result.setActive = active => update(element => ({
    ...element,
    active
  }))
  result.setTile = tile => update(element => {
    element.tile && element.tile.removeElement(result)
    tile.addElement(result)
    return {
      ...element,
      tile
    }
  })
  return result
}

function createGame() {
  const { subscribe, set, update } = writable({
    state: GAME_STATE.GAME_NOT_STARTED,
    selectedTile: null,
    activePlayer: null,
    activeElement: null,
    players: []
  })
  const result = { subscribe }
  result.setState = (state) => update(game => ({
    ...game,
    state
  }))
  result.selectTile = (tile) => update(game => {
    game.selectedTile && game.selectedTile.setSelected(false)
    tile.setSelected(true)
    return {
      ...game,
      selectedTile: tile
    }
  })
  result.setActivePlayer = (player) => update(game => {
    game.activePlayer && game.activePlayer.setActive(false)
    player.setActive(true)
    return {
      ...game,
      activePlayer: player
    }
  })
  result.setActiveElement = (element) => update(game => {
    game.activeElement && game.activeElement.setActive(false)
    element.setActive(true)
    return {
      ...game,
      activeElement: element
    }
  })
  result.addPlayer = () => {
    const player = createPlayer()
    update(game => ({
      game,
      players: [...game.players, player]
    }))
    return player
  }
  result.removePlayer = (player) => update(game => {
    const players = game.players.slice()
    players.remove(player)
    return {
      ...game,
      players
    }
  })

  return result
}

export const BOARD = createBoard()
export const GAME = createGame()

