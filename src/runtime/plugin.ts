import { h, createApp } from "vue";
import { defineNuxtPlugin } from "nuxt/app";
import ToastContainer from "./components/ToastContainer.vue";

export default defineNuxtPlugin((nuxtApp) => {
  if (import.meta.client) {
    nuxtApp.hook("app:mounted", () => {
      if (document.getElementById("nuxt-toastify-container")) return;

      const container = document.createElement("div");
      container.id = "nuxt-toastify-container";
      document.body.appendChild(container);

      const app = createApp({ render: () => h(ToastContainer) });

      // register Icon for this isolated app
      const Icon = nuxtApp.vueApp.component("Icon");
      if (Icon) {
        app.component("Icon", Icon);
      }

      app.mount(container);
    });
  }
});
