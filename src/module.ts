import {
  defineNuxtModule,
  addPlugin,
  createResolver,
  addComponent,
  addImportsDir,
  resolvePath,
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
    const isModuleBuild = root === process.cwd();

    // Detect dependencies
    const hasTailwind = await pkgExists("tailwindcss", root);
    const hasTailwindVite = await pkgExists("@tailwindcss/vite", root);
    const hasNuxtTailwind = await pkgExists("@nuxtjs/tailwindcss", root);
    const wantsIcons = options.showIcon !== false;
    const hasNuxtIcon = wantsIcons ? await pkgExists("@nuxt/icon", root) : true;

    const missing: string[] = [];

    if (!hasTailwind && !hasNuxtTailwind && !isModuleBuild) {
      missing.push(
        "Tailwind CSS is required. Install ONE of:\n" +
          "  - Tailwind via Vite plugin: `npm i tailwindcss @tailwindcss/vite`\n" +
          "  - Tailwind via Nuxt module: `npm i -D @nuxtjs/tailwindcss`"
      );
    }

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

    // Check if @nuxtjs/tailwindcss is in modules array
    const isNuxtTailwindActive = nuxt.options.modules.some((mod) => {
      if (typeof mod === "string") {
        return (
          mod === "@nuxtjs/tailwindcss" || mod.includes("nuxtjs/tailwindcss")
        );
      }
      return false;
    });

    const usingTailwindVite = hasTailwindVite && !isNuxtTailwindActive;

    // Log detection result
    if (!isModuleBuild) {
      if (usingTailwindVite) {
        console.info("[nuxt-notify] Using Tailwind CSS via Vite plugin");
        console.info(
          "[nuxt-notify] 📝 Add this to your CSS file:\n" +
            '  @import "tailwindcss";\n' +
            '  @import "nuxt-notify/styles";'
        );
      } else if (isNuxtTailwindActive) {
        console.info(
          "[nuxt-notify] Using Tailwind CSS via @nuxtjs/tailwindcss (auto-configured ✅)"
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

    if (isNuxtTailwindActive) {
      // Tailwind v3 via @nuxtjs/tailwindcss - add content paths (fully automatic)
      nuxt.hook("tailwindcss:config" as any, function (tailwindConfig: any) {
        if (!tailwindConfig.content) {
          tailwindConfig.content = [];
        }

        const paths = [
          resolver.resolve("./runtime/components/**/*.{vue,js,ts}"),
          resolver.resolve("./runtime/composables/**/*.{js,ts}"),
          resolver.resolve("./runtime/plugin.{js,ts}"),
        ];

        if (Array.isArray(tailwindConfig.content)) {
          tailwindConfig.content.push(...paths);
        } else if (
          typeof tailwindConfig.content === "object" &&
          tailwindConfig.content.files
        ) {
          if (!Array.isArray(tailwindConfig.content.files)) {
            tailwindConfig.content.files = [];
          }
          tailwindConfig.content.files.push(...paths);
        }
      });
    }

    // Add transitions CSS
    nuxt.options.css.push(
      resolver.resolve("./runtime/assets/css/transitions.css")
    );

    // Runtime config
    nuxt.options.runtimeConfig.public.notify = {
      position: options.position,
      duration: options.duration,
      maxToasts: options.maxToasts,
      theme: options.theme,
      showIcon: options.showIcon,
    };

    // Auto-import composables
    addImportsDir(resolver.resolve("./runtime/composables"));

    // Register components
    addComponent({
      name: "ToastContainer",
      filePath: resolver.resolve("./runtime/components/ToastContainer.vue"),
      global: true,
    });

    addComponent({
      name: "Toast",
      filePath: resolver.resolve("./runtime/components/Toast.vue"),
    });

    // Register plugin
    addPlugin(resolver.resolve("./runtime/plugin"));
  },
});
