import 'util/polyfill.js'
import App from 'components/app/App.svelte'

const app = new App({
  target: document.body,
  props: {},
})

export default app