import { h, render } from 'vue'
import { defineNuxtPlugin, useRuntimeConfig } from 'nuxt/app'
import ToastContainer from './components/ToastContainer.vue'

type NotifyTheme = 'dark' | 'light' | 'system'

const applyTheme = (el: HTMLElement, theme: NotifyTheme) => {
  if (theme === 'system') {
    const prefersDark
      = window.matchMedia?.('(prefers-color-scheme: dark)')?.matches ?? false
    el.classList.toggle('dark', prefersDark)
    return
  }
  el.classList.toggle('dark', theme === 'dark')
}

export default defineNuxtPlugin((nuxtApp) => {
  if (!import.meta.client) return

  nuxtApp.hook('app:mounted', () => {
    if (document.getElementById('nuxt-notify-container')) return

    const config = useRuntimeConfig()
    const theme
      = ((config.public?.notify as { theme?: NotifyTheme } | undefined)?.theme
        ?? 'system') as NotifyTheme

    const container = document.createElement('div')
    container.id = 'nuxt-notify-container'
    document.body.appendChild(container)

    applyTheme(container, theme)

    if (theme === 'system' && window.matchMedia) {
      const mq = window.matchMedia('(prefers-color-scheme: dark)')
      const handler = () => applyTheme(container, 'system')
      mq.addEventListener('change', handler)
    }

    const vnode = h(ToastContainer);
    (vnode as { appContext?: unknown }).appContext = nuxtApp.vueApp._context

    render(vnode, container)
  })
})
