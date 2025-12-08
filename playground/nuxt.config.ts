export default defineNuxtConfig({
  modules: ["nuxt-toastify-plus"],
  compatibilityDate: "2025-12-08",
  toastify: {
    position: "bottom-left",
    duration: 2000,
    maxToasts: 3,
    theme: "light",
    showIcon: true,
  },
});
