import { ref } from "vue";
import type { Toast, ToastOptions } from "../types/toast";
import { useRuntimeConfig } from "nuxt/app";

// Use a global state that persists across component instances
const toasts = ref<Toast[]>([]);

export const useToast = () => {
  const config = useRuntimeConfig();
  const maxToasts = config.public.toastify?.maxToasts || 5;

  const add = (options: ToastOptions) => {
    const id = `toast-${Date.now()}-${Math.random()
      .toString(36)
      .substring(2, 9)}`;
    const duration =
      options.duration !== undefined
        ? options.duration
        : config.public.toastify?.duration ?? 5000;

    // Remove oldest toast if max limit reached
    if (toasts.value.length >= maxToasts) {
      toasts.value.shift();
    }

    const toast: Toast = {
      id,
      color: "primary",
      orientation: "vertical",
      close: true,
      closeIcon: "i-lucide-x",
      progress: true,
      ...options,
      duration,
    };

    toasts.value.push(toast);

    return id;
  };

  const remove = (id: string) => {
    const index = toasts.value.findIndex((t) => t.id === id);
    if (index > -1) {
      const toast = toasts.value[index];
      if (toast?.callback) {
        toast.callback();
      }
      toasts.value.splice(index, 1);
    }
  };

  const clear = () => {
    toasts.value = [];
  };

  // Convenience methods
  const success = (
    title: string,
    description?: string,
    options?: Partial<ToastOptions>
  ) => {
    return add({
      title,
      description,
      color: "success",
      icon: "i-lucide-circle-check",
      ...options,
    });
  };

  const error = (
    title: string,
    description?: string,
    options?: Partial<ToastOptions>
  ) => {
    return add({
      title,
      description,
      color: "error",
      icon: "i-lucide-circle-x",
      ...options,
    });
  };

  const info = (
    title: string,
    description?: string,
    options?: Partial<ToastOptions>
  ) => {
    return add({
      title,
      description,
      color: "info",
      icon: "i-lucide-info",
      ...options,
    });
  };

  const warning = (
    title: string,
    description?: string,
    options?: Partial<ToastOptions>
  ) => {
    return add({
      title,
      description,
      color: "warning",
      icon: "i-lucide-triangle-alert",
      ...options,
    });
  };

  return {
    toasts,
    add,
    remove,
    clear,
    success,
    error,
    info,
    warning,
  };
};
