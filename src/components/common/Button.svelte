<script>
  export let className = ''
  export let disabled = false
</script>

<button
  class={`button${className ? ` ${className}` : ''}`}
  disabled={disabled}
  on:click
>
  <slot />
</button>

<style>
  .button {
    margin: 0;
    padding: 4px 8px;
  }
</style>