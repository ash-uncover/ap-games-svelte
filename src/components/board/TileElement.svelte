<script>
  import { onDestroy } from 'svelte'
import { get_root_for_style } from 'svelte/internal';

  // Properties
  export let element
  let player = $element.player

  let ref
  $: if (ref && !(ref.classList.contains('active')) && $element.active) {
    ref.scrollIntoView({
      behavior: 'auto',
      block: 'center',
      inline: 'center'
    })
  }

</script>

<div
  bind:this={ref}
  class={`element ${$player.id}`}
  class:active={$element.active}
  class:completed={$element.actions === 0}
>
  <div>{$element.type.name[0].toUpperCase()}</div>
  <div
    class='layer layer-completed'
  />
</div>

<style>
  .element {
    position: relative;
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
  .element.completed {
    font-style: italic;
    color: grey;
  }
  .element.completed .layer-completed {
    background: rgba(0, 0, 0, 0.5);
  }
  .element.active {
    animation: .6s ease-out 0.2s infinite alternate active;
    border-color: grey;
    border-top-color: lightgrey;
    border-left-color: lightgrey;
  }

  .layer {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
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