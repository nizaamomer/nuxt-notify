import { computed } from 'vue'
import { useState, useRuntimeConfig } from 'nuxt/app'
import type { Toast, ToastOptions } from '../types/toast'

export const useToast = () => {
  const config = useRuntimeConfig()
  const toasts = useState<Toast[]>('nuxt-notify-toasts', () => [])

  const globalMaxToasts = computed(() => config.public.notify?.maxToasts ?? 5)

  const defaultDuration = computed(
    () => config.public.notify?.duration ?? 5000,
  )

  const showIcon = computed(() =>
    config.public.notify?.showIcon !== undefined
      ? config.public.notify.showIcon
      : true,
  )

  const add = (options: ToastOptions) => {
    const id = `toast-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`

    const duration
      = options.duration !== undefined ? options.duration : defaultDuration.value

    const effectiveMaxToasts
      = options.maxToasts !== undefined
        ? options.maxToasts
        : globalMaxToasts.value

    if (
      typeof effectiveMaxToasts === 'number'
      && effectiveMaxToasts > 0
      && toasts.value.length >= effectiveMaxToasts
    ) {
      const excess = toasts.value.length - effectiveMaxToasts + 1
      if (excess > 0) {
        toasts.value.splice(0, excess)
      }
    }

    const toast: Toast = {
      id,
      color: 'primary',
      orientation: 'vertical',
      close: true,
      closeIcon: 'i-lucide-x',
      progress: true,
      ...options,
      duration,
    }

    toasts.value.push(toast)
    return id
  }

  const remove = (id: string) => {
    const index = toasts.value.findIndex(t => t.id === id)
    if (index !== -1) {
      toasts.value.splice(index, 1)
    }
  }

  const clear = () => {
    toasts.value = []
  }

  const success = (
    title: string,
    description?: string,
    options?: Partial<ToastOptions>,
  ) =>
    add({
      title,
      description,
      color: 'success',
      ...(showIcon.value ? { icon: 'i-lucide-circle-check' } : {}),
      ...options,
    })

  const error = (
    title: string,
    description?: string,
    options?: Partial<ToastOptions>,
  ) =>
    add({
      title,
      description,
      color: 'error',
      ...(showIcon.value ? { icon: 'i-lucide-circle-x' } : {}),
      ...options,
    })

  const info = (
    title: string,
    description?: string,
    options?: Partial<ToastOptions>,
  ) =>
    add({
      title,
      description,
      color: 'info',
      ...(showIcon.value ? { icon: 'i-lucide-info' } : {}),
      ...options,
    })

  const warning = (
    title: string,
    description?: string,
    options?: Partial<ToastOptions>,
  ) =>
    add({
      title,
      description,
      color: 'warning',
      ...(showIcon.value ? { icon: 'i-lucide-triangle-alert' } : {}),
      ...options,
    })

  return {
    toasts,
    add,
    remove,
    clear,
    success,
    error,
    info,
    warning,
  }
}
