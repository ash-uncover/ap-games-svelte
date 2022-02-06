<script>
  export let element
  let player
  $: player = $element.player
</script>

<!-- RENDERING -->

<div
  class='app-panel-left-tile-element'
>
  {$player.name} - {$element.type.name}
</div>

<!-- STYLE -->

<style>

</style>