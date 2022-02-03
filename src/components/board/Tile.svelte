<script>
  import TileElement from 'components/board/TileElement.svelte'

  // Store
  import {
    TILES_MAP,
  } from 'stores/tiles.js'

  // Actions
  import {
    selectTile
  } from 'stores/actions/selectTile.js'

  // Properties
  export let id

  let storeTile
  TILES_MAP[id].subscribe(value => {
    storeTile = value
  })

  function buildClass(tile) {
    const aClass = ['tile']
    if (tile.selected) aClass.push('selected')
    if (tile.terrain) aClass.push(`terrain-${tile.terrain}`)
    return aClass.join(' ')
  }

  function handleClickTile() {
    selectTile(id)
  }
</script>

<div
  class={buildClass(storeTile)}
  on:click={handleClickTile}
>
  <img
    class='layer background-terrain'
    src={`images/${storeTile.terrain}.jpg`}
    alt={storeTile.terrain}
  />
  <div
    class='layer background-selection'
  />
  <div
    class='layer content'
  >
    {#if storeTile.elements.length}
      <TileElement id={storeTile.elements[0]} />
    {/if}
  </div>
</div>

<style>
	.tile {
    flex-shrink: 0;
    height: 40px;
    width: 40px;

    position: relative;

    background-color: white;
    border: 1px solid lightgrey;
    user-select: none;
    cursor: pointer;
    box-sizing: border-box;
	}
  .tile:hover {
    z-index: 5;
    border-color: black;
    border-width: 2px;
  }

  .layer {
    width: 100%;
    height: 100%;
    position: absolute;
  }
  .background-selection {
    background: black;
    opacity: 0.2;
  }
  .content {
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
  }

  .selected .background-selection {
    opacity: 0;
  }
  .inrange {
    background-color: lightgreen;
  }
</style>