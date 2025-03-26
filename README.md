# Nuxt Splide

> 📸 A zero-config Splide integration for Nuxt 3 — with built-in themes, custom theme support, and runtime switching.

[![npm version](https://img.shields.io/npm/v/@sr3pp/nuxt-splide)](https://www.npmjs.com/package/@sr3pp/nuxt-splide)
[![Nuxt Module](https://img.shields.io/badge/Nuxt%203-Module%20Ready-green)](https://nuxt.com)

---

## ✨ Features

- ✅ Auto-installs and registers [@splidejs/vue-splide](https://www.npmjs.com/package/@splidejs/vue-splide)
- ✅ Auto-imports `<SplideContainer>` and `<SplideSlide>` globally
- ✅ Built-in support for official Splide themes (`default`, `skyblue`, `sea-green`)
- ✅ Custom theme support via your own CSS
- ✅ Runtime variant switching using the `variant` prop
- ✅ Zero-config install via `nuxi module add`

---

## 🚀 Quick Start

```bash
npx nuxi module add nuxt-splide
```

Then use it immediately:

```vue
<template>
  <SplideContainer :options="{ perPage: 2 }">
    <SplideSlide v-for="n in 4" :key="n">
      Slide {{ n }}
    </SplideSlide>
  </SplideContainer>
</template>
```

✅ No manual imports required.

---

## ⚙️ Configuration

Add your configuration to `nuxt.config.ts` under the `splide` key. You can define multiple themes and a default one:

```ts
export default defineNuxtConfig({
  modules: ['nuxt-splide'],
  splide: {
    themes: ['default', 'skyblue', 'sea-green', 'sr3pp'], // multiple available themes
    defaultTheme: 'skyblue', // sets the default one
    customTheme: '~/assets/css/my-splide-theme.css' // optional
  }
})
```

### Options

| Option         | Type     | Description                                                                 |
|----------------|----------|-----------------------------------------------------------------------------|
| `defaultTheme` | `string`   | Sets the default splide style                                               |
| `customTheme`  | `string`   | Path to a custom theme CSS file in your project                             |
| `themes`       | `string[]` | List of available themes to register                                        |

---

## 🎨 Theming

### ✅ Built-in themes:

- `default`
- `skyblue`
- `sea-green`

These load the official [Splide themes](https://splidejs.com/themes/) and apply them globally.

---

### ✳️ Custom Themes

You can define your own themes using scoped CSS like this:

```css
/* assets/css/my-splide-theme.css */
.splide--mytheme .splide__arrow {
  background: linear-gradient(135deg, #8e44ad, #c0392b);
  color: white;
}
```

Then in `nuxt.config.ts`:

```ts
splide: {
  customTheme: '~/assets/css/my-splide-theme.css'
}
```

---

## 💡 Tips

- All your custom themes will extend official styles.
- Style `.splide--[variant]` instead of `.splide` to isolate themes cleanly.
- You can dynamically create your own themes inside a module like this one by compiling SCSS to `src/css/` and exporting them.

---

## 📁 File Structure Example

```
nuxt-splide/
├── src/
│   ├── module.ts            # Nuxt module setup
│   ├── runtime/
│   │   └── components/
│   │       ├── Splide.vue
│   │       └── SplideSlide.vue
│   └── css/
│       └── sr3pp.css        # Compiled custom theme
├── themes/
│   ├── utils/_tools.scss    # SCSS variables/mixins
│   └── sr3pp.scss           # SCSS theme source
```

---

## 📦 Publishing

This module uses `exports` for Nuxt-style theme loading:

```json
"exports": {
  ".": "./src/module.ts",
  "./css/sr3pp.css": "./src/css/sr3pp.css"
}
```

Users can reference themes as:

```ts
nuxt.options.css.push('nuxt-splide/css/sr3pp.css')
```

---

## 🪪 License

MIT

---

## 🧑‍🎨 Author

Created with ❤️ by [@sr3pp](https://github.com/sr-3pp)

Feel free to contribute, fork, or use in your own Nuxt modules!