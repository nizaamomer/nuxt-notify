import MyModule from '../../../src/module'

export default defineNuxtConfig({
  modules: [MyModule],
  notify: {
    position: 'bottom-left',
    duration: 3000,
    maxToasts: 2,
    theme: 'dark',
    showIcon: false,
    strict: false,
  },
})
