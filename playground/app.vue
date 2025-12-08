<template>
  <div
    class="min-h-screen bg-gray-50 text-gray-900 dark:bg-gray-950 dark:text-gray-100"
  >
    <!-- Top bar (Nuxt-like) -->
    <header
      class="sticky top-0 z-10 border-b border-gray-200/70 bg-white/70 backdrop-blur dark:border-gray-800/70 dark:bg-gray-950/60"
    >
      <div
        class="mx-auto flex max-w-6xl items-center justify-between px-4 py-4"
      >
        <div class="flex items-center gap-3">
          <div
            class="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-600 text-white shadow-sm"
          >
            <Icon name="i-lucide-toast" class="h-5 w-5" />
          </div>
          <div>
            <h1 class="text-lg font-semibold leading-tight">
              nuxt-toastify-plus
            </h1>
            <p class="text-xs text-gray-600 dark:text-gray-400">
              Tailwind + Nuxt Icon toast notifications
            </p>
          </div>
        </div>

        <div class="flex items-center gap-2">
          <!-- Theme switch -->
          <div
            class="hidden sm:flex items-center gap-1 rounded-xl border border-gray-200 bg-white p-1 dark:border-gray-800 dark:bg-gray-900"
          >
            <button
              class="seg"
              :class="{ 'seg-active': theme === 'dark' }"
              @click="setTheme('dark')"
            >
              <Icon name="i-lucide-moon" class="h-4 w-4" />
              <span class="hidden md:inline">Dark</span>
            </button>
            <button
              class="seg"
              :class="{ 'seg-active': theme === 'light' }"
              @click="setTheme('light')"
            >
              <Icon name="i-lucide-sun" class="h-4 w-4" />
              <span class="hidden md:inline">Light</span>
            </button>
            <button
              class="seg"
              :class="{ 'seg-active': theme === 'system' }"
              @click="setTheme('system')"
            >
              <Icon name="i-lucide-monitor" class="h-4 w-4" />
              <span class="hidden md:inline">System</span>
            </button>
          </div>

          <!-- Links (optional) -->
          <a
            class="btn-ghost"
            href="https://github.com/nizaamomer/nuxt-toastify-plus"
            target="_blank"
            rel="noreferrer"
          >
            <Icon name="i-lucide-github" class="h-4 w-4" />
            <span class="hidden sm:inline">GitHub</span>
          </a>
        </div>
      </div>
    </header>

    <main class="mx-auto max-w-6xl px-4 py-10">
      <!-- Hero -->
      <section class="mb-10">
        <div
          class="rounded-3xl border border-gray-200 bg-white p-8 shadow-sm dark:border-gray-800 dark:bg-gray-900"
        >
          <div
            class="flex flex-col gap-4 md:flex-row md:items-center md:justify-between"
          >
            <div>
              <h2 class="text-2xl font-semibold tracking-tight">
                Modern toast notifications for Nuxt
              </h2>
              <p class="mt-1 text-sm text-gray-600 dark:text-gray-400">
                Position, duration, max stack, theme, icons, avatars, actions,
                and per-toast UI overrides.
              </p>
            </div>

            <div class="flex flex-wrap gap-2">
              <span class="badge">position: {{ toastifyCfg.position }}</span>
              <span class="badge">duration: {{ toastifyCfg.duration }}ms</span>
              <span class="badge">maxToasts: {{ toastifyCfg.maxToasts }}</span>
              <span class="badge">theme: {{ toastifyCfg.theme }}</span>
              <span class="badge">showIcon: {{ toastifyCfg.showIcon }}</span>
            </div>
          </div>

          <!-- Controls row -->
          <div class="mt-6 grid gap-4 md:grid-cols-3">
            <!-- Theme controls (mobile visible too) -->
            <div
              class="rounded-2xl border border-gray-200 bg-gray-50 p-4 dark:border-gray-800 dark:bg-gray-950"
            >
              <div class="flex items-center justify-between">
                <h3 class="text-sm font-semibold">Theme</h3>
                <span class="text-xs text-gray-500 dark:text-gray-400"
                  >demo toggle</span
                >
              </div>
              <div class="mt-3 flex flex-wrap gap-2">
                <button class="btn-soft" @click="setTheme('dark')">
                  <Icon name="i-lucide-moon" class="h-4 w-4" /> Dark
                </button>
                <button class="btn-soft" @click="setTheme('light')">
                  <Icon name="i-lucide-sun" class="h-4 w-4" /> Light
                </button>
                <button class="btn-soft" @click="setTheme('system')">
                  <Icon name="i-lucide-monitor" class="h-4 w-4" /> System
                </button>
              </div>
              <p class="mt-3 text-xs text-gray-600 dark:text-gray-400">
                This demo toggles <code class="code">html.dark</code>. In real
                apps, set <code class="code">toastify.theme</code> in
                <code class="code">nuxt.config</code>.
              </p>
            </div>

            <!-- Direction controls -->
            <div
              class="rounded-2xl border border-gray-200 bg-gray-50 p-4 dark:border-gray-800 dark:bg-gray-950"
            >
              <div class="flex items-center justify-between">
                <h3 class="text-sm font-semibold">Direction</h3>
                <span class="text-xs text-gray-500 dark:text-gray-400"
                  >RTL / LTR</span
                >
              </div>
              <div class="mt-3 flex flex-wrap gap-2">
                <button class="btn-soft" @click="setDir('ltr')">
                  <Icon name="i-lucide-arrow-right-left" class="h-4 w-4" />
                  LTR
                </button>
                <button class="btn-soft" @click="setDir('rtl')">
                  <Icon name="i-lucide-arrow-left-right" class="h-4 w-4" />
                  RTL
                </button>
              </div>
              <p class="mt-3 text-xs text-gray-600 dark:text-gray-400">
                Changes <code class="code">document.documentElement.dir</code>.
                Useful to verify layout in RTL languages.
              </p>
            </div>

            <!-- Icon toggle (showIcon case) -->
            <div
              class="rounded-2xl border border-gray-200 bg-gray-50 p-4 dark:border-gray-800 dark:bg-gray-950"
            >
              <div class="flex items-center justify-between">
                <h3 class="text-sm font-semibold">Icons</h3>
                <span class="text-xs text-gray-500 dark:text-gray-400"
                  >global + per-toast</span
                >
              </div>

              <div class="mt-3 flex flex-wrap items-center gap-2">
                <button class="btn-soft" @click="toggleIcons()">
                  <Icon
                    :name="iconsEnabled ? 'i-lucide-eye' : 'i-lucide-eye-off'"
                    class="h-4 w-4"
                  />
                  {{ iconsEnabled ? "Icons ON (demo)" : "Icons OFF (demo)" }}
                </button>

                <button class="btn-ghost" @click="demoIconOverrides()">
                  <Icon name="i-lucide-sliders-horizontal" class="h-4 w-4" />
                  Show override demo
                </button>
              </div>

              <p class="mt-3 text-xs text-gray-600 dark:text-gray-400">
                In real usage: <code class="code">toastify.showIcon</code> in
                Nuxt config. Per-toast:
                <code class="code">showIcon: false</code>.
              </p>
            </div>
          </div>
        </div>
      </section>

      <!-- Grid -->
      <section class="grid gap-6 md:grid-cols-2">
        <!-- Basic -->
        <div class="panel">
          <div class="panel-head">
            <h3 class="panel-title">Basic</h3>
            <p class="panel-desc">Convenience helpers</p>
          </div>
          <div class="grid grid-cols-2 gap-3">
            <button @click="showSuccess" class="btn-success">
              <Icon name="i-lucide-circle-check" class="h-5 w-5" />
              Success
            </button>
            <button @click="showError" class="btn-danger">
              <Icon name="i-lucide-circle-x" class="h-5 w-5" />
              Error
            </button>
            <button @click="showInfo" class="btn-info">
              <Icon name="i-lucide-info" class="h-5 w-5" />
              Info
            </button>
            <button @click="showWarning" class="btn-warn">
              <Icon name="i-lucide-triangle-alert" class="h-5 w-5" />
              Warning
            </button>
          </div>
        </div>

        <!-- Description -->
        <div class="panel">
          <div class="panel-head">
            <h3 class="panel-title">With Description</h3>
            <p class="panel-desc">Title + description</p>
          </div>
          <div class="space-y-3">
            <button @click="showWithDescription" class="btn-primary w-full">
              <Icon name="i-lucide-message-square" class="h-5 w-5" />
              Show detailed toast
            </button>
            <button @click="showCalendarEvent" class="btn-secondary w-full">
              <Icon name="i-lucide-calendar-days" class="h-5 w-5" />
              Calendar event
            </button>
          </div>
        </div>

        <!-- Actions -->
        <div class="panel">
          <div class="panel-head">
            <h3 class="panel-title">Actions</h3>
            <p class="panel-desc">Vertical + horizontal</p>
          </div>
          <div class="space-y-3">
            <button @click="showWithActionsVertical" class="btn-primary w-full">
              <Icon name="i-lucide-zap" class="h-5 w-5" />
              Vertical actions
            </button>
            <button
              @click="showWithActionsHorizontal"
              class="btn-secondary w-full"
            >
              <Icon name="i-lucide-layout-grid" class="h-5 w-5" />
              Horizontal actions
            </button>
          </div>
        </div>

        <!-- Avatar -->
        <div class="panel">
          <div class="panel-head">
            <h3 class="panel-title">Avatar</h3>
            <p class="panel-desc">Image + icon + text</p>
          </div>
          <div class="space-y-3">
            <button @click="showWithAvatarImage" class="btn-primary w-full">
              <Icon name="i-lucide-user-plus" class="h-5 w-5" />
              Avatar image
            </button>
            <button @click="showWithAvatarIcon" class="btn-secondary w-full">
              <Icon name="i-lucide-bell" class="h-5 w-5" />
              Avatar icon
            </button>
            <button @click="showWithAvatarText" class="btn-soft w-full">
              <Icon name="i-lucide-a-large-small" class="h-5 w-5" />
              Avatar text
            </button>
          </div>
        </div>

        <!-- Options -->
        <div class="panel">
          <div class="panel-head">
            <h3 class="panel-title">Options</h3>
            <p class="panel-desc">Progress, duration, callback</p>
          </div>
          <div class="space-y-3">
            <button @click="showNoProgress" class="btn-soft w-full">
              <Icon name="i-lucide-loader-circle" class="h-5 w-5" />
              No progress bar
            </button>
            <button @click="showLongDuration" class="btn-soft w-full">
              <Icon name="i-lucide-clock" class="h-5 w-5" />
              Long duration (10s)
            </button>
            <button @click="showClickableToast" class="btn-soft w-full">
              <Icon name="i-lucide-mouse-pointer-click" class="h-5 w-5" />
              Click callback
            </button>
          </div>
        </div>

        <!-- Custom UI -->
        <div class="panel">
          <div class="panel-head">
            <h3 class="panel-title">Custom UI</h3>
            <p class="panel-desc">Per-toast Tailwind overrides</p>
          </div>
          <div class="space-y-3">
            <button @click="showCustomUiGlass" class="btn-primary w-full">
              <Icon name="i-lucide-sparkles" class="h-5 w-5" />
              Glass UI
            </button>
            <button @click="showCustomUiCompact" class="btn-secondary w-full">
              <Icon name="i-lucide-align-left" class="h-5 w-5" />
              Compact UI
            </button>
            <button @click="showCustomUiDanger" class="btn-danger w-full">
              <Icon name="i-lucide-shield-alert" class="h-5 w-5" />
              Critical UI
            </button>
          </div>
        </div>
      </section>

      <!-- Multiple + code -->
      <section class="mt-8">
        <div
          class="rounded-3xl border border-gray-200 bg-white p-8 shadow-sm dark:border-gray-800 dark:bg-gray-900"
        >
          <div
            class="flex flex-col gap-4 md:flex-row md:items-center md:justify-between"
          >
            <div>
              <h3 class="text-xl font-semibold">Multiple toasts</h3>
              <p class="mt-1 text-sm text-gray-600 dark:text-gray-400">
                Demonstrates stacking + maxToasts trimming.
              </p>
            </div>

            <div class="flex flex-wrap gap-2">
              <button @click="showMultiple" class="btn-primary">
                <Icon name="i-lucide-layers" class="h-5 w-5" />
                Show multiple
              </button>
              <button @click="toast.clear()" class="btn-danger">
                <Icon name="i-lucide-trash-2" class="h-5 w-5" />
                Clear all
              </button>
            </div>
          </div>

          <div class="mt-6 grid gap-6 md:grid-cols-2">
            <div>
              <h4
                class="text-sm font-semibold text-gray-800 dark:text-gray-200 mb-2"
              >
                Basic usage
              </h4>
              <pre class="codeblock"><code>const toast = useToast()

