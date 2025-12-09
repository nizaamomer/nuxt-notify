// runtime/plugin.ts
import { h, createApp } from "vue";
import { defineNuxtPlugin, useRuntimeConfig } from "nuxt/app";
import ToastContainer from "./components/ToastContainer.vue";

export default defineNuxtPlugin((nuxtApp) => {
  if (import.meta.client) {
    nuxtApp.hook("app:mounted", () => {
      const config = useRuntimeConfig();
      const theme = (config.public?.notify as any)?.theme ?? "dark";

      const root = document.documentElement;

      const applyTheme = (t: "dark" | "light" | "system") => {
        if (t === "system") {
          const prefersDark = window.matchMedia?.(
            "(prefers-color-scheme: dark)"
          )?.matches;
          root.classList.toggle("dark", !!prefersDark);
          return;
        }
        root.classList.toggle("dark", t === "dark");
      };

      applyTheme(theme);

      // Optional: if system, react to OS theme changes
      if (theme === "system" && window.matchMedia) {
        const mq = window.matchMedia("(prefers-color-scheme: dark)");
        const handler = () => applyTheme("system");
        mq.addEventListener?.("change", handler);
      }

      if (document.getElementById("nuxt-notify-container")) return;

      const container = document.createElement("div");
      container.id = "nuxt-notify-container";
      document.body.appendChild(container);

      const app = createApp({ render: () => h(ToastContainer) });

      const Icon = nuxtApp.vueApp.component("Icon");
      if (Icon) app.component("Icon", Icon);

      app.mount(container);
    });
  }
});
