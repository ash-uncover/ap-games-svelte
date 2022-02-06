<script>
</script>

<div
  class='hexagon'
>
  <div
    class='inner clip'
  >
    <div class='background clip'>
      <img
        class='image'
        src='images/test.jpg'
        alt='test'
        draggable='false'
      />
    </div>
  </div>
</div>

<style>
  .hexagon {
    width: 88px;
    height: 75px;
    z-index: 1;
    user-select: none;
  }
  .inner {
    display: inline-block;
    position: relative;
    width: 100%;
    height: calc(100% * 4 / 3);
    box-sizing: border-box;
    background: lightgrey;
    cursor: pointer;
  }
  .clip {
    clip-path: polygon(0% 25%, 0% 75%, 50% 100%, 100% 75%, 100% 25%, 50% 0%);
  }
  .inner:hover {
    background: green;
  }
  .background {
    position: absolute;
    background-color: orange;
    top: 2px;
    left: 2px;
    bottom: 2px;
    right: 2px;
  }

  .image {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center;
  }
</style>