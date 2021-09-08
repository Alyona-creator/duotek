export default {
  server: {
    port: 8004,
    // host: '0.0.0.0',
  },

  target: 'server',

  ssr: true,

  head: {
    title: 'default-nuxt',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
      { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
      { href: 'https://fonts.googleapis.com/css2?family=Raleway:wght@500;600&family=Rubik:wght@300;400&display=swap', rel: 'stylesheet'}
    ]
  },

  buildModules: ['nuxt-compress'],

  css: ['@/assets/scss/app.scss'],

  styleResources: {
    scss: ['./assets/scss/*.scss'],
  },

  plugins: [{ src: '~/plugins/plugins.js', mode: 'client' }, '~plugins/api.js'],

  components: true,

  modules: ['@nuxtjs/axios', '@nuxtjs/style-resources', '@nuxtjs/svg-sprite'],

  router: {
    scrollBehavior: function (to, from, savedPosition) {
      return { x: 0, y: 0 }
    }
  },
}
