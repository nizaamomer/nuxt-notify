<template>
  <div :class="containerClasses">
    <TransitionGroup name="toast" tag="ul" class="flex flex-col gap-3 w-full">
      <Toast
        v-for="toast in toasts"
        :key="toast.id"
        :toast="toast"
        @remove="remove"
      />
    </TransitionGroup>
  </div>
</template>

<script setup lang="ts">
import { useRuntimeConfig } from "nuxt/app";
import { computed } from "vue";
import { useToast } from "../composables/useToast";
const { toasts, remove } = useToast();
const config = useRuntimeConfig();

const containerClasses = computed(() => {
  const position =
    (config.public?.toastify &&
      (config.public.toastify as Record<string, any>).position) ||
    "top-right";
  const baseClasses =
    "fixed pointer-events-none w-full max-w-md sm:max-w-sm md:max-w-md";

  const zIndexClass = "z-[99999]"; // Very high z-index
  const paddingClass = "p-4";

  const positionClasses = {
    "top-right": "top-0 right-0 items-end",
    "top-left": "top-0 left-0 items-start",
    "bottom-right": "bottom-0 right-0 items-end",
    "bottom-left": "bottom-0 left-0 items-start",
    "top-center": "top-0 left-1/2 -translate-x-1/2 items-center",
    "bottom-center": "bottom-0 left-1/2 -translate-x-1/2 items-center",
  };

  return [
    baseClasses,
    zIndexClass,
    paddingClass,
    positionClasses[position as keyof typeof positionClasses],
  ].join(" ");
});
</script>

<style scoped>
.toast-enter-active {
  transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  pointer-events: auto;
}

.toast-leave-active {
  transition: all 0.3s ease;
  pointer-events: auto;
}

.toast-enter-from {
  opacity: 0;
  transform: translateX(100%) scale(0.8);
}

.toast-leave-to {
  opacity: 0;
  transform: translateX(100%) scale(0.8);
}

.toast-move {
  transition: transform 0.3s ease;
}
</style>
