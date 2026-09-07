import MyModule from '../../../src/module'

export default defineNuxtConfig({
  modules: [
    '@nuxtjs/tailwindcss',
    MyModule,
  ],
  notify: {
    strict: false,
    showIcon: false,
  },
})
