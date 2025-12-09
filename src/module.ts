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

    // --- Tailwind content auto-registration ---
    nuxt.hook("tailwindcss:config" as any, function (tailwindConfig: any) {
      // Ensure content exists and is an array
      if (!tailwindConfig.content) {
        tailwindConfig.content = [];
      }

      // Handle both array and object formats
      if (Array.isArray(tailwindConfig.content)) {
        tailwindConfig.content.push(
          resolver.resolve("./runtime/components/**/*.{vue,js,ts}"),
          resolver.resolve("./runtime/composables/**/*.{js,ts}"),
          resolver.resolve("./runtime/plugin.{js,ts}")
        );
      } else if (
        typeof tailwindConfig.content === "object" &&
        tailwindConfig.content.files
      ) {
        // Tailwind v3+ object format
        if (!Array.isArray(tailwindConfig.content.files)) {
          tailwindConfig.content.files = [];
        }
        tailwindConfig.content.files.push(
          resolver.resolve("./runtime/components/**/*.{vue,js,ts}"),
          resolver.resolve("./runtime/composables/**/*.{js,ts}"),
          resolver.resolve("./runtime/plugin.{js,ts}")
        );
      }
    });

    // --- Dependency checks ---
    const hasTailwind = await pkgExists("tailwindcss", root);
    const hasNuxtTailwind = await pkgExists("@nuxtjs/tailwindcss", root);

    const wantsIcons = options.showIcon !== false;
    const hasNuxtIcon = wantsIcons ? await pkgExists("@nuxt/icon", root) : true;

    const missing: string[] = [];

    if (!hasTailwind && !hasNuxtTailwind) {
      missing.push(
        "Tailwind is required. Install: `npm i -D @nuxtjs/tailwindcss`"
      );
    }

    if (!hasNuxtIcon) {
      missing.push(
        "@nuxt/icon is required when `notify.showIcon` is enabled. Install: `npx nuxi@latest module add icon`"
      );
    }

    if (missing.length) {
      const message =
        `[nuxt-notify] Missing required dependencies:\n` +
        missing.map((m) => `- ${m}`).join("\n");

      if (options.strict !== false) throw new Error(message);
      console.warn(message);
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
