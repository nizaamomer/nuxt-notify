export {}

declare module 'nuxt/schema' {
  interface PublicRuntimeConfig {
    notify?: {
      position?:
        | 'top-right'
        | 'top-left'
        | 'bottom-right'
        | 'bottom-left'
        | 'top-center'
        | 'bottom-center'
      duration?: number
      maxToasts?: number
      theme?: 'dark' | 'light' | 'system'
      showIcon?: boolean
    }
  }

  interface NuxtConfig {
    notify?: {
      position?:
        | 'top-right'
        | 'top-left'
        | 'bottom-right'
        | 'bottom-left'
        | 'top-center'
        | 'bottom-center'
      duration?: number
      maxToasts?: number
      theme?: 'dark' | 'light' | 'system'
      showIcon?: boolean
      /** Always show setup logs. Default shows them once per project (or after upgrades). */
      log?: boolean
      /** Throw when required peer dependencies are missing (default: true) */
      strict?: boolean
    }
  }
}
