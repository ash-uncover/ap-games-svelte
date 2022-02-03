<script>
  export let className;
</script>

<button
  class={`button${className ? ` ${className}` : ''}`}
  on:click
>
  <slot />
</button>

<style>
  .button {
    margin: 0;
    padding: 4px;
  }
</style>