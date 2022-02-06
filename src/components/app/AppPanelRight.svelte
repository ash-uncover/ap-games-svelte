<script>
  import {
    GAME,
  } from 'store/stores/board.js'

  import AppPanelRightElement from 'components/app/AppPanelRightElement.svelte'
</script>

<!-- RENDERING -->

<div
  class='app-panel-right'
>
  {#if $GAME.activeElement}
    <AppPanelRightElement element={$GAME.activeElement} />
  {/if}
</div>

<!-- STYLE -->

<style>
  .app-panel-right {
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