import { ref, computed } from "vue";
import { useRuntimeConfig } from "nuxt/app";
import type { Toast, ToastOptions } from "../types/toast";

// Global state that persists across component instances
const toasts = ref<Toast[]>([]);

export const useToast = () => {
  const config = useRuntimeConfig();

  // Read from runtimeConfig INSIDE the composable (not from Node "process")
  const maxToasts = computed(() => config.public.notify?.maxToasts ?? 5);
  const defaultDuration = computed(
    () => config.public.notify?.duration ?? 5000
  );
  const showIcon = computed(() =>
    config.public.notify?.showIcon !== undefined
      ? config.public.notify.showIcon
      : true
  );

  const add = (options: ToastOptions) => {
    const id = `toast-${Date.now()}-${Math.random()
      .toString(36)
      .substring(2, 9)}`;

    const duration =
      options.duration !== undefined ? options.duration : defaultDuration.value;

    // Remove oldest toast if max limit reached
    if (toasts.value.length >= maxToasts.value) {
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
      if (toast?.callback) toast.callback();
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
      ...(showIcon.value ? { icon: "i-lucide-circle-check" } : {}),
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
      ...(showIcon.value ? { icon: "i-lucide-circle-x" } : {}),
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
      ...(showIcon.value ? { icon: "i-lucide-info" } : {}),
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
      ...(showIcon.value ? { icon: "i-lucide-triangle-alert" } : {}),
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
