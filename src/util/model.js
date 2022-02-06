// GAME_STATE //

export const GAME_STATE = {
  GAME_NOT_STARTED: 'GAME_NOT_STARTED',
  PLAYER_SELECTION: 'PLAYER_SELECTION',
  PLAYER_TURN_BEFORE: 'PLAYER_TURN_BEFORE',
  PLAYER_TURN_INSIDE: 'PLAYER_TURN_INSIDE',
  PLAYER_TURN_COMPLETING: 'PLAYER_TURN_COMPLETING',
  PLAYER_TURN_AFTER: 'PLAYER_TURN_AFTER',
  GAME_ENDED: 'GAME_ENDED',
}
export const GAME_STATES = Object.values(GAME_STATE)

// PLAYER //

export const PLAYER_INFO = {
  PLAYER_1: {
    color: '',
    color2: ''
  },
  PLAYER_2: {
    color: '',
    color2: ''
  }
}
export const PLAYER_INFOS = Object.values(PLAYER_INFO)

// BOARD //

export const BOARD_TYPE = {
  HEX: 'hex',
  SQUARE: 'square',
}
export const BOARD_TYPES = Object.values(BOARD_TYPE)

// TILE //

export const TILE_TERRAIN = {
  OCEAN: 'ocean',
  PLAIN: 'plain',
  HILL: 'hill',
  MOUTAIN: 'moutain'
}
export const TILE_TERRAINS = Object.values(TILE_TERRAIN)

export const TILE_FEATURE = {
  FOREST: 'forest',
  JUNGLE: 'jungle',
  SWAMP: 'swamp',
  VOLCANO: 'volcano'
}
export const TILE_FEATURES = Object.values(TILE_FEATURE)

// ELEMENT //

export const ELEMENT_TYPE = {
  TRIBE: {
    name: 'tribe',
    actions: 1
  },
  WARRIOR: {
    name: 'warrior',
    actions: 2
  },
}
export const ELEMENT_TYPES = Object.values(ELEMENT_TYPE)