toast.success('Success!')
toast.error('Error!')
toast.info('Information')
toast.warning('Warning!')</code></pre>
            </div>

            <div>
              <h4
                class="text-sm font-semibold text-gray-800 dark:text-gray-200 mb-2"
              >
                Disable icons
              </h4>
              <pre class="codeblock"><code>// nuxt.config.ts
export default defineNuxtConfig({
  modules: ['nuxt-toastify-plus'],
  toastify: {
    showIcon: false
  }
})

// per-toast override
toast.add({
  title: 'No icon',
  showIcon: false
})</code></pre>
            </div>
          </div>
        </div>
      </section>
    </main>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";
import { useRuntimeConfig } from "nuxt/app";

// useToast auto-imported by your module
const toast = useToast();

const runtime = useRuntimeConfig();
const toastifyCfg = computed(() => {
  const cfg = (runtime.public?.toastify as any) || {};
  return {
    position: cfg.position ?? "top-right",
    duration: cfg.duration ?? 5000,
    maxToasts: cfg.maxToasts ?? 5,
    theme: cfg.theme ?? "dark",
    showIcon: cfg.showIcon ?? true,
  };
});

/**
 * Demo-only toggles (because runtimeConfig doesn't change live)
 */
const theme = ref<"dark" | "light" | "system">(toastifyCfg.value.theme);
const iconsEnabled = ref<boolean>(toastifyCfg.value.showIcon);

