function isInSelectionRange(x, y, range = 2) {
  if ($selectedTile && $selectedTile.x > -1 && $selectedTile.y > -1) {
    switch ($BOARD.type) {
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