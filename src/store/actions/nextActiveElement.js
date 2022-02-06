import {
  GAME,
} from 'store/stores/board.js'

let game
GAME.subscribe(v => game = v)

export function nextActiveElement() {
  let activePlayer
  game.activePlayer.subscribe(player => activePlayer = player)()
  const elementIndex = activePlayer.elements.indexOf(game.activeElement)
  let nextElement
  if (elementIndex < activePlayer.elements.length - 1) {
    nextElement = activePlayer.elements[elementIndex + 1]
    GAME.setActiveElement(nextElement)
  } else {
    const playerIndex = game.players.indexOf(game.activePlayer)
    const nextPlayer = game.players[(playerIndex + 1) % game.players.length]
    nextPlayer.subscribe(v => GAME.setActiveElement(v.elements[0]))()
    GAME.setActivePlayer(nextPlayer)
  }
}