const setTheme = (t: "dark" | "light" | "system") => {
  theme.value = t;

  const root = document.documentElement;
  if (t === "system") {
    const prefersDark =
      window.matchMedia?.("(prefers-color-scheme: dark)")?.matches ?? false;
    root.classList.toggle("dark", prefersDark);
  } else {
    root.classList.toggle("dark", t === "dark");
  }

  toast.info("Theme switched", `Theme: ${t}`, {
    color: "neutral",
    icon: iconsEnabled.value
      ? t === "dark"
        ? "i-lucide-moon"
        : t === "light"
        ? "i-lucide-sun"
        : "i-lucide-monitor"
      : undefined,
    showIcon: iconsEnabled.value, // per-toast
    duration: 1800,
  } as any);
};

const setDir = (dir: "ltr" | "rtl") => {
  document.documentElement.dir = dir;

  toast.add({
    title: "Direction changed",
    description: `Document direction set to ${dir.toUpperCase()}.`,
    icon: "i-lucide-arrow-right-left",
    color: "neutral",
    showIcon: iconsEnabled.value,
    duration: 2000,
  });
};

const toggleIcons = () => {
  iconsEnabled.value = !iconsEnabled.value;

  toast.add({
    title: "Demo icon toggle",
    description:
      "This toggles per-toast `showIcon` in the demo. Real usage is `toastify.showIcon` in nuxt.config.",
    icon: iconsEnabled.value ? "i-lucide-eye" : "i-lucide-eye-off",
    color: "neutral",
    showIcon: true, // keep the toggle toast visible
    duration: 2500,
  });
};

