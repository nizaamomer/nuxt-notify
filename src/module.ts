import {
  defineNuxtModule,
  addPlugin,
  createResolver,
  addComponent,
  addImportsDir,
  resolvePath,
  addVitePlugin,
} from "@nuxt/kit";

export interface ModuleOptions {
  position?:
    | "top-right"
    | "top-left"
    | "bottom-right"
    | "bottom-left"
    | "top-center"
    | "bottom-center";
  duration?: number;
  maxToasts?: number;
  theme?: "dark" | "light" | "system";
  showIcon?: boolean;
  strict?: boolean;
}

const pkgExists = async (pkg: string, cwd: string) => {
  try {
    await resolvePath(pkg, { cwd });
    return true;
  } catch {
    return false;
  }
};

export default defineNuxtModule<ModuleOptions>({
  meta: {
    name: "nuxt-notify",
    configKey: "notify",
    compatibility: { nuxt: "^3.0.0 || ^4.0.0" },
  },
  defaults: {
    position: "top-right",
    duration: 5000,
    maxToasts: 5,
    theme: "dark",
    showIcon: true,
    strict: true,
  },

  async setup(options, nuxt) {
    const resolver = createResolver(import.meta.url);
    const root = nuxt.options.rootDir;

    // Detect if we're in the module's own build process (stub mode)
    const isModuleBuild = root === process.cwd();

    // --- Detect Tailwind setup ---
    const hasTailwind = await pkgExists("tailwindcss", root);
    const hasTailwindVite = await pkgExists("@tailwindcss/vite", root);
    const hasNuxtTailwind = await pkgExists("@nuxtjs/tailwindcss", root);
    const wantsIcons = options.showIcon !== false;
    const hasNuxtIcon = wantsIcons ? await pkgExists("@nuxt/icon", root) : true;

    const missing: string[] = [];

    // Check Tailwind installation (only warn if not in module build)
    if (!hasTailwind && !hasNuxtTailwind) {
      if (!isModuleBuild) {
        missing.push(
          "Tailwind CSS is required. Install ONE of:\n" +
            "  - Tailwind via Vite plugin: `npm i tailwindcss @tailwindcss/vite`\n" +
            "  - Tailwind via Nuxt module: `npm i -D @nuxtjs/tailwindcss`"
        );
      }
    }

    // Check icon dependency
    if (!hasNuxtIcon) {
      missing.push(
        "@nuxt/icon is required when `notify.showIcon` is enabled.\n" +
          "  Install: `npx nuxi@latest module add icon`"
      );
    }

    if (missing.length) {
      const message =
        `[nuxt-notify] Missing required dependencies:\n` +
        missing.map((m) => `- ${m}`).join("\n");

      if (options.strict !== false) throw new Error(message);
      console.warn(message);
    }

    // --- Check if @nuxtjs/tailwindcss is actually in the modules array ---
    const isNuxtTailwindActive = nuxt.options.modules.some((mod) => {
      if (typeof mod === "string") {
        return (
          mod === "@nuxtjs/tailwindcss" || mod.includes("nuxtjs/tailwindcss")
        );
      }
      return false;
    });

    // Use Tailwind via Vite if @tailwindcss/vite is installed AND @nuxtjs/tailwindcss is NOT in modules
    const usingTailwindVite = hasTailwindVite && !isNuxtTailwindActive;

    // Only log in actual project, not during module build
    if (!isModuleBuild) {
      if (usingTailwindVite) {
        console.info("[nuxt-notify] Using Tailwind CSS via Vite plugin");
      } else if (isNuxtTailwindActive) {
        console.info(
          "[nuxt-notify] Using Tailwind CSS via @nuxtjs/tailwindcss"
        );
      } else if (hasTailwind || hasNuxtTailwind) {
        console.warn(
          "[nuxt-notify] Tailwind CSS detected but not properly configured. " +
            "Add @nuxtjs/tailwindcss to your modules or configure @tailwindcss/vite"
        );
      } else {
        console.warn(
          "[nuxt-notify] Tailwind CSS not found. " +
            "Install either @nuxtjs/tailwindcss or @tailwindcss/vite"
        );
      }
    }

    if (usingTailwindVite) {
      // === TAILWIND VIA VITE PLUGIN ===
      try {
        // @ts-expect-error - Optional dependency, installed by users
        const tailwindVite = await import("@tailwindcss/vite").then(
          (r) => r.default
        );
        addVitePlugin(tailwindVite());
      } catch (error) {
        // Silent - warning already shown above if needed
      }

      // Add runtime CSS with @source directive for component scanning
      nuxt.options.css.push(resolver.resolve("./runtime/assets/css/main.css"));
    } else if (isNuxtTailwindActive) {
      // === TAILWIND VIA NUXT MODULE ===

      // Hook into Tailwind config to add content paths
      nuxt.hook("tailwindcss:config" as any, function (tailwindConfig: any) {
        // Ensure content exists and is an array
        if (!tailwindConfig.content) {
          tailwindConfig.content = [];
        }

        const paths = [
          resolver.resolve("./runtime/components/**/*.{vue,js,ts}"),
          resolver.resolve("./runtime/composables/**/*.{js,ts}"),
          resolver.resolve("./runtime/plugin.{js,ts}"),
        ];

        // Handle both array and object formats
        if (Array.isArray(tailwindConfig.content)) {
          tailwindConfig.content.push(...paths);
        } else if (
          typeof tailwindConfig.content === "object" &&
          tailwindConfig.content.files
        ) {
          // Tailwind v3+ object format
          if (!Array.isArray(tailwindConfig.content.files)) {
            tailwindConfig.content.files = [];
          }
          tailwindConfig.content.files.push(...paths);
        }
      });

      // Add transition styles separately for @nuxtjs/tailwindcss
      nuxt.options.css.push(
        resolver.resolve("./runtime/assets/css/transitions.css")
      );
    }

    // --- Runtime config ---
    nuxt.options.runtimeConfig.public.notify = {
      position: options.position,
      duration: options.duration,
      maxToasts: options.maxToasts,
      theme: options.theme,
      showIcon: options.showIcon,
    };

    // --- Auto-import composables ---
    addImportsDir(resolver.resolve("./runtime/composables"));

    // --- Components ---
    addComponent({
      name: "ToastContainer",
      filePath: resolver.resolve("./runtime/components/ToastContainer.vue"),
      global: true,
    });

    addComponent({
      name: "Toast",
      filePath: resolver.resolve("./runtime/components/Toast.vue"),
    });

    // --- Plugin ---
    addPlugin(resolver.resolve("./runtime/plugin"));
  },
});
