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
  TRIBE: 'tribe',
  WARRIOR: 'warrior',
}
export const ELEMENT_TYPES = Object.values(ELEMENT_TYPE)