import {
  BOARD,
  GAME,
} from 'store/stores/board.js'

import {
  ELEMENT_TYPE,
} from 'util/model.js'

export function startGame(type, width, height) {
  BOARD.generate({ type, width, height })
  let board
  BOARD.subscribe(b => board = b)
  const player1 = GAME.addPlayer()
  const player2 = GAME.addPlayer()
  const element11 = player1.createElement(ELEMENT_TYPE.TRIBE)
  element11.setTile(board.tiles[0][0])
  const element12 = player1.createElement(ELEMENT_TYPE.WARRIOR)
  element12.setTile(board.tiles[0][1])
  const element21 = player2.createElement(ELEMENT_TYPE.TRIBE)
  element21.setTile(board.tiles[width - 1][height - 1])
  const element22 = player2.createElement(ELEMENT_TYPE.WARRIOR)
  element22.setTile(board.tiles[width - 1][height - 2])
  GAME.endPlayerTurn()
}
