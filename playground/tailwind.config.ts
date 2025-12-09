module.exports = {
  content: [
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./app.vue",
    "./error.vue",
    // Scan your module's runtime files
    "../runtime/**/*.{vue,js,ts}",
  ],
  darkMode: "class",
  theme: {
    extend: {},
  },
  plugins: [],
};
