<script>
  import TileElement from 'components/board/TileElement.svelte'

  // Store
  import {
    board,
  } from 'stores/board.js'
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
    selectTile(x, y)
  }
</script>

<div
  class={buildClass(storeTile)}
  on:click={handleClickTile}
>
  {#if storeTile.elements.length}
    <TileElement id={storeTile.elements[0]} />
  {/if}
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

    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
    box-sizing: border-box;
	}
  .tile:hover {
    z-index: 5;
    border-color: black;
    border-width: 2px;
  }

  .terrain-ocean {
    background-color: blue;
  }
  .terrain-plain {
    background-color: yellow;
  }
  .terrain-hill {
    background-color: green;
  }
  .terrain-moutain {
    background-color: brown;
  }

  .selected {
    background-color: white;
  }
  .inrange {
    background-color: lightgreen;
  }
</style>