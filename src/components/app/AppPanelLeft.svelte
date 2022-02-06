<script>
  import {
    GAME,
  } from 'store/stores/board.js'
  import {
    GAME_STATE,
  } from 'util/model.js'

  import AppPanelLeftTile from 'components/app/AppPanelLeftTile.svelte'
</script>

<!-- RENDERING -->

<div
  class='app-panel-left'
>
  {#if $GAME.state !== GAME_STATE.GAME_NOT_STARTED}
    {#if $GAME.selectedTile}
      <AppPanelLeftTile tile={$GAME.selectedTile} />
    {:else}
      <span>
        Select a Tile
      </span>
    {/if}
  {/if}
</div>

<!-- STYLE -->

<style>
  .app-panel-left {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;

    color: white;

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
</style>