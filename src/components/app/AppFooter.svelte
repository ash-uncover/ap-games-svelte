<script>
  import {
    GAME_STATE
  } from 'util/model.js'
  import {
    GAME,
  } from 'store/stores/board.js'
  import Button from 'components/common/Button.svelte'

  let activePlayer
  GAME.subscribe(g => {
    activePlayer = g.activePlayer
  })

  function handleEndTurn() {
    GAME.endPlayerTurn()
  }
</script>

<!-- RENDERING -->

<div
  class='app-footer'
>
  {#if $GAME.state !== GAME_STATE.GAME_NOT_STARTED && $GAME.state !== GAME_STATE.GAME_ENDED}
    <div>
      {$GAME.state}
    </div>
    <div>
      {#if $activePlayer}
        <span>
          Current Player - <strong>{$activePlayer.name}</strong>
        </span>
      {/if}
    </div>
    <div>
      <Button
        disabled={$GAME.state !== GAME_STATE.PLAYER_TURN_AFTER}
        on:click={handleEndTurn}
      >
        End Turn
      </Button>
    </div>
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
    padding: 0 2rem;

    color: white;

    display: flex;
    align-items: center;
    justify-content: space-between;
  }
</style>