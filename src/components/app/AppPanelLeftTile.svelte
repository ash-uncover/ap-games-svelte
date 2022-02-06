<script>
  export let tile

  import AppPanelLeftTileElement from 'components/app/AppPanelLeftTileElement.svelte'
</script>

<!-- RENDERING -->

<div
  class='app-panel-left-tile'
>
  <div>
    Tile <strong>{$tile.x}x{$tile.y}</strong>
  </div>
  <br/>
  <div>
    Terrain:
  </div>
  <div>
    {$tile.terrain}
  </div>
  <br/>
  {#if $tile.elements.length}
    <div>
      Elements:
      {#each $tile.elements as element}
        <AppPanelLeftTileElement element={element} />
      {/each}
    </div>
  {/if}
</div>

<!-- STYLE -->

<style>
  .app-panel-left-tile {
    text-align: center;
  }

</style>