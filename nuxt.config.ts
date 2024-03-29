// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ['@nuxtjs/tailwindcss', 'nuxt-icon', 'nuxt-primevue'],
  app: {
    head: {
      title: 'FirstCommitter',
      meta: [
        { charset: 'utf-8' },
        { hid: 'description', name: 'description', content: '' }
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon-fc.png' }
      ]
    }
  },
  plugins: [
    '~/plugins/vercel-analytics.ts',
  ],
})
