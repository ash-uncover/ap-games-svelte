<script>
  export let element
</script>

<!-- RENDERING -->

<div
  class='app-panel-right-element'
>
  <div>
    Current Element
  </div>
  <div>
    {$element.id}
  </div>
  <div>
    <strong>{$element.type.name}</strong>
  </div>
  <div>
    <strong>{$element.actions}/{$element.type.actions} Actions</strong>
  </div>
</div>

<!-- STYLE -->

<style>
</style>