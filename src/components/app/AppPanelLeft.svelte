<script>
    import { onDestroy } from 'svelte'

    import {
      ELEMENTS_MAP,
    } from 'store/stores/elements.js'
    import {
      TILES_MAP,
    } from 'store/stores/tiles.js'
    import {
      selectedTile,
    } from 'store/stores/game.js'

    // Store binding
    let selectedTileId
    let tile
    let unsubscribeTile
    const unsubcribeSelectedTile = selectedTile.subscribe(value => {
      selectedTileId = value
      unsubscribeTile && unsubscribeTile()
      if (selectedTileId && TILES_MAP[selectedTileId]) {
        unsubscribeTile = TILES_MAP[selectedTileId].subscribe(value => {
          tile = value
        })
      } else {
        tile = null
      }
    })

    onDestroy(() => {
      unsubcribeSelectedTile()
      unsubscribeTile && unsubscribeTile()
    })

  </script>

  <!-- RENDERING -->

  <div
    class='app-panel-left'
  >
    {#if tile}
      <span>
        Selected Tile - <strong>{tile.x}x{tile.y}</strong>
      </span>
      <br/>
      {#each tile.elements as element}
        <span>
          Element - <strong>{element}</strong>
        </span>
      {/each}
    {:else}
      <span>
        Select a Tile
      </span>
    {/if}
  </div>

  <!-- STYLE -->

  <style>
    .app-panel-left {
      position: absolute;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;

      color: white;

      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
    }
  </style>