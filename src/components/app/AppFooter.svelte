<script>
  import { onDestroy } from 'svelte'

  import {
    PLAYERS_MAP,
  } from 'store/stores/players.js'
  import {
    activePlayer,
  } from 'store/stores/game.js'

  // Store binding
  let activePlayerId
  let player
  let unsubscribePlayer
  const unsubcribeActivePlayer = activePlayer.subscribe(value => {
    activePlayerId = value
    unsubscribePlayer && unsubscribePlayer()
    if (activePlayerId && PLAYERS_MAP[activePlayerId]) {
      unsubscribePlayer = PLAYERS_MAP[activePlayerId].subscribe(value => {
        player = value
      })
    }
  })

  onDestroy(() => {
    unsubcribeActivePlayer()
    unsubscribePlayer && unsubscribePlayer()
  })

</script>

<!-- RENDERING -->

<div
  class='app-footer'
>
  {#if player}
    <span>
      Current Player - <strong>{player.name}</strong>
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