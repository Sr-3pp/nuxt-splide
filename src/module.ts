import { readdirSync } from 'node:fs'
import { resolve, extname } from 'node:path'
import { defineNuxtModule, createResolver, addComponentsDir } from '@nuxt/kit'

const themeStyles: Record<string, string> = {
  'skyblue': '@splidejs/vue-splide/css/skyblue',
  'sea-green': '@splidejs/vue-splide/css/sea-green',
}

export default defineNuxtModule<{
  themes?: string[]
  defaults?: Record<string, number>
  defaultTheme?: string
  customTheme?: string
}>({
  meta: {
    name: '@nuxt/splide',
    configKey: 'splide',
  },

  setup(options, nuxt) {
    const resolver = createResolver(import.meta.url)

    // Auto-import the components from our module's runtime folder
    addComponentsDir({
      path: resolver.resolve('runtime/components'),
      pathPrefix: '',
      global: true,
    })

    // Auto-imoort default base splide styles
    nuxt.options.css.push('@splidejs/vue-splide/css')

    // Auto-detect custom themes in src/css
    const cssDir = resolve(__dirname, './css')
    const customThemes = readdirSync(cssDir)
      .filter(f => extname(f) === '.css')
      .map(f => f.replace('.css', ''))

    customThemes.forEach((theme) => {
      themeStyles[theme] = `@sr3pp/nuxt-splide/css/${theme}.css`
    })

    if ('defaultTheme' in options && (options.defaultTheme as string) in themeStyles) {
      nuxt.options.css.push(themeStyles[options.defaultTheme as string])
    }

    if ('customTheme' in options && options.customTheme) {
      nuxt.options.css.push(options.customTheme as string)
    }

    if ('themes' in options) {
      options.themes?.forEach((theme) => {
        if (theme in themeStyles && !nuxt.options.css.includes(themeStyles[theme])) {
          nuxt.options.css.push(themeStyles[theme])
        }
        else if (!nuxt.options.css.includes(theme)) {
          nuxt.options.css.push(theme)
        }
      })
    }

    // Expose the config in runtime so components can access it
    nuxt.options.runtimeConfig.public.splide = {
      defaults: options.defaults || {},
    }
  },
})
