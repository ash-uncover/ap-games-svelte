
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
  ELEMENTS_MAP[activeElementId].update(elem => ({
    ...elem,
    active: false
  }))

  PLAYERS_MAP[activePlayerId].subscribe(player => {
    const elementIndex = player.elements.indexOf(activeElementId)
    if (elementIndex < player.elements.length - 1) {
      activeElement.set(player.elements[elementIndex + 1])
    } else {
      const playerIndex = PLAYERS.indexOf(PLAYERS_MAP[activePlayerId])
      PLAYERS[(playerIndex + 1) % PLAYERS.length].subscribe(nextPlayer => {
        activeElement.set(nextPlayer.elements[0])
        activePlayer.set(nextPlayer.id)
      })()
    }
  })()
}
