<script>
  export let terrain
  export let selected
</script>

<div
  class='tile'
  class:selected
  on:click
>
  <img
    class='layer'
    src={`assets/images/${terrain}.jpg`}
    alt={terrain}
  />
  <div
    class='layer layer-background'
  />
  <div
    class='layer layer-border'
  />
  <div
    class='layer content'
  >
    <slot name='elements'></slot>
  </div>
</div>

<style>
	.tile {
    flex-shrink: 0;
    height: 96px;
    width: 96px;

    position: relative;
    background-color: white;

    user-select: none;
    cursor: pointer;
	}

  .layer {
    width: 100%;
    height: 100%;
    position: absolute;
    box-sizing: border-box;
  }
  .layer-background {
    background: black;
    opacity: 0.2;
  }
  .layer-border {
    border-radius: 2px;;
  }

  .content {
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
  }

  .selected .layer-background {
    opacity: 0;
  }
  .tile:not(.selected):hover .layer-border {
    border: 2px solid darkgrey;
  }
  .selected .layer-border {
    border: 2px solid lightgrey;
  }

</style>