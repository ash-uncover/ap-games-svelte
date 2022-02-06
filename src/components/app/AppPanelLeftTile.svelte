<script>
  export let tile

  import AppPanelLeftTileElement from 'components/app/AppPanelLeftTileElement.svelte'
</script>

<!-- RENDERING -->

<div
  class='app-panel-left-tile'
>
  <div>
    Selected Tile - <strong>{$tile.x}x{$tile.y}</strong>
  </div>
  <br/>
  {#each $tile.elements as element}
    <AppPanelLeftTileElement element={element} />
  {/each}
</div>

<!-- STYLE -->

<style>

</style>