const demoIconOverrides = () => {
  toast.add({
    title: "Per-toast icon override",
    description: "This toast forces icon OFF even if enabled.",
    icon: "i-lucide-bell",
    color: "info",
    showIcon: false,
    duration: 2500,
  });

  toast.add({
    title: "Per-toast icon override",
    description: "This toast forces icon ON even if demo toggle is off.",
    icon: "i-lucide-bell",
    color: "success",
    showIcon: true,
    duration: 2500,
  });
};

// ---- Basic ----
const showSuccess = () =>
  toast.success(
    "Operation completed successfully!",
    "Your changes have been saved.",
    {
      showIcon: iconsEnabled.value,
    } as any
  );

const showError = () =>
  toast.error(
    "Uh oh! Something went wrong.",
    "There was a problem with your request.",
    {
      showIcon: iconsEnabled.value,
    } as any
  );

const showInfo = () =>
  toast.info(
    "New update available",
    "Version 2.0 is now available for download.",
    {
      showIcon: iconsEnabled.value,
    } as any
  );

const showWarning = () =>
  toast.warning("Please be careful!", "This action cannot be undone.", {
    showIcon: iconsEnabled.value,
  } as any);

// ---- With description ----
const showWithDescription = () => {
  toast.add({
    title: "Detailed notification",
    description:
      "This is a longer description that provides more context about what happened.",
    icon: "i-lucide-message-square",
    color: "info",
    showIcon: iconsEnabled.value,
  });
};

