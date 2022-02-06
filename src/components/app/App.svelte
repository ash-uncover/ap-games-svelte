<!-- SCRIPTS -->

<script>
  import {
    KEY_CODES,
  } from 'util/keys.js'
  import {
    GAME_STATE,
    BOARD_TYPE,
    BOARD_TYPES,
    ELEMENT_TYPE,
    ELEMENT_TYPES,
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
  import Button from 'components/common/Button.svelte'
  import Hexagon from 'components/common/Hexagon.svelte'

  let type = BOARD_TYPE.HEX
  let width = 8
	let height = 8

  function handleKeyDown(event) {
    if ($GAME.state === GAME_STATE.GAME_NOT_STARTED) {
      switch (event.code) {
        case KEY_CODES.ENTER:
        case KEY_CODES.NUMPAD_ENTER: {
          handleGenerateBoard()
          break
        }
        default: {
          // Ignore
        }
      }
    } else if ($GAME.state === GAME_STATE.PLAYER_TURN_BEFORE) {
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

  function handleGenerateBoard () {
    BOARD.generate({ type, width, height })
    const player1 = GAME.addPlayer()
    const player2 = GAME.addPlayer()
    const element11 = player1.createElement(ELEMENT_TYPE.TRIBE)
    element11.setTile($BOARD.tiles[0][0])
    const element12 = player1.createElement(ELEMENT_TYPE.WARRIOR)
    element12.setTile($BOARD.tiles[0][1])
    const element21 = player2.createElement(ELEMENT_TYPE.TRIBE)
    element21.setTile($BOARD.tiles[$BOARD.width - 1][$BOARD.height - 1])
    const element22 = player2.createElement(ELEMENT_TYPE.WARRIOR)
    element22.setTile($BOARD.tiles[$BOARD.width - 1][$BOARD.height - 2])
    GAME.endPlayerTurn()
  }

</script>

<!-- RENDERING -->

<svelte:window on:keydown={handleKeyDown}/>

<div
  class='app'
>
  <div class='toolbar'>
    {#if $GAME.state === GAME_STATE.GAME_NOT_STARTED}
      <select bind:value={type}>
        {#each BOARD_TYPES as boardType}
          <option value={boardType}>
            {boardType}
          </option>
        {/each}
      </select>


      <label for='inputWidth' class='label'>Width:</label>
      <input id='inputWidth' type=number bind:value={width} min=3 max=100>

      <label for='inputHeight' class='label'>Height:</label>
      <input id='inputHeight' type=number bind:value={height} min=3 max=100>

      <span class='label'>New Board:</span>
      <Button on:click={handleGenerateBoard}>
        Generate
      </Button>

    {/if}
  </div>

  <div class='content'>
    <div class='panel panel-left'>
      <AppPanelLeft />
    </div>

    <div class='area'>
      {#if $GAME.state !== GAME_STATE.GAME_NOT_STARTED}
        <Board />
      {:else}
        <div>Create a board to start</div>
        <br/><br/><br/><br/>
        <div style='display: flex;padding-left: 100px;'>
          <Hexagon />
          <Hexagon />
          <Hexagon />
        </div>
        <div style='display: flex;padding-left: 100px;transform: translateX(44px);'>
          <Hexagon />
          <Hexagon />
          <Hexagon />
        </div>
        <div style='display: flex;padding-left: 100px;'>
          <Hexagon />
          <Hexagon />
          <Hexagon />
        </div>

      {/if}
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
  .label {
    margin-left: 1rem;
    margin-right: 0.5rem;
  }
  input, select {
    margin: 0;
    padding: 0;
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
    overflow: auto;
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