<!-- SCRIPTS -->

<script>
  import {
    KEY_CODES,
  } from 'util/keys.js'
  import {
    BOARD_TYPE,
    BOARD_TYPES,
    ELEMENT_TYPE,
    ELEMENT_TYPES,
  } from 'util/model.js'

  import {
    generateBoard,
  } from 'stores/board.js'
  import {
    createElement,
  } from 'stores/elements.js'
  import {
    activeElement,
    activePlayer,
  } from 'stores/game.js'
  import {
    createPlayer,
  } from 'stores/players.js'

  import {
    moveElement,
  } from 'stores/actions/moveElement.js'
  import {
    nextActiveElement,
  } from 'stores/actions/nextActiveElement.js'

  import AppFooter from 'components/app/AppFooter.svelte'
  import AppPanelLeft from 'components/app/AppPanelLeft.svelte'
  import AppPanelRight from 'components/app/AppPanelRight.svelte'
  import Board from 'components/board/Board.svelte'
  import Button from 'components/common/Button.svelte'

  let type = BOARD_TYPE.SQUARE
  let width = 5
	let height = 5
  let generated = false

  window.addEventListener('keydown', (event) => {
    switch (event.keyCode) {
      case KEY_CODES.ARROW_LEFT: {
        moveElement($activeElement, -1, 0)
        nextActiveElement()
        break
      }
      case KEY_CODES.ARROW_UP: {
        moveElement($activeElement, 0, -1)
        nextActiveElement()
        break
      }
      case KEY_CODES.ARROW_RIGHT: {
        moveElement($activeElement, 1, 0)
        nextActiveElement()
        break
      }
      case KEY_CODES.ARROW_DOWN: {
        moveElement($activeElement, 0, 1)
        nextActiveElement()
        break
      }
      default: {
        // Ignore
      }
    }
  })

  function handleGenerateBoard () {
    generated = true
    generateBoard(type, width, height)
    const player1Id = createPlayer()
    const player2Id = createPlayer()
    const element1Id = createElement({
      type: ELEMENT_TYPE.TRIBE,
      tile: 'tile-1',
      player: player1Id,
      active: true,
    })
    createElement({
      type: ELEMENT_TYPE.WARRIOR,
      tile: 'tile-2',
      player: player1Id,
    })
    createElement({
      type: ELEMENT_TYPE.WARRIOR,
      tile: 'tile-3',
      player: player2Id,
    })
    createElement({
      type: ELEMENT_TYPE.TRIBE,
      tile: 'tile-4',
      player: player2Id,
    })
    $activePlayer = player1Id
    $activeElement = element1Id
  }

</script>

<!-- RENDERING -->

<div
  class='app'
>
  <div class='toolbar'>
    {#if !generated}
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
      {#if generated}
        <Board />
      {:else}
        <div>Create a board to start</div>
      {/if}
    </div>

    <div class='panel panel-right'>
      <AppPanelRight />
    </div>
  </div>

  <div class='footer'>
    <AppFooter />
  </div>

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
    flex-grow: 1;
    overflow: auto;

    display: flex;
    align-items: center;
    justify-content: center;
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