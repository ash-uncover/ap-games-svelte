<!-- SCRIPTS -->

<script>
  import {
    KEY_CODES,
  } from 'util/keys.js'
  import {
    BOARD,
    GAME,
  } from 'store/stores/board.js'
  import {
    APP_ROUTE,
  } from 'util/routes.js'
  import {
    BOARD_TYPE,
    BOARD_TYPES,
  } from 'util/model.js'

  import Home from 'components/home/Home.svelte'
  import HomeMenu from 'components/home/HomeMenu.svelte'
  import HomeMenuEntry from 'components/home/HomeMenuEntry.svelte'
  import HomeMenuNavigation from 'components/home/HomeMenuNavigation.svelte'

  let type = BOARD_TYPE.HEX
  let width = 15
	let height = 15

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

<Home>
  <HomeMenu title='New Game'>
    <HomeMenuEntry>
      <label for='inputType' class='label'>
        Type:
      </label>
      <select id='inputType' bind:value={type}>
        {#each BOARD_TYPES as boardType}
          <option value={boardType}>
            {boardType}
          </option>
        {/each}
      </select>
    </HomeMenuEntry>

    <HomeMenuEntry>
      <label for='inputWidth' class='label'>Width:</label>
      <input id='inputWidth' type=number bind:value={width} min=3 max=100>
    </HomeMenuEntry>

    <HomeMenuEntry>
      <label for='inputHeight' class='label'>Height:</label>
      <input id='inputHeight' type=number bind:value={height} min=3 max=100>
    </HomeMenuEntry>

    <HomeMenuEntry>
      <button on:click={handleGenerateBoard}>
        Generate
      </button>
    </HomeMenuEntry>

    <HomeMenuEntry>
      <HomeMenuNavigation text='Back' route={APP_ROUTE.HOME} />
    </HomeMenuEntry>
  </HomeMenu>
</Home>

<!-- STYLE -->

<style>
</style>