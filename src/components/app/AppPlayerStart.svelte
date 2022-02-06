<!-- SCRIPTS -->

<script>
  import {
    GAME_STATE
  } from 'util/model.js'
  import {
    GAME,
  } from 'store/stores/board.js'
  import Button from 'components/common/Button.svelte'

  let visible
  let activePlayer
  $: {
    visible = $GAME.state === GAME_STATE.PLAYER_TURN_BEFORE
    activePlayer = $GAME.activePlayer
  }

  function handleTurnStart() {
    GAME.startPlayerTurn()
  }
</script>

<!-- RENDERING -->

<div
  class='app-player-start'
  class:visible
>
  <div class='modal'>
    <div>
      {#if $activePlayer}
        {$activePlayer.name} turn
      {/if}
    </div>
    <br/>
    <Button
      on:click={handleTurnStart}
    >
      OK
    </Button>
  </div>
</div>

<!-- STYLE -->

<style>
  .app-player-start {
    display: none;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background: rgba(0,0,0,0.75);
  }
  .app-player-start.visible {
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .modal {
    height: 350px;
    width: 500px;
    border: 3px solid grey;
    border-radius: 15px;
    background: white;

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
</style>