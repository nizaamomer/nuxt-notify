export default defineNuxtConfig({
  compatibilityDate: "2025-12-08",
  modules: ["nuxt-notify"],
  notify: {
    position: "bottom-left",
    duration: 2000,
    maxToasts: 3,
    theme: "dark",
    showIcon: true,
  },
});
