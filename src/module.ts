// module.ts
import {
  defineNuxtModule,
  addPlugin,
  createResolver,
  addComponent,
  addImportsDir,
  installModule,
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
}

export default defineNuxtModule<ModuleOptions>({
  meta: {
    name: "nuxt-toastify",
    configKey: "toastify",
    compatibility: {
      nuxt: "^3.0.0 || ^4.0.0",
    },
  },
  defaults: {
    position: "top-right",
    duration: 5000,
    maxToasts: 5,
  },
  async setup(options, nuxt) {
    const resolver = createResolver(import.meta.url);

    /**
     * Install required modules (only if not already installed)
     */
    const modules = nuxt.options.modules || [];

    const hasModule = (name: string) =>
      modules.some((m: any) => (Array.isArray(m) ? m[0] : m) === name);

    if (!hasModule("@nuxtjs/tailwindcss")) {
      // @ts-ignore - installModule is deprecated but works
      await installModule("@nuxtjs/tailwindcss");
    }

    if (!hasModule("@nuxt/icon")) {
      // @ts-ignore - installModule is deprecated but works
      await installModule("@nuxt/icon");
    }

    /**
     * Ensure Tailwind scans this module's runtime files
     * Otherwise Tailwind may purge the classes used in runtime/components/*.vue
     */
    // @ts-ignore - tailwindcss:config hook is provided by @nuxtjs/tailwindcss
    nuxt.hook("tailwindcss:config", (tailwindConfig: any) => {
      const runtimeGlob = resolver.resolve("./runtime/**/*.{vue,js,ts,mjs}");

      const content = tailwindConfig.content;

      if (Array.isArray(content)) {
        content.push(runtimeGlob);
      } else if (content && Array.isArray(content.files)) {
        content.files.push(runtimeGlob);
      } else {
        tailwindConfig.content = [runtimeGlob];
      }
    });

    /**
     * Add runtime config
     */
    nuxt.options.runtimeConfig.public.toastify = {
      position: options.position,
      duration: options.duration,
      maxToasts: options.maxToasts,
    };

    /**
     * Auto-import composables (useToast available everywhere)
     */
    addImportsDir(resolver.resolve("./runtime/composables"));

    /**
     * Register components
     */
    addComponent({
      name: "ToastContainer",
      filePath: resolver.resolve("./runtime/components/ToastContainer.vue"),
      global: true,
    });

    addComponent({
      name: "Toast",
      filePath: resolver.resolve("./runtime/components/Toast.vue"),
    });

    /**
     * Plugin that auto-mounts ToastContainer
     */
    addPlugin(resolver.resolve("./runtime/plugin"));
  },
});
