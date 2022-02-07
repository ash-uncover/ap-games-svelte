<script>
  export let image
  export let borderWidth = '1px'
  export let borderColor = 'white'
</script>

<div
  class='hexagon'
>
  <div
    class='layer layer-border'
    style={`background-color:${borderColor};`}
  >
    <div
      class='layer layer-content'
      style={`top:${borderWidth};bottom:${borderWidth};right:${borderWidth};left:${borderWidth};`}
    >
      <div
        class='layer layer-background '
        style={`top:-${borderWidth};bottom:-${borderWidth};right:-${borderWidth};left:-${borderWidth};`}
      >
        <img
          class='image'
          src={image}
          alt='test'
          draggable='false'
        />
      </div>
      <div
        class='layer layer-elements'
        style={`top:-${borderWidth};bottom:-${borderWidth};right:-${borderWidth};left:-${borderWidth};`}
      >
        <slot />
      </div>
    </div>
  </div>
</div>

<style>
  .hexagon {
    width: 88px;
    height: 75px;
    user-select: none;
  }
  .layer {
    clip-path: polygon(0% 25%, 0% 75%, 50% 100%, 100% 75%, 100% 25%, 50% 0%);
    transition-property: top, bottom, left, right;
    transition-duration: 0.25s;
    transition-timing-function: ease-out;
  }
  .layer-border {
    display: inline-block;
    position: relative;
    width: 100%;
    height: calc(100% * 4 / 3);
    box-sizing: border-box;
    cursor: pointer;
    transition: background-color 0.5s ease-out;
  }
  .layer-content {
    position: absolute;
    overflow: hidden;
  }
  .layer-background {
    position: absolute;
  }
  .image {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center;
  }
  .layer-elements {
    position: absolute;
    display: flex;
    align-items: center;
    justify-content: center;
  }
</style>