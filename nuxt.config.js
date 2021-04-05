export default {
  // Target: https://go.nuxtjs.dev/config-target
  target: 'static',

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'nuxt-tmp',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    'normalize.css/normalize.css',
    '@/assets/styles/main'
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    '~/plugins/baseComponents.js',
    {src: '~/plugins/vuelidate'},
  ],

  router: {
    linkActiveClass: '_active-link',
    linkExactActiveClass: '_exact-active-link',
  },

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/style-resources',
    '@nuxtjs/axios',
    'nuxt-lazy-load',
    ['vue-currency-filter/nuxt', {
      symbol : '₽',
      thousandsSeparator: ' ',
      fractionCount: 0,
      fractionSeparator: '.',
      symbolPosition: 'back',
      symbolSpacing: true,
      avoidEmptyDecimals: undefined,
    }],
  ],

  styleResources: {
    scss: [
      'assets/styles/_vars.scss',
      'assets/styles/_mixins.scss',
    ]
  },

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {},

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    extractCSS: true
  }
}
