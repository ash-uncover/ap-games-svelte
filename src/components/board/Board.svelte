<script>
  import Tile from 'components/board/Tile.svelte'

  import {
    BOARD,
  } from 'store/stores/board.js'

</script>

<div class={`board ${$BOARD.type}`}>
  {#each $BOARD.tiles as row, y}
    <div class={`board-row ${y % 2 ? 'even' : 'odd'}`}>
      {#each row as tile}
        <Tile tile={tile} />
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