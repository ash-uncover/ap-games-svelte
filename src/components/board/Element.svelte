<script>
  import { onDestroy } from 'svelte'

  // Import Stores
  import {
    ELEMENTS_MAP
  } from 'stores/elements.js'
  import {
    PLAYERS_MAP
  } from 'stores/players.js'

  // Properties
  export let id

  // Store binding
  const subscribers = []

  let element
  subscribers.push(ELEMENTS_MAP[id].subscribe(value => {
    element = value
  }))
  let player
  subscribers.push(PLAYERS_MAP[element.player].subscribe(value => {
    player = value
  }))

  onDestroy(() => subscribers.forEach((sub => sub())))

</script>

<div class={`element ${player.id}`}>
  {element.type[0].toUpperCase()}
</div>

<style>
  .element {
    display: flex;
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