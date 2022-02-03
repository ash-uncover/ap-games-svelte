
import {
  activeElement,
  activePlayer,
} from 'stores/game.js'
import {
  ELEMENTS_MAP,
} from 'stores/elements.js'
import {
  PLAYERS,
  PLAYERS_MAP,
} from 'stores/players.js'

let activeElementId
activeElement.subscribe(value => {
  activeElementId = value
})
let activePlayerId
activePlayer.subscribe(value => {
  activePlayerId = value
})

export function nextActiveElement() {
  let playerIndex = PLAYERS.indexOf(PLAYERS_MAP[activePlayerId])

  PLAYERS[(playerIndex + 1) % PLAYERS.length].subscribe(value => {
    activeElement.set(value.elements[0])
    activePlayer.set(value.id)
  })()
}
