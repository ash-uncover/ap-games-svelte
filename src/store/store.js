const _registry = {
}

export const registry = {
  get: (id) => {
    return _registry[id]
  },
  add: (id, entry) => {
    if (id) {
      const entryId = id.toUpperCase()
      if (Boolean(_registry[entryId])) {
        console.warn('registry: entry already exists', entryId)
      }
      _registry[id] = entry
    }
  },
  remove: (id) => {
    if (id) {
      const entryId = id.toUpperCase()
      delete _registry[entryId]
    }
  }
}

export function dispatch(event, ...rest) {
  Object.values(_registry).forEach(entry => {
    if (typeof entry[`handle${event}`] === 'function') {
      entry[event](rest)
    }
  })
}

export function createStore(id, initialData) {
  const { subscribe, set, update } = writable(initialData)
  registry.add(id, { subscribe, set, update })
  return {
    subscribe,
    set,
    update
  }
}