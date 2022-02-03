<script>
  import TileElement from 'components/board/TileElement.svelte'

  // Store
  import {
    activeElement,
  } from 'stores/game.js'
  import {
    TILES_MAP,
  } from 'stores/tiles.js'

  // Actions
  import {
    selectTile
  } from 'stores/actions/selectTile.js'

  // Properties
  export let id

  let tile
  TILES_MAP[id].subscribe(value => {
    tile = value
  })

  function handleClickTile() {
    selectTile(id)
  }
</script>

<div
  class={`tile ${tile.terrain}`}
  class:selected={tile.selected}
  on:click={handleClickTile}
>
  <img
    class='layer'
    src={`images/${tile.terrain}.jpg`}
    alt={tile.terrain}
  />
  <div
    class='layer layer-background'
  />
  <div
    class='layer layer-border'
  />
  <div
    class='layer content'
  >
    {#if tile.elements.includes($activeElement)}
      <TileElement id={$activeElement} />
    {:else if tile.elements.length}
      <TileElement id={tile.elements[tile.elements.length - 1]} />
    {/if}
  </div>
</div>

<style>
	.tile {
    flex-shrink: 0;
    height: 96px;
    width: 96px;

    position: relative;
    background-color: white;

    user-select: none;
    cursor: pointer;
	}

  .layer {
    width: 100%;
    height: 100%;
    position: absolute;
    box-sizing: border-box;
  }
  .layer-background {
    background: black;
    opacity: 0.2;
  }
  .layer-border {
    border-radius: 2px;;
  }

  .content {
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
  }

  .selected .layer-background {
    opacity: 0;
  }
  .tile:not(.selected):hover .layer-border {
    border: 2px solid darkgrey;
  }
  .selected .layer-border {
    border: 2px solid lightgrey;
  }

  .inrange {
    background-color: lightgreen;
  }
</style>