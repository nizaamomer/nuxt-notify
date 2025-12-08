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

  theme?: "dark" | "light" | "system";
  showIcon?: boolean;
}

export default defineNuxtModule<ModuleOptions>({
  meta: {
    name: "nuxt-notify",
    configKey: "toastify",
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

    if (!hasModule("@nuxtjs/tailwindcss")) {
      // @ts-ignore
      await installModule("@nuxtjs/tailwindcss");
    }
    if (!hasModule("@nuxt/icon")) {
      // @ts-ignore
      await installModule("@nuxt/icon");
    }

    // @ts-ignore
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

      if (!tailwindConfig.darkMode) {
        tailwindConfig.darkMode = "class";
      }
    });

    // ✅ UPDATED runtime config
    nuxt.options.runtimeConfig.public.toastify = {
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