const showCalendarEvent = () => {
  const eventDate = new Date(Date.now() + Math.random() * 31536000000);
  const formattedDate = eventDate.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  toast.add({
    title: "Event added to calendar",
    description: `This event is scheduled for ${formattedDate}.`,
    icon: "i-lucide-calendar-days",
    color: "success",
    showIcon: iconsEnabled.value,
  });
};

// ---- Actions ----
const showWithActionsVertical = () => {
  toast.add({
    title: "Connection lost",
    description: "Unable to connect to the server.",
    icon: "i-lucide-wifi-off",
    color: "error",
    orientation: "vertical",
    showIcon: iconsEnabled.value,
    actions: [
      {
        icon: "i-lucide-refresh-cw",
        label: "Retry",
        variant: "outline",
        onClick: (e) => {
          e?.stopPropagation();
          toast.success("Reconnected!", "Connection has been restored.", {
            showIcon: iconsEnabled.value,
          } as any);
        },
      },
      {
        icon: "i-lucide-x",
        label: "Dismiss",
        variant: "ghost",
        onClick: (e) => {
          e?.stopPropagation();
          toast.info("Dismissed", undefined, {
            showIcon: iconsEnabled.value,
          } as any);
        },
      },
    ],
  });
};

const showWithActionsHorizontal = () => {
  toast.add({
    title: "File upload complete",
    description: "Your file has been successfully uploaded.",
    icon: "i-lucide-upload",
    color: "success",
    orientation: "horizontal",
    showIcon: iconsEnabled.value,
    actions: [
      {
        label: "View",
        variant: "solid",
        onClick: (e) => {
          e?.stopPropagation();
          toast.info("Opening file...", undefined, {
            showIcon: iconsEnabled.value,
          } as any);
        },
      },
      {
        label: "Share",
        variant: "outline",
        onClick: (e) => {
          e?.stopPropagation();
          toast.info("Opening share dialog...", undefined, {
            showIcon: iconsEnabled.value,
          } as any);
        },
      },
    ],
  });
};

// ---- Avatar ----
const showWithAvatarImage = () => {
  toast.add({
    title: "User invited",
    description: "benjamincanac was invited to the team.",
    avatar: { src: "https://avatar.iran.liara.run/public", alt: "User avatar" },
    color: "primary",
  });
};

const showWithAvatarIcon = () => {
  toast.add({
    title: "New notification",
    description: "You have 3 unread messages.",
    avatar: { icon: "i-lucide-bell" },
    color: "info",
  });
};

const showWithAvatarText = () => {
  toast.add({
    title: "Team member added",
    description: "DL was added to the workspace.",
    avatar: { text: "DL" },
    color: "secondary",
  });
};

// ---- Options ----
const showNoProgress = () => {
  toast.add({
    title: "No progress bar",
    description: "This toast doesn't show a progress indicator.",
    icon: "i-lucide-loader-circle",
    color: "neutral",
    progress: false,
    duration: 5000,
    showIcon: iconsEnabled.value,
  });
};

const showLongDuration = () => {
  toast.add({
    title: "Long duration toast",
    description: "This toast will stay for 10 seconds.",
    icon: "i-lucide-clock",
    color: "neutral",
    duration: 10000,
    showIcon: iconsEnabled.value,
  });
};

const showClickableToast = () => {
  toast.add({
    title: "Clickable toast",
    description: "Click anywhere on this toast to trigger a callback.",
    icon: "i-lucide-mouse-pointer-click",
    color: "info",
    showIcon: iconsEnabled.value,
    callback: () => {
      toast.success("Callback fired", "You clicked the toast.", {
        showIcon: iconsEnabled.value,
      } as any);
    },
  });
};

// ---- Custom UI overrides ----
const showCustomUiGlass = () => {
  toast.add({
    title: "Glass UI",
    description: "Uses per-toast Tailwind overrides via `ui`.",
    icon: "i-lucide-sparkles",
    color: "neutral",
    showIcon: iconsEnabled.value,
    ui: {
      root: "rounded-2xl bg-white/70 dark:bg-gray-900/60 backdrop-blur border border-white/40 dark:border-white/10 shadow-xl",
      title: "text-base font-semibold tracking-tight",
      description: "text-xs text-gray-600 dark:text-gray-300",
      progress: "h-0.5",
    },
  });
};

