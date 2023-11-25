export default defineNuxtConfig({
  modules: ['@nuxt/ui', 'nuxt-security', '@vueuse/nuxt'],
  nitro: {
    preset: 'vercel-edge',
  },
  ui: {
    icons: ['heroicons', 'simple-icons'],
  },
  colorMode: {
    preference: 'dark',
  },
  security: {
    headers: {
      contentSecurityPolicy: {
        'script-src': false,
      },
    },
  },
})
