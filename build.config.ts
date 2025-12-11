import { defineBuildConfig } from "unbuild";

export default defineBuildConfig({
  externals: ["@tailwindcss/vite", "@nuxtjs/tailwindcss"],
  failOnWarn: false,
  clean: true,
  declaration: true,

  entries: [
    {
      input: "src/module",
      outDir: "dist",
    },
    {
      input: "src/runtime/",
      outDir: "dist/runtime",
    },
  ],

  hooks: {
    "build:done": async () => {
      const fs = await import("fs/promises");
      const path = await import("path");

      try {
        await fs
          .mkdir(path.resolve("dist/runtime/assets/css"), {
            recursive: true,
          })
          .catch(() => {});

        const files = [
          {
            src: "src/runtime/assets/css/transitions.css",
            dest: "dist/runtime/assets/css/transitions.css",
          },
          {
            src: "src/runtime/styles.css",
            dest: "dist/runtime/styles.css",
          },
        ];

        for (const file of files) {
          try {
            await fs.access(path.resolve(file.src));
            await fs.copyFile(path.resolve(file.src), path.resolve(file.dest));
          } catch {
            // File doesn't exist, skip silently
          }
        }
      } catch {
        // Build errors are handled by unbuild
      }
    },
  },
});
