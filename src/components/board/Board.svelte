<script>
  import BoardTile from 'components/board/BoardTile.svelte'

  import {
    BOARD,
  } from 'store/stores/board.js'

  let ref
  let dragStart

  function handleMouseDown() {
    ref.addEventListener('mousemove', handleMouseMove)
  }

  function handleMouseUp() {
    ref.removeEventListener('mousemove', handleMouseMove)
    dragStart = null
  }

  function handleMouseMove(event) {
    if (dragStart) {
      ref.parentElement.scrollTop = dragStart.scrollTop - event.clientY + dragStart.y
      ref.parentElement.scrollLeft = dragStart.scrollLeft - event.clientX + dragStart.x
    } else {
      dragStart = {
        x: event.clientX,
        y: event.clientY,
        scrollTop: ref.parentElement.scrollTop,
        scrollLeft: ref.parentElement.scrollLeft,
      }
    }
  }

</script>

<div
  bind:this={ref}
  class={`board ${$BOARD.type}`}
  class:drag={Boolean(dragStart)}
  on:mousedown={handleMouseDown}
  on:mouseup={handleMouseUp}
>
  {#each $BOARD.tiles as row, y}
    <div class={`board-row ${y % 2 ? 'even' : 'odd'}`}>
      {#each row as tile}
        <BoardTile tile={tile} />
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
  .board.drag:hover {
    cursor: url('/assets/cursor/Move.png'), auto !important;
  }
  .board.drag > * {
    pointer-events: none;
  }
  .board-row {
    display: flex;
    align-items: center;
  }
  .board.hex .odd {
    margin-left: 44px
  }
</style>