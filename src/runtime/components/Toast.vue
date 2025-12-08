<template>
  <li
    :class="toastClasses"
    @click="handleClick"
    @mouseenter="pauseProgress"
    @mouseleave="resumeProgress"
  >
    <!-- Icon or Avatar -->
    <div v-if="toast.avatar" :class="ui.avatar">
      <img
        v-if="toast.avatar.src"
        :src="toast.avatar.src"
        :alt="toast.avatar.alt || 'Avatar'"
        class="w-full h-full object-cover rounded-full"
      />
      <Icon
        v-else-if="toast.avatar.icon"
        :name="toast.avatar.icon"
        class="w-full h-full"
      />
      <span
        v-else-if="toast.avatar.text"
        class="flex items-center justify-center w-full h-full text-sm font-medium"
      >
        {{ toast.avatar.text }}
      </span>
    </div>
    <Icon v-else-if="toast.icon" :name="toast.icon" :class="ui.icon" />

    <!-- Content -->
    <div :class="ui.wrapper">
      <div v-if="toast.title" :class="ui.title">{{ toast.title }}</div>
      <div v-if="toast.description" :class="ui.description">
        {{ toast.description }}
      </div>

      <!-- Actions (vertical orientation) -->
      <div
        v-if="toast.actions && toast.orientation === 'vertical'"
        :class="ui.actions"
      >
        <button
          v-for="(action, index) in toast.actions"
          :key="index"
          :class="getActionClasses(action)"
          @click.stop="handleAction(action, $event)"
        >
          <Icon v-if="action.icon" :name="action.icon" class="w-4 h-4" />
          <span>{{ action.label }}</span>
        </button>
      </div>
    </div>

    <!-- Actions (horizontal orientation) -->
    <div
      v-if="toast.actions && toast.orientation === 'horizontal'"
      :class="ui.actions"
    >
      <button
        v-for="(action, index) in toast.actions"
        :key="index"
        :class="getActionClasses(action)"
        @click.stop="handleAction(action, $event)"
      >
        <Icon v-if="action.icon" :name="action.icon" class="w-4 h-4" />
        <span>{{ action.label }}</span>
      </button>
    </div>

    <!-- Close Button -->
    <button
      v-if="showClose"
      :class="ui.close"
      @click.stop="close"
      aria-label="Close"
    >
      <Icon :name="toast.closeIcon || 'i-lucide-x'" class="w-4 h-4" />
    </button>

    <!-- Progress Bar -->
    <div
      v-if="showProgress"
      :class="ui.progress"
      :style="{ width: `${progress}%` }"
    />
  </li>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from "vue";
import type { Toast } from "../types/toast";

const props = defineProps<{
  toast: Toast;
}>();

const emit = defineEmits<{
  remove: [id: string];
}>();

const progress = ref(100);
const isPaused = ref(false);
let progressInterval: ReturnType<typeof setInterval> | null = null;

const ui = computed(() => {
  const color = props.toast.color || "primary";
  const orientation = props.toast.orientation || "vertical";

  return {
    root: [
      "w-full relative group overflow-hidden bg-white dark:bg-gray-900 shadow-lg rounded-lg ring-1 ring-gray-200 dark:ring-gray-800 p-4 flex gap-2.5",
      "focus:outline-none transition-all duration-300 pointer-events-auto cursor-pointer",
      orientation === "horizontal" ? "items-center" : "items-start",
      colorClasses[color]?.root,
    ],
    wrapper: "w-0 flex-1 flex flex-col",
    title: "text-sm font-medium text-gray-900 dark:text-white",
    description: [
      "text-sm text-gray-500 dark:text-gray-400",
      props.toast.title && "mt-1",
    ],
    icon: ["shrink-0 w-5 h-5", colorClasses[color]?.icon],
    avatar:
      "shrink-0 w-10 h-10 rounded-full overflow-hidden bg-gray-100 dark:bg-gray-800",
    actions: [
      "flex gap-1.5 shrink-0",
      orientation === "horizontal" ? "items-center" : "items-start mt-2.5",
    ],
    progress: [
      "absolute inset-x-0 bottom-0 h-1 transition-all duration-100",
      progressColorClasses[color],
    ],
    close:
      "p-0 shrink-0 text-white hover:bg-gray-100 dark:hover:bg-gray-800 rounded transition-colors",
  };
});

const colorClasses: Record<string, any> = {
  primary: {
    root: "focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-blue-500",
    icon: "text-blue-500",
  },
  secondary: {
    root: "focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-purple-500",
    icon: "text-purple-500",
  },
  success: {
    root: "focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-green-500",
    icon: "text-green-500",
  },
  info: {
    root: "focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-blue-400",
    icon: "text-blue-400",
  },
  warning: {
    root: "focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-yellow-500",
    icon: "text-yellow-500",
  },
  error: {
    root: "focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-red-500",
    icon: "text-red-500",
  },
  neutral: {
    root: "focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-gray-500",
    icon: "text-gray-900 dark:text-white",
  },
};

const progressColorClasses: Record<string, string> = {
  primary: "bg-blue-500",
  secondary: "bg-purple-500",
  success: "bg-green-500",
  info: "bg-blue-400",
  warning: "bg-yellow-500",
  error: "bg-red-500",
  neutral: "bg-gray-500",
};

const toastClasses = computed(() => ui.value.root.filter(Boolean).join(" "));

const showClose = computed(() => {
  return props.toast.close !== false;
});

const showProgress = computed(() => {
  return (
    props.toast.progress !== false &&
    props.toast.duration &&
    props.toast.duration > 0
  );
});

const getActionClasses = (action: any) => {
  const variant = action.variant || "outline";
  const color = action.color || "neutral";

  const baseClasses =
    "inline-flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium rounded-md transition-colors";

  const variantClasses: Record<string, string> = {
    solid: `bg-gray-900 text-white hover:bg-gray-800 dark:bg-white dark:text-gray-900 dark:hover:bg-gray-100`,
    outline: `border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800`,
    soft: `bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100 hover:bg-gray-200 dark:hover:bg-gray-700`,
    ghost: `text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800`,
    link: `text-gray-700 dark:text-gray-300 hover:underline`,
  };

  return [baseClasses, variantClasses[variant], action.class]
    .filter(Boolean)
    .join(" ");
};

const handleClick = () => {
  if (props.toast.callback) {
    props.toast.callback();
  }
};

const handleAction = (action: any, event: Event) => {
  if (action.onClick) {
    action.onClick(event);
  }
};

const close = () => {
  emit("remove", props.toast.id);
};

const pauseProgress = () => {
  isPaused.value = true;
};

const resumeProgress = () => {
  isPaused.value = false;
};

const startProgress = () => {
  if (!showProgress.value) return;

  const duration = props.toast.duration || 5000;
  const interval = 50;
  const decrement = (interval / duration) * 100;

  progressInterval = setInterval(() => {
    if (!isPaused.value) {
      progress.value -= decrement;
      if (progress.value <= 0) {
        close();
      }
    }
  }, interval);
};

onMounted(() => {
  startProgress();
});

onUnmounted(() => {
  if (progressInterval) {
    clearInterval(progressInterval);
  }
});
</script>
