<script>
  import { KEY_CODES } from 'util/keys.js'
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
    createPlayer,
  } from 'stores/players.js'

  import {
    moveElement
  } from 'stores/actions/moveElement.js'

  import Board from 'components/board/Board.svelte'
  import Button from 'components/common/Button.svelte'

  let type = BOARD_TYPE.SQUARE
  let width = 5
	let height = 5
  let generated = false

  window.addEventListener('keydown', (event) => {
    switch (event.keyCode) {
      case KEY_CODES.ARROW_LEFT: {
        moveElement('element-1', -1, 0)
        break
      }
      case KEY_CODES.ARROW_UP: {
        moveElement('element-1', 0, -1)
        break
      }
      case KEY_CODES.ARROW_RIGHT: {
        moveElement('element-1', 1, 0)
        break
      }
      case KEY_CODES.ARROW_DOWN: {
        moveElement('element-1', 0, 1)
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
    createElement({
      type: ELEMENT_TYPE.TRIBE,
      tile: 'tile-1',
      player: player1Id,
    })
    createElement({
      type: ELEMENT_TYPE.WARRIOR,
      tile: 'tile-2',
      player: player2Id,
    })
  }

</script>

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

  <div class='panel-left'>

  </div>

  <div class='area'>
    {#if generated}
      <Board />
    {:else}
      <div>Create a board to start</div>
    {/if}
  </div>

  <div class='panel-right'>

  </div>

  <div class='footer'>

  </div>

</div>

<style>
  .app {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    overflow: hidden;
  }
  .toolbar {
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
  .area {
    position: absolute;
    top: 3rem;
    bottom: 5rem;
    left: 150px;
    right: 150px;
    overflow: auto;

    display: flex;
    align-items: center;
    justify-content: center;
  }
  .panel-left {
    position: absolute;
    top: 3rem;
    bottom: 0;
    left: 0;
    width: 150px;
    background: dimgray;
  }
  .panel-right {
    position: absolute;
    top: 3rem;
    bottom: 0;
    right: 0;
    width: 150px;
    background: dimgray;
  }
  .footer {
    position: absolute;
    height: 5rem;
    bottom: 0;
    right: 0;
    left: 0;
    background: black;
  }
</style>