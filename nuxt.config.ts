export default {
  modules: ['@nuxt/ui'],
  nitro: {
    preset: 'vercel-edge',
  },
  ui: {
    icons: ['heroicons', 'simple-icons']
  },
  colorMode: {
    preference: 'dark'
  }
};
