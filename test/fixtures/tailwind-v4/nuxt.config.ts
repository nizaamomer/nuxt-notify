import tailwindcss from '@tailwindcss/vite'
import MyModule from '../../../src/module'

export default defineNuxtConfig({
  modules: [MyModule],
  vite: {
    plugins: [tailwindcss()],
  },
  css: ['~/assets/main.css'],
  notify: {
    strict: false,
    showIcon: false,
    log: true,
  },
})
