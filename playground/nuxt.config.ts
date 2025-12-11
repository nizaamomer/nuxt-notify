import tailwindcss from "@tailwindcss/vite";

export default defineNuxtConfig({
  compatibilityDate: "2025-12-08",

  vite: {
    plugins: [tailwindcss()],
  },

  modules: ["nuxt-notify", "@nuxt/icon"],

  css: ["~/assets/css/main.css"],

  notify: {
    position: "bottom-left",
    duration: 2000,
    maxToasts: 3,
    theme: "dark",
    showIcon: true,
  },
});
