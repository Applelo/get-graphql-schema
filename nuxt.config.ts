export default defineNuxtConfig({
  modules: [
    '@nuxt/ui',
    '@vueuse/nuxt',
    'nuxt-simple-robots',
  ],
  nitro: {
    preset: 'vercel-edge',
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
  experimental: {
    componentIslands: true,
  },
})
