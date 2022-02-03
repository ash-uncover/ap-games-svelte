<script>
  import Tile from 'components/board/Tile.svelte'

  import {
    board,
    selectedTile,
  } from 'stores/board.js'

  function isInSelectionRange(x, y, range = 2) {
    if ($selectedTile && $selectedTile.x > -1 && $selectedTile.y > -1) {
      switch ($board.type) {
        case 'square': {
          const xDist = Math.abs(x - $selectedTile.x)
          const yDist = Math.abs(y - $selectedTile.y)
          const max = Math.max(xDist, yDist)
          return 0 < max && max <= range
        }
        case 'hex': {
          const odd = $selectedTile.y % 2
          return (
            y === $selectedTile.y - 1 && x === $selectedTile.x - odd||
            y === $selectedTile.y - 1 && x === $selectedTile.x + 1 - odd ||
            y === $selectedTile.y && x === $selectedTile.x - 1 ||
            y === $selectedTile.y && x === $selectedTile.x + 1 ||
            y === $selectedTile.y + 1 && x === $selectedTile.x - odd ||
            y === $selectedTile.y + 1 && x === $selectedTile.x + 1 - odd
          )
        }
      }
    }
  }
</script>

<div class={`board ${$board.type}`}>
  {#each $board.tiles as row, y}
    <div class={`board-row ${y % 2 ? 'even' : 'odd'}`}>
      {#each row as tile, x}
        <Tile id={tile} />
      {/each}
    </div>
  {/each}
</div>

<style>
  .board {
    position: relative;
    background-color: lightgrey;
    padding: 30px;
    width: fit-content;
  }
  .board-row {
    display: flex;
    align-items: center;
  }
  .board.hex .odd {
    margin-left: 20px
  }
</style>