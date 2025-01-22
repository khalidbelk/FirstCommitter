// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },

  modules: [
    '@nuxtjs/tailwindcss',
    'nuxt-icon',
    'nuxt-primevue',
    '@nuxtjs/sitemap'
  ],

  site: {
    url: 'https://firstcommitter.com'
  },

  app: {
    head: {
      link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon-fc.png' }]
    }
  },

  plugins: ['~/plugins/vercel-analytics.ts'],
  compatibilityDate: '2024-10-22'
})
