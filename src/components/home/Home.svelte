<!-- SCRIPTS -->

<script>
</script>

<!-- RENDERING -->

<div class='layer layer-background' />
<div class='layer layer-opacity' />
<div class='layer layer-content'>
  <slot />
</div>

<!-- STYLE -->

<style>
  .layer {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
  }
  .layer-background {
    background: url('/assets/images/home-background.jpg');
  }
  .layer-opacity {
    background: rgba(30,30,30,0.7);
  }
  .layer-content {
    display: flex;
    align-items: center;
    justify-content: center;
  }
</style>