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
  const position = (config.public?.notify as any)?.position ?? "top-right";

  const base =
    "fixed pointer-events-none w-full max-w-md sm:max-w-sm md:max-w-md flex flex-col";
  const zIndex = "z-[99999]";
  const padding = "p-4";

  const positions = {
    "top-right": "top-0 right-0 items-end",
    "top-left": "top-0 left-0 items-start",
    "bottom-right": "bottom-0 right-0 items-end",
    "bottom-left": "bottom-0 left-0 items-start",
    "top-center": "top-0 left-1/2 -translate-x-1/2 items-center",
    "bottom-center": "bottom-0 left-1/2 -translate-x-1/2 items-center",
  } as const;

  return [base, zIndex, padding, positions[position as keyof typeof positions]]
    .filter(Boolean)
    .join(" ");
});
</script>
