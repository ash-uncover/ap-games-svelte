<!-- SCRIPTS -->

<script>
  import {
    KEY_CODES,
  } from 'util/keys.js'
  import {
    GAME_STATE,
  } from 'util/model.js'
  import {
    BOARD,
    GAME,
  } from 'store/stores/board.js'
  import {
    moveElement
  } from 'store/actions/moveElement.js'

  import AppPlayerStart from 'components/app/AppPlayerStart.svelte'
  import AppFooter from 'components/app/AppFooter.svelte'
  import AppPanelLeft from 'components/app/AppPanelLeft.svelte'
  import AppPanelRight from 'components/app/AppPanelRight.svelte'
  import Board from 'components/board/Board.svelte'
  import Hexagon from 'components/common/Hexagon.svelte'

  function handleKeyDown(event) {
    if ($GAME.state === GAME_STATE.PLAYER_TURN_BEFORE) {
      switch (event.code) {
        case KEY_CODES.ENTER:
        case KEY_CODES.NUMPAD_ENTER: {
          GAME.startPlayerTurn()
          break
        }
        default: {
          // Ignore
        }
      }
    } else if ($GAME.state === GAME_STATE.PLAYER_TURN_AFTER) {
      switch (event.code) {
        case KEY_CODES.ENTER:
        case KEY_CODES.NUMPAD_ENTER: {
          GAME.endPlayerTurn()
          break
        }
        default: {
          // Ignore
        }
      }
    } else if ($GAME.state === GAME_STATE.PLAYER_TURN_INSIDE) {
      switch (event.code) {
        case KEY_CODES.NUMPAD_1: {
          moveElement($BOARD, $GAME.activeElement, -1, 1) && $GAME.activeElement.performAction(1)
          break
        }
        case KEY_CODES.ARROW_DOWN:
        case KEY_CODES.NUMPAD_2: {
          moveElement($BOARD, $GAME.activeElement, 0, 1) && $GAME.activeElement.performAction(1)
          break
        }
        case KEY_CODES.NUMPAD_3: {
          moveElement($BOARD, $GAME.activeElement, 1, 1) && $GAME.activeElement.performAction(1)
          break
        }
        case KEY_CODES.ARROW_LEFT:
        case KEY_CODES.NUMPAD_4: {
          moveElement($BOARD, $GAME.activeElement, -1, 0) && $GAME.activeElement.performAction(1)
          break
        }
        case KEY_CODES.NUMPAD_5:
        case KEY_CODES.SPACE: {
          $GAME.activeElement.performAction(-1)
          break
        }
        case KEY_CODES.ARROW_RIGHT:
        case KEY_CODES.NUMPAD_6: {
          moveElement($BOARD, $GAME.activeElement, 1, 0) && $GAME.activeElement.performAction(1)
          break
        }
        case KEY_CODES.NUMPAD_7: {
          moveElement($BOARD, $GAME.activeElement, -1, -1) && $GAME.activeElement.performAction(1)
          break
        }
        case KEY_CODES.ARROW_UP:
        case KEY_CODES.NUMPAD_8: {
          moveElement($BOARD, $GAME.activeElement, 0, -1) && $GAME.activeElement.performAction(1)
          break
        }
        case KEY_CODES.NUMPAD_9: {
          moveElement($BOARD, $GAME.activeElement, 1, -1) && $GAME.activeElement.performAction(1)
          break
        }
        default: {
          // Ignore
        }
      }
      if ($GAME.activeElement) {
        let activeElement
        $GAME.activeElement.subscribe(e => activeElement = e)()
        if (activeElement.actions === 0) {
          GAME.nextActiveElement()
        }
      }
    }
  }

</script>

<!-- RENDERING -->

<svelte:window on:keydown={handleKeyDown}/>

<div
  class='app'
>
  <div class='toolbar'>
  </div>

  <div class='content'>
    <div class='panel panel-left'>
      <AppPanelLeft />
    </div>

    <div class='area'>
      <Board />
    </div>

    <div class='panel panel-right'>
      <AppPanelRight />
    </div>
  </div>

  <div class='footer'>
    <AppFooter />
  </div>

  <AppPlayerStart />

</div>

<!-- STYLE -->

<style>
  .app {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    overflow: hidden;

    display: flex;
    flex-direction: column;
  }
  .toolbar {
    position: relative;
    width: 100%;
    flex-shrink: 0;
    flex-grow: 0;

    padding: 0 2rem;
    height: 3rem;
    background: black;
    color: white;

    display: flex;
    align-items: center;
  }
  .content {
    position: relative;
    width: 100%;
    flex-grow: 1;
    min-height: 0;
    display: flex;
  }
  .panel {
    position: relative;
    height: 100%;
    flex-shrink: 0;
    flex-grow: 0;
    width: 150px;
    background: dimgray;
  }
  .area {
    position: relative;
    height: 100%;
    min-height: 0;
    min-width: 0;
    flex-grow: 1;
    overflow: hidden;
  }
  .footer {
    position: relative;
    width: 100%;
    flex-shrink: 0;
    flex-grow: 0;

    height: 5rem;
    background: black;
  }
</style>