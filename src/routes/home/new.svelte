<!-- SCRIPTS -->

<script>
  import {
    KEY_CODES,
  } from 'util/keys.js'
  import {
    APP,
  } from 'store/stores/app.js'
  import {
    startGame,
  } from 'store/actions/startGame.js'
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
  import HomeMenuButton from 'components/home/HomeMenuButton.svelte'

  let type = BOARD_TYPE.HEX
  let width = 15
	let height = 15

  function handleGenerateBoard () {
    startGame(type, width, height)
    APP.navigate(APP_ROUTE.GAME)
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
      <HomeMenuButton
        text='Start Game'
        on:click={handleGenerateBoard}
      />
    </HomeMenuEntry>

    <HomeMenuEntry>
      <HomeMenuNavigation text='Back' route={APP_ROUTE.HOME} />
    </HomeMenuEntry>
  </HomeMenu>
</Home>

<!-- STYLE -->

<style>
</style>