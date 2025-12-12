<template>
  <li
    :class="[toastClasses, 'nuxt-notify-toast']"
    @click="handleClick"
    @mouseenter="pauseProgress"
    @mouseleave="resumeProgress"
  >
    <!-- Avatar OR Icon -->
    <div v-if="toast.avatar" :class="ui.avatar">
      <img
        v-if="toast.avatar.src"
        :src="toast.avatar.src"
        :alt="toast.avatar.alt || 'Avatar'"
        class="w-full h-full object-cover rounded-full"
      />

      <!-- Avatar Icon (centered) -->
      <span v-else-if="toast.avatar.icon" :class="ui.iconWrap">
        <Icon :name="toast.avatar.icon" :class="ui.avatarIcon" />
      </span>

      <span
        v-else-if="toast.avatar.text"
        class="flex items-center justify-center w-full h-full text-sm font-medium"
      >
        {{ toast.avatar.text }}
      </span>
    </div>

    <!-- Toast Icon (centered) -->
    <span v-else-if="shouldShowIcon && toast.icon" :class="ui.iconWrap">
      <Icon :name="toast.icon" :class="ui.icon" />
    </span>

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
          type="button"
          :class="getActionClasses(action)"
          @click.stop="handleAction(action, $event)"
        >
          <span v-if="action.icon" :class="ui.actionIconWrap">
            <Icon :name="action.icon" :class="ui.actionIcon" />
          </span>
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
        type="button"
        :class="getActionClasses(action)"
        @click.stop="handleAction(action, $event)"
      >
        <span v-if="action.icon" :class="ui.actionIconWrap">
          <Icon :name="action.icon" :class="ui.actionIcon" />
        </span>
        <span>{{ action.label }}</span>
      </button>
    </div>

    <!-- Close Button -->
    <button
      v-if="showClose"
      type="button"
      :class="ui.close"
      @click.stop="close"
      aria-label="Close"
    >
      <span :class="ui.iconWrap">
        <Icon :name="toast.closeIcon || 'i-lucide-x'" :class="ui.closeIcon" />
      </span>
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
import { useRuntimeConfig } from "nuxt/app";
import type { Toast, ToastAction, ToastColor } from "../types/toast";

const props = defineProps<{ toast: Toast }>();
const emit = defineEmits<{ remove: [id: string] }>();

const runtimeConfig = useRuntimeConfig();

const progress = ref(100);
const isPaused = ref(false);
let progressInterval: ReturnType<typeof setInterval> | null = null;

