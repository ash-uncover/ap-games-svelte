<script>
  import Tile from 'components/board/Tile.svelte'

  import {
    BOARD,
  } from 'store/stores/board.js'

  let ref
  let dragTimeout
  let dragStart

  function handleMouseDown(event) {
    dragTimeout = setTimeout(() => {
      dragStart = {
        x: event.clientX,
        y: event.clientY,
        scrollTop: ref.parentElement.scrollTop,
        scrollLeft: ref.parentElement.scrollLeft,
      }
    }, 100)
  }

  function handleMouseUp() {
    clearTimeout(dragTimeout)
    dragStart = null
  }

  function handleMouseMove(event) {
    if (dragStart) {
      ref.parentElement.scrollTop = dragStart.scrollTop - event.clientY + dragStart.y
      ref.parentElement.scrollLeft = dragStart.scrollLeft - event.clientX + dragStart.x
    }
  }

</script>

<div
  bind:this={ref}
  class={`board ${$BOARD.type}`}
  class:drag={Boolean(dragStart)}
  on:mousedown={handleMouseDown}
  on:mouseup={handleMouseUp}
  on:mousemove={handleMouseMove}
>
  {#each $BOARD.tiles as row, y}
    <div class={`board-row ${y % 2 ? 'even' : 'odd'}`}>
      {#each row as tile}
        {#if $BOARD.type === 'hex'}
          <Tile tile={tile} />
        {:else}
          <Tile tile={tile} />
        {/if}
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
  .drag > * {
    pointer-events: none;
  }
  .board-row {
    display: flex;
    align-items: center;
  }
  .board.hex .odd {
    margin-left: 48px
  }
</style>