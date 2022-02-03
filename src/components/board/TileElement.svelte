<script>
  import { onDestroy } from 'svelte'

  // Import Stores

  import {
    activeElement
  } from 'stores/game.js'
  import {
    ELEMENTS_MAP
  } from 'stores/elements.js'
  import {
    PLAYERS_MAP
  } from 'stores/players.js'

  // Properties
  export let id

  $: {
    unsuscribeElement && unsuscribeElement()
    unsuscribeElement = ELEMENTS_MAP[id].subscribe(value => {
      element = value
    })
    unsuscribePlayer && unsuscribePlayer()
    unsuscribePlayer = PLAYERS_MAP[element.player].subscribe(value => {
      player = value
    })
  }

  // Store binding
  let element
  let unsuscribeElement = ELEMENTS_MAP[id].subscribe(value => {
    element = value
  })
  let player
  let unsuscribePlayer = PLAYERS_MAP[element.player].subscribe(value => {
    player = value
  })

  onDestroy(() => {
    unsuscribeElement()
    unsuscribePlayer()
  })

  const buildClass = (elem, play) => {
    const aClass = ['element']
    aClass.push(play.id)
    if (elem.active) {
      aClass.push('active')
    }
    return aClass.join(' ')
  }

</script>

<div class={buildClass(element, player)}>
  <div>{element.type[0].toUpperCase()}</div>
</div>

<style>
  .element {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 25px;
    width: 25px;

    border: 1px solid #635d5c;
    background-color: black;
    color: black;
    font-weight: bold;
    transition: background-color 0.25s;
  }
  .element.active {
    animation: .5s ease-out 0s infinite alternate active;
  }

  .player-1 {
    background-color: #9be564;
  }
  .player-1.active {
    background-color: #d7f75b;
  }

  .player-2 {
    background-color: #71a9f7;
  }
  .player-2.active {
    background-color: #c6d8ff;
  }

  @keyframes active {
    35% { opacity: 1; }
    100%   { opacity: 0.15; }
  }
</style>