const colorClasses: Record<ToastColor, { root: string; icon: string }> = {
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

const progressColorClasses: Record<ToastColor, string> = {
  primary: "bg-blue-500",
  secondary: "bg-purple-500",
  success: "bg-green-500",
  info: "bg-blue-400",
  warning: "bg-yellow-500",
  error: "bg-red-500",
  neutral: "bg-gray-500",
};

const cx = (...parts: Array<string | false | null | undefined>) =>
  parts.filter(Boolean).join(" ");

const ui = computed(() => {
  const color = (props.toast.color || "primary") as ToastColor;
  const orientation = props.toast.orientation || "vertical";
  const o = props.toast.ui || {};

  return {
    root: cx(
      "w-full relative group overflow-hidden bg-white dark:bg-gray-900 shadow-lg rounded-lg ring-1 ring-gray-200 dark:ring-gray-800 p-4 flex gap-2.5",
      "focus:outline-none transition-all duration-300 pointer-events-auto cursor-pointer",
      orientation === "horizontal" ? "items-center" : "items-start",
      colorClasses[color]?.root,
      o.root
    ),

    // universal wrapper that centers @nuxt/icon SVGs
    iconWrap: cx("inline-flex items-center justify-center shrink-0 leading-none"),

    wrapper: cx("w-0 flex-1 flex flex-col", o.wrapper),
    title: cx("text-sm font-medium text-gray-900 dark:text-white", o.title),
    description: cx(
      "text-sm text-gray-500 dark:text-gray-400",
      props.toast.title ? "mt-1" : "",
      o.description
    ),

    // toast icon
    icon: cx("w-5 h-5", colorClasses[color]?.icon, o.icon),

    // avatar
    avatar: cx(
      "shrink-0 w-10 h-10 rounded-full overflow-hidden bg-gray-100 dark:bg-gray-800 flex items-center justify-center",
      o.avatar
    ),
    avatarIcon: cx("w-5 h-5", colorClasses[color]?.icon),

    actions: cx(
      "flex gap-1.5 shrink-0",
      orientation === "horizontal" ? "items-center" : "items-start mt-2.5",
      o.actions
    ),

    // action icon
    actionIconWrap: cx("inline-flex items-center justify-center leading-none"),
    actionIcon: "w-4 h-4",

    progress: cx(
      "absolute inset-x-0 bottom-0 h-1 transition-all duration-100",
      progressColorClasses[color],
      o.progress
    ),

    // fixed square close button (prevents tall look)
    close: cx(
      "h-8 w-8 inline-flex items-center justify-center",
      "shrink-0 rounded-md transition-colors leading-none",
      "text-gray-500 hover:text-gray-700 hover:bg-gray-100",
      "dark:text-gray-400 dark:hover:text-gray-200 dark:hover:bg-gray-800",
      "focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-gray-400/50 dark:focus-visible:ring-gray-600/60",
      "cursor-pointer",
      o.close
    ),
    closeIcon: cx("w-4 h-4 block", o.close),
  };
});

const toastClasses = computed(() => ui.value.root);

const shouldShowIcon = computed(() => {
  const globalShowIcon =
    (runtimeConfig.public?.notify as any)?.showIcon ?? true;

  if (props.toast.showIcon === false) return false;
  if (props.toast.showIcon === true) return true;

  return globalShowIcon;
});

const showClose = computed(() => props.toast.close !== false);

const showProgress = computed(() => {
  return (
    props.toast.progress !== false &&
    !!props.toast.duration &&
    props.toast.duration > 0
  );
});

const actionVariantClasses = (variant: ToastAction["variant"] = "outline") => {
  const base: Record<NonNullable<ToastAction["variant"]>, string> = {
    solid:
      "bg-gray-900 text-white hover:bg-gray-800 dark:bg-white dark:text-gray-900 dark:hover:bg-gray-100",
    outline:
      "border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800",
    soft: "bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100 hover:bg-gray-200 dark:hover:bg-gray-700",
    ghost:
      "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800",
    link: "text-gray-700 dark:text-gray-300 hover:underline",
  };
  return base[variant];
};

const actionColorRing = (color: ToastColor = "neutral") => {
  const map: Record<ToastColor, string> = {
    primary: "focus-visible:ring-blue-500/50",
    secondary: "focus-visible:ring-purple-500/50",
    success: "focus-visible:ring-green-500/50",
    info: "focus-visible:ring-blue-400/50",
    warning: "focus-visible:ring-yellow-500/50",
    error: "focus-visible:ring-red-500/50",
    neutral:
      "focus-visible:ring-gray-400/50 dark:focus-visible:ring-gray-600/60",
  };
  return map[color];
};

const getActionClasses = (action: ToastAction) => {
  const variant = action.variant || "outline";
  const color = action.color || "neutral";

  const base =
    "inline-flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium rounded-md transition-colors " +
    "focus:outline-none focus-visible:ring-2 focus-visible:ring-inset " +
    "cursor-pointer disabled:cursor-not-allowed disabled:opacity-60";

  return [
    base,
    actionVariantClasses(variant),
    actionColorRing(color),
    action.class,
  ]
    .filter(Boolean)
    .join(" ");
};

const handleClick = () => {
  props.toast.callback?.();
};

const handleAction = (action: ToastAction, event: Event) => {
  action.onClick?.(event);
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
    if (isPaused.value) return;

    progress.value -= decrement;
    if (progress.value <= 0) close();
  }, interval);
};

onMounted(startProgress);

onUnmounted(() => {
  if (progressInterval) clearInterval(progressInterval);
});
</script>
