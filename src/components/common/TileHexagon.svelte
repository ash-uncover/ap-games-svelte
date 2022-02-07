<script>
  import Hexagon from 'components/common/Hexagon.svelte'

  // Properties
  export let terrain
  export let selected

  let borderColor = 'lightgrey'
  let borderWidth = '1px'

  function handleMouseEnter() {
    borderColor = 'white'
    borderWidth = '2px'
  }
  function handleMouseLeave() {
    borderColor = 'white'
    borderWidth = '1px'
  }
</script>

<div
  on:mouseenter={handleMouseEnter}
  on:mouseleave={handleMouseLeave}
  on:click
>
  <Hexagon
    image={`assets/images/${terrain}.jpg`}
    borderColor={selected ? 'yellow' : borderColor}
    borderWidth={selected ? '3px' : borderWidth}
  >
    <slot>
      <slot name='elements'></slot>
    </slot>
  </Hexagon>
</div>

<style>
</style>