const showCustomUiCompact = () => {
  toast.add({
    title: "Compact UI",
    description: "Smaller padding + tighter typography.",
    icon: "i-lucide-align-left",
    color: "info",
    duration: 3500,
    showIcon: iconsEnabled.value,
    ui: {
      root: "p-3 rounded-xl",
      title: "text-sm font-semibold",
      description: "text-xs",
      icon: "w-4 h-4",
    },
  });
};

const showCustomUiDanger = () => {
  toast.add({
    title: "Critical alert",
    description: "High-emphasis UI override.",
    icon: "i-lucide-shield-alert",
    color: "error",
    duration: 6000,
    showIcon: iconsEnabled.value,
    actions: [
      {
        label: "Review",
        variant: "solid",
        onClick: (e) => {
          e?.stopPropagation();
          toast.info("Opening review panel...", undefined, {
            showIcon: iconsEnabled.value,
          } as any);
        },
      },
    ],
    ui: {
      root: "rounded-2xl ring-2 ring-red-500/60 border border-red-500/30",
      title: "text-base font-bold",
      description: "text-sm",
      actions: "gap-2",
    },
  });
};

// ---- Multiple ----
const showMultiple = () => {
  const messages = [
    { title: "First notification", color: "success" },
    { title: "Second notification", color: "info" },
    { title: "Third notification", color: "warning" },
    { title: "Fourth notification", color: "neutral" },
  ];

  messages.forEach((msg, index) => {
    setTimeout(() => {
      toast.add({
        ...(msg as any),
        description: `This is notification #${index + 1}`,
        icon: "i-lucide-bell",
        showIcon: iconsEnabled.value,
        duration: 2500,
      });
    }, index * 250);
  });
};
</script>

<style scoped>
/* Segmented control */
.seg {
  @apply inline-flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 dark:text-gray-200 dark:hover:bg-gray-800;
}
.seg-active {
  @apply bg-gray-900 text-white hover:bg-gray-900 dark:bg-white dark:text-gray-900 dark:hover:bg-white;
}

/* Generic UI */
.badge {
  @apply inline-flex items-center rounded-xl px-3 py-1 text-xs font-medium ring-1 ring-gray-200 bg-gray-50 text-gray-700 dark:ring-gray-800 dark:bg-gray-950 dark:text-gray-200;
}
.code {
  @apply rounded-md bg-gray-100 px-1.5 py-0.5 text-xs ring-1 ring-gray-200 text-gray-800 dark:bg-gray-900 dark:ring-gray-800 dark:text-gray-200;
}
.codeblock {
  @apply rounded-2xl bg-gray-950 p-4 text-sm text-gray-100 overflow-x-auto ring-1 ring-gray-800;
}

/* Panels */
.panel {
  @apply rounded-3xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900;
}
.panel-head {
  @apply mb-4;
}
.panel-title {
  @apply text-base font-semibold;
}
.panel-desc {
  @apply mt-0.5 text-xs text-gray-600 dark:text-gray-400;
}

/* Buttons */
.btn-ghost {
  @apply inline-flex items-center gap-2 rounded-xl px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 ring-1 ring-gray-200 bg-white dark:text-gray-200 dark:hover:bg-gray-900 dark:ring-gray-800 dark:bg-gray-900;
}
.btn-soft {
  @apply inline-flex items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold ring-1 ring-gray-200 bg-white hover:bg-gray-50 text-gray-800 shadow-sm dark:ring-gray-800 dark:bg-gray-900 dark:hover:bg-gray-800 dark:text-gray-100;
}
.btn-primary {
  @apply inline-flex items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold bg-emerald-600 hover:bg-emerald-700 text-white shadow-sm;
}
.btn-secondary {
  @apply inline-flex items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold bg-indigo-600 hover:bg-indigo-700 text-white shadow-sm;
}
.btn-success {
  @apply inline-flex items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold bg-emerald-600 hover:bg-emerald-700 text-white shadow-sm;
}
.btn-info {
  @apply inline-flex items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold bg-sky-600 hover:bg-sky-700 text-white shadow-sm;
}
.btn-warn {
  @apply inline-flex items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold bg-amber-500 hover:bg-amber-600 text-white shadow-sm;
}
.btn-danger {
  @apply inline-flex items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold bg-rose-600 hover:bg-rose-700 text-white shadow-sm;
}
</style>
