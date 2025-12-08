export {};

declare module "nuxt/schema" {
  interface PublicRuntimeConfig {
    toastify?: {
      position?:
        | "top-right"
        | "top-left"
        | "bottom-right"
        | "bottom-left"
        | "top-center"
        | "bottom-center";
      duration?: number;
      maxToasts?: number;
    };
  }
}
