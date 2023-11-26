export default defineNuxtConfig({
  modules: ['@nuxt/ui', '@vueuse/nuxt'],
  nitro: {
    preset: 'vercel-edge',
  },
  ui: {
    icons: ['heroicons', 'simple-icons'],
  },
  colorMode: {
    preference: 'dark',
  },
})
