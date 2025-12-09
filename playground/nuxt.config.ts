export default defineNuxtConfig({
  compatibilityDate: "2025-12-08",
  modules: ["@nuxtjs/tailwindcss", "nuxt-notify", "@nuxt/icon"],

  css: ["~/assets/css/main.css"],

  notify: {
    position: "bottom-left",
    duration: 2000,
    maxToasts: 3,
    theme: "dark",
    showIcon: true,
  },
});
