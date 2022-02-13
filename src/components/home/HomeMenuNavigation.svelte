<!-- SCRIPTS -->

<script>
  import {
    APP,
  } from 'store/stores/app.js'

  import HomeMenuButton from 'components/home/HomeMenuButton.svelte'

  export let text
  export let route

  function handleMenuClick(route) {
    APP.navigate(route)
  }
</script>

<!-- RENDERING -->

<HomeMenuButton
  text={text}
  on:click={() => handleMenuClick(route)}
/>

<!-- STYLE -->

<style>
</style>