<script>
    import { onDestroy } from 'svelte'

    import {
      ELEMENTS_MAP,
    } from 'stores/elements.js'
    import {
      activeElement,
    } from 'stores/game.js'

    // Store binding
    let activeElementId
    let element
    let unsubscribeElement
    const unsubcribeActiveElement = activeElement.subscribe(value => {
      activeElementId = value
      unsubscribeElement && unsubscribeElement()
      if (activeElementId && ELEMENTS_MAP[activeElementId]) {
        unsubscribeElement = ELEMENTS_MAP[activeElementId].subscribe(value => {
          element = value
        })
      }
    })

    onDestroy(() => {
      unsubcribeActiveElement()
      unsubscribeElement && unsubscribeElement()
    })

  </script>

  <!-- RENDERING -->

  <div
    class='app-panel-right'
  >
    {#if element}
      <div>
        Current Element
      </div>
      <div>
        {element.id}
      </div>
      <div>
        <strong>{element.type}</strong>
      </div>
    {/if}
  </div>

  <!-- STYLE -->

  <style>
    .app-panel-right {
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