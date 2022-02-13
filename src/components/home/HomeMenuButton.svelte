<!-- SCRIPTS -->

<script>
  export let text
</script>

<!-- RENDERING -->

<button
  class='home-menu-button'
  on:click
>
  {text}
</button>

<!-- STYLE -->

<style>
  .home-menu-button {
    width: 100%;
    border: 1px solid black;
    border-radius: 4px;
    background: #CCC;
    padding: 0.5rem 0;
  }
  .home-menu-button:hover {
    background: #EEE;
  }
</style>