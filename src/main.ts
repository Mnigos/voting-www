// eslint-disable-next-line import/no-unresolved
import 'virtual:windi.css'
import App from './App.svelte'

const app = new App({
  target: document.querySelector('#app'),
})

export default app
