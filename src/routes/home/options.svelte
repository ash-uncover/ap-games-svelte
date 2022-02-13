<!-- SCRIPTS -->

<script>
  import {
    KEY_CODES,
  } from 'util/keys.js'
  import {
    APP_ROUTE,
  } from 'util/routes.js'

  import Home from 'components/home/Home.svelte'
  import HomeMenu from 'components/home/HomeMenu.svelte'
  import HomeMenuEntry from 'components/home/HomeMenuEntry.svelte'
  import HomeMenuNavigation from 'components/home/HomeMenuNavigation.svelte'

</script>

<!-- RENDERING -->

<Home>
  <HomeMenu title='Options'>
    <HomeMenuEntry>
      Not Implemented
    </HomeMenuEntry>
    <HomeMenuEntry>
      <HomeMenuNavigation text='Back' route={APP_ROUTE.HOME} />
    </HomeMenuEntry>
  </HomeMenu>
</Home>

<!-- STYLE -->

<style>
</style>