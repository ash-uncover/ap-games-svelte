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
    APP_ROUTE,
  } from 'util/routes.js'
  import {
    APP,
  } from 'store/stores/app.js'
  import {
    BOARD,
    GAME,
  } from 'store/stores/board.js'

  import Home from 'components/home/Home.svelte'
  import HomeMenu from 'components/home/HomeMenu.svelte'
  import HomeMenuEntry from 'components/home/HomeMenuEntry.svelte'
  import HomeMenuNavigation from 'components/home/HomeMenuNavigation.svelte'
  import HomeMenuButton from 'components/home/HomeMenuButton.svelte'

  function handleQuickPlayPressed () {
    BOARD.generate({ type: 'hex', width: 15, height: 15 })
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
    APP.navigate(APP_ROUTE.GAME)
    GAME.endPlayerTurn()
  }
</script>

<!-- RENDERING -->

<Home>
  <HomeMenu title='Home'>
    <HomeMenuEntry>
      <HomeMenuButton
        text={'Quick Play'}
        on:click={handleQuickPlayPressed}
      />
    </HomeMenuEntry>
    <HomeMenuEntry>
      <HomeMenuNavigation
        text={'New Game'}
        route={APP_ROUTE.HOME_NEW}
      />
    </HomeMenuEntry>
    <HomeMenuEntry>
      <HomeMenuNavigation
        text={'Options'}
        route={APP_ROUTE.HOME_OPTIONS}
      />
    </HomeMenuEntry>
  </HomeMenu>
</Home>

<!-- STYLE -->

<style>
</style>