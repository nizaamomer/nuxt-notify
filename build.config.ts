import { defineBuildConfig } from "unbuild";

export default defineBuildConfig({
  externals: ["@tailwindcss/vite", "@nuxtjs/tailwindcss"],
  failOnWarn: false,
});
