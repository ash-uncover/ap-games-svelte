<script>
  import {
    GAME,
  } from 'store/stores/board.js'
</script>

<!-- RENDERING -->

<div
  class='app-footer'
>
  {#if $GAME.activePlayer}
    <span>
      Current Player - <strong>{$GAME.activePlayer.name}</strong>
    </span>
  {/if}
</div>

<!-- STYLE -->

<style>
  .app-footer {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;

    color: white;

    display: flex;
    align-items: center;
    justify-content: center;
  }
</style>