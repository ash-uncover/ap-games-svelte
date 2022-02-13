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
      const midWidth = (width + width%2)/2
      const midHeight = (height + height%2)/2
      for (let y = 0 ; y < height ; y++) {
        const row = []
        tiles.push(row)
        for (let x = 0 ; x < (width + (type === BOARD_TYPE.HEX ? (y)%2 : 0)) ; x++) {
          const distXRaw = Math.abs(x + 1 - midWidth)
          const distX = Math.round(distXRaw * 4 / midWidth)
          const distYRaw = Math.abs(y + 1 - midHeight)
          const distY = Math.round(distYRaw * 4 / midHeight)
          const dist = Math.max(distX, distY)
          const terrain = TILE_TERRAINS[TILE_TERRAINS.length - (dist ? dist : 1)]
          const tile = createTile({
            x,
            y,
            terrain,
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
    tile: null,
    actions: type.actions
  })
  const result = { subscribe }
  result.resetActions = () => update(element => ({
    ...element,
    actions: type.actions
  }))
  result.performAction = (actions) => update(element => ({
    ...element,
    actions: actions === -1 ? 0 : Math.max(element.actions - actions, 0)
  }))
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
    let selectedTile = null
    if (tile !== game.selectedTile) {
      tile.setSelected(true)
      selectedTile = tile
    }
    return {
      ...game,
      selectedTile
    }
  })
  result.endPlayerTurn = () => update(game => {
    let nextPlayer = null
    if (game.activePlayer) {
      let previousPlayer
      game.activePlayer.subscribe(player => previousPlayer = player)()
      previousPlayer.elements.forEach(element => element.resetActions())
      game.activePlayer.setActive(false)
      const playerIndex = game.players.indexOf(game.activePlayer)
      nextPlayer = game.players[(playerIndex + 1) % game.players.length]
    } else {
      nextPlayer = game.players[0]
    }
    let state = GAME_STATE.PLAYER_TURN_BEFORE
    nextPlayer.setActive(true)
    return {
      ...game,
      activePlayer: nextPlayer,
      state
    }
  })
  result.startPlayerTurn = () => update(game => {
    let activePlayer
    game.activePlayer.subscribe(player => activePlayer = player)()
    const activeElement = activePlayer.elements[0]
    activeElement.setActive(true)
    return {
      ...game,
      activeElement,
      state: GAME_STATE.PLAYER_TURN_INSIDE
    }
  })
  result.nextActiveElement = () => update(game => {
    let activeElement = null
    let state = game.state
    let activePlayer
    game.activePlayer.subscribe(player => activePlayer = player)()
    if (game.activeElement) {
      game.activeElement.setActive(false)
      const elementIndex = activePlayer.elements.indexOf(game.activeElement)
      if (elementIndex < activePlayer.elements.length - 1) {
        activeElement = activePlayer.elements[elementIndex + 1]
        activeElement.setActive(true)
      } else {
        state = GAME_STATE.PLAYER_TURN_AFTER
      }
    } else {
      activeElement = activePlayer.elements[0]
      activeElement.setActive(true)
    }
    return {
      ...game,
      activeElement,
      state
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

