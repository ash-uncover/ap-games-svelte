<!-- SCRIPTS -->

<script>
  export let title
</script>

<!-- RENDERING -->

<div class='menu'>
  <h1 class='menu-title'>{title}</h1>
  <slot />
</div>

<!-- STYLE -->

<style>
  .menu {
    height: 400px;
    width: 300px;

    margin-bottom: 15%;

    background-color: rgba(255, 255, 255, .45);
    backdrop-filter: blur(5px);

    border-radius: 10px;
    padding: 0 5rem;

    text-align: center;
  }
  .menu-title {
    padding: 0;
  }
</style>