<!-- SCRIPTS -->

<script>
  import {
    APP_ROUTE,
  } from 'util/routes.js'
  import {
    APP,
  } from 'store/stores/app.js'

  import Home from 'routes/home/index.svelte'
  import HomeNew from 'routes/home/new.svelte'
  import HomeOptions from 'routes/home/options.svelte'
  import App from 'components/app/App.svelte'

</script>

<!-- RENDERING -->

<div class='app'>
  {#if $APP.route === APP_ROUTE.HOME}
    <Home />
  {:else if $APP.route === APP_ROUTE.HOME_NEW}
    <HomeNew />
  {:else if $APP.route === APP_ROUTE.HOME_OPTIONS}
    <HomeOptions />
  {:else if $APP.route === APP_ROUTE.GAME}
    <App />
  {/if}
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
  }
</style>