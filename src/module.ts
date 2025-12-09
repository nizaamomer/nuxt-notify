// module.ts
import {
  defineNuxtModule,
  addPlugin,
  createResolver,
  addComponent,
  addImportsDir,
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
}

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
  },
  async setup(options, nuxt) {
    const resolver = createResolver(import.meta.url);

    const modules = nuxt.options.modules || [];
    const hasModule = (name: string) =>
      modules.some((m: any) => (Array.isArray(m) ? m[0] : m) === name);

    const hasTailwind =
      hasModule("@nuxtjs/tailwindcss") || hasModule("@tailwindcss/vite");
    const hasNuxtIcon = hasModule("@nuxt/icon");

    // Tailwind integration (only if present)
    if (hasTailwind) {
      nuxt.hook("tailwindcss:config" as any, (tailwindConfig: any) => {
        const runtimeGlob = resolver.resolve("./runtime/**/*.{vue,js,ts,mjs}");

        const content = tailwindConfig.content;
        if (Array.isArray(content)) content.push(runtimeGlob);
        else if (content && Array.isArray(content.files))
          content.files.push(runtimeGlob);
        else tailwindConfig.content = [runtimeGlob];

        if (!tailwindConfig.darkMode) tailwindConfig.darkMode = "class";
      });
    } else {
      nuxt.hook("ready", () => {
        console.warn(
          "[nuxt-notify] Tailwind CSS not found. Toast styles may look different."
        );
      });
    }

    // Icon integration (only if present)
    if (!hasNuxtIcon) {
      nuxt.hook("ready", () => {
        console.warn(
          "[nuxt-notify] @nuxt/icon not found. Toast icons will be hidden."
        );
      });
    }

    // Runtime config
    nuxt.options.runtimeConfig.public.notify = {
      position: options.position,
      duration: options.duration,
      maxToasts: options.maxToasts,
      theme: options.theme,
      showIcon: options.showIcon,
    };

    addImportsDir(resolver.resolve("./runtime/composables"));

    addComponent({
      name: "ToastContainer",
      filePath: resolver.resolve("./runtime/components/ToastContainer.vue"),
      global: true,
    });

    addComponent({
      name: "Toast",
      filePath: resolver.resolve("./runtime/components/Toast.vue"),
    });

    addPlugin(resolver.resolve("./runtime/plugin"));
  },
});
