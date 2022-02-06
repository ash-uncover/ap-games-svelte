<script>
  import { onDestroy } from 'svelte'

  // Properties
  export let element
  let player = $element.player

</script>

<div
  class={`element ${$player.id}`}
  class:active={$element.active}
>
  <div>{$element.type[0].toUpperCase()}</div>
</div>

<style>
  .element {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 70%;
    width: 70%;

    border: 4px solid #666;
    border-top-color: darkgrey;
    border-left-color: darkgrey;
    box-shadow: rgb(0 0 0 / 55%) 0px 5px 15px;

    background-color: white;
    color: black;
    font-weight: bold;
    transition: border-color 5s;
  }

  .element.active {
    animation: .6s ease-out 0.2s infinite alternate active;
    border-color: grey;
    border-top-color: lightgrey;
    border-left-color: lightgrey;
  }

  .player-1 {
    background-color: #d7f75b;
  }
  .player-2 {
    background-color: #71a9f7;
  }

  @keyframes active {
    45% { opacity: 1; }
    100% { opacity: 0.15; }
  }
</style>