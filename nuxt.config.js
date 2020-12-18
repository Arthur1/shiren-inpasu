export default {
  // Target (https://go.nuxtjs.dev/config-target)
  target: 'static',

  // Global page headers (https://go.nuxtjs.dev/config-head)
  head: {
    title: 'Shiren Inpasu',
    titleTemplate: '%s | Shiren Inpasu',
    htmlAttrs: {
      lang: 'ja'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '風来のシレンシリーズの「もっと不思議なダンジョン」識別支援ツール' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  // Global CSS (https://go.nuxtjs.dev/config-css)
  css: [
    '@/assets/scss/app.scss',
  ],

  router: {
    trailingSlash: true,
  },

  // Plugins to run before rendering page (https://go.nuxtjs.dev/config-plugins)
  plugins: [
    '@/plugins/toast.js',
  ],

  // Auto import components (https://go.nuxtjs.dev/config-components)
  components: true,

  // Modules for dev and build (recommended) (https://go.nuxtjs.dev/config-modules)
  buildModules: [
    '@nuxtjs/google-analytics',
    '@nuxtjs/robots',
    '@nuxtjs/sitemap',
  ],

  // Modules (https://go.nuxtjs.dev/config-modules)
  modules: [
    // https://go.nuxtjs.dev/bootstrap
    'bootstrap-vue/nuxt',
    // https://go.nuxtjs.dev/pwa
    '@nuxtjs/pwa',
  ],

  // Build Configuration (https://go.nuxtjs.dev/config-build)
  build: {
  },

  bootstrapVue: {
    bootstrapCSS: false,
    bootstrapVueCSS: false,
    icons: true,
  },

  pwa: {
    manifest: {
      name: 'Shiren Inpasu',
      short_name: 'Inpasu',
      description: '風来のシレンシリーズの「もっと不思議なダンジョン」識別支援ツール',
      lang: 'ja',
      theme_color: '#2563eb',
      background_color: '#ffffff'
    },
    meta: {
      ogType: 'website',
      ogSiteName: 'Shiren Inpasu',
      ogDescription: '風来のシレンシリーズの「もっと不思議なダンジョン」識別支援ツール',
    },
  },

  googleAnalytics: {
    id: 'G-DN44TCPVLR',
  },

  publicRuntimeConfig: {},
}
