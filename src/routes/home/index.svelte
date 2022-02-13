<!-- SCRIPTS -->

<script>
  import {
    KEY_CODES,
  } from 'util/keys.js'
  import {
    startGame,
  } from 'store/actions/startGame.js'
  import {
    APP_ROUTE,
  } from 'util/routes.js'
  import {
    APP,
  } from 'store/stores/app.js'

  import Home from 'components/home/Home.svelte'
  import HomeMenu from 'components/home/HomeMenu.svelte'
  import HomeMenuEntry from 'components/home/HomeMenuEntry.svelte'
  import HomeMenuNavigation from 'components/home/HomeMenuNavigation.svelte'
  import HomeMenuButton from 'components/home/HomeMenuButton.svelte'

  function handleQuickPlayPressed () {
    startGame('hex', 15, 15)
    APP.navigate(APP_ROUTE.GAME)
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