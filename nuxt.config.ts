export default defineNuxtConfig({
  modules: [
    '@nuxt/ui',
    '@vueuse/nuxt',
    'nuxt-simple-robots',
    'nuxt-shiki',
  ],
  shiki: {
    defaultTheme: 'dracula',
    bundledThemes: ['dracula'],
    bundledLangs: ['typescript', 'graphql'],
  },
  nitro: {
    preset: 'vercel',
    experimental: {
      wasm: true,
    },
  },
  ui: {
    icons: [
      'heroicons',
      'simple-icons',
    ],
  },
  colorMode: {
    preference: 'dark',
  },
})
