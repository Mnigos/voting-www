import { clientPlugin, defineConfig } from '@vitebook/client/node'
import {
  defaultThemePlugin,
  DefaultThemeConfig,
} from '@vitebook/theme-default/node'

export default defineConfig<DefaultThemeConfig>({
  include: ['src/**/*.story.svelte'],
  plugins: [clientPlugin({ appFile: 'App.svelte' }), defaultThemePlugin()],
  site: {
    title: 'voting-www',
    description: '',
    theme: {},
  },
})
