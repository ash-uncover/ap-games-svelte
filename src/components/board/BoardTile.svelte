<script>
  import {
    BOARD_TYPE,
  } from 'util/model.js'

  import TileElement from 'components/board/TileElement.svelte'
  import TileSquare from 'components/common/TileSquare.svelte'
  import TileHexagon from 'components/common/TileHexagon.svelte'

  // Store
  import {
    GAME,
    BOARD,
  } from 'store/stores/board.js'

  // Properties
  export let tile

  function handleClickTile() {
    GAME.selectTile(tile)
  }

  let tileComponent = $BOARD.type === BOARD_TYPE.HEX ? TileHexagon : TileSquare
</script>

<svelte:component this={tileComponent}
  terrain={$tile.terrain}
  selected={$tile.selected}
  on:click={handleClickTile}
>
  <slot slot='elements'>
    {#if $tile.elements.includes($GAME.activeElement)}
      <TileElement element={$GAME.activeElement} />
    {:else if $tile.elements.length}
      <TileElement element={$tile.elements[$tile.elements.length - 1]} />
    {/if}
  </slot>
</svelte:component>

<style>
</style>