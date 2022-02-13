import 'util/polyfill.js'
import App from 'routes/index.svelte'

const app = new App({
  target: document.body,
  props: {},
})

export default app