<template>
  <div
    class="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-gray-900 dark:via-purple-900 dark:to-gray-900 py-12 px-4"
  >
    <div class="max-w-6xl mx-auto">
      <!-- Header -->
      <div class="text-center mb-12">
        <h1 class="text-5xl font-bold text-gray-900 dark:text-white mb-4">
          🍞 Nuxt Toastify
        </h1>
        <p class="text-xl text-gray-600 dark:text-gray-300">
          Advanced toast notifications with Tailwind CSS & Nuxt Icon
        </p>
      </div>

      <!-- Demo Grid -->
      <div class="grid md:grid-cols-2 gap-6 mb-8">
        <!-- Basic Toasts -->
        <div class="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
          <h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Basic Toasts
          </h2>
          <div class="grid grid-cols-2 gap-3">
            <button @click="showSuccess" class="btn-success">
              <Icon name="i-lucide-circle-check" class="w-5 h-5" />
              Success
            </button>
            <button @click="showError" class="btn-error">
              <Icon name="i-lucide-circle-x" class="w-5 h-5" />
              Error
            </button>
            <button @click="showInfo" class="btn-info">
              <Icon name="i-lucide-info" class="w-5 h-5" />
              Info
            </button>
            <button @click="showWarning" class="btn-warning">
              <Icon name="i-lucide-triangle-alert" class="w-5 h-5" />
              Warning
            </button>
          </div>
        </div>

        <!-- With Description -->
        <div class="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
          <h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            With Description
          </h2>
          <div class="space-y-3">
            <button @click="showWithDescription" class="btn-primary w-full">
              <Icon name="i-lucide-message-square" class="w-5 h-5" />
              Show Detailed Toast
            </button>
            <button @click="showCalendarEvent" class="btn-secondary w-full">
              <Icon name="i-lucide-calendar-days" class="w-5 h-5" />
              Calendar Event
            </button>
          </div>
        </div>

        <!-- With Actions -->
        <div class="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
          <h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            With Actions
          </h2>
          <div class="space-y-3">
            <button @click="showWithActions" class="btn-primary w-full">
              <Icon name="i-lucide-zap" class="w-5 h-5" />
              Toast with Retry
            </button>
            <button @click="showHorizontalActions" class="btn-secondary w-full">
              <Icon name="i-lucide-layout-grid" class="w-5 h-5" />
              Horizontal Layout
            </button>
          </div>
        </div>

        <!-- With Avatar -->
        <div class="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
          <h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            With Avatar
          </h2>
          <div class="space-y-3">
            <button @click="showWithAvatar" class="btn-primary w-full">
              <Icon name="i-lucide-user-plus" class="w-5 h-5" />
              User Invited
            </button>
            <button @click="showWithIconAvatar" class="btn-secondary w-full">
              <Icon name="i-lucide-bell" class="w-5 h-5" />
              Icon Avatar
            </button>
          </div>
        </div>

        <!-- Custom Options -->
        <div class="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
          <h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Custom Options
          </h2>
          <div class="space-y-3">
            <button @click="showNoProgress" class="btn-neutral w-full">
              <Icon name="i-lucide-loader-circle" class="w-5 h-5" />
              No Progress Bar
            </button>
            <button @click="showLongDuration" class="btn-neutral w-full">
              <Icon name="i-lucide-clock" class="w-5 h-5" />
              Long Duration (10s)
            </button>
          </div>
        </div>

        <!-- Multiple Toasts -->
        <div class="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
          <h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Multiple Toasts
          </h2>
          <div class="space-y-3">
            <button @click="showMultiple" class="btn-primary w-full">
              <Icon name="i-lucide-layers" class="w-5 h-5" />
              Show Multiple
            </button>
            <button @click="toast.clear()" class="btn-error w-full">
              <Icon name="i-lucide-trash-2" class="w-5 h-5" />
              Clear All
            </button>
          </div>
        </div>
      </div>

      <!-- Usage Examples -->
      <div class="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8">
        <h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-4">
          Usage Examples
        </h2>
        <div class="space-y-6">
          <div>
            <h3
              class="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-2"
            >
              Basic Usage
            </h3>
            <pre
              class="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto text-sm"
            ><code>const toast = useToast()

// Simple toasts (auto-imported!)
toast.success('Success!')
toast.error('Error!')
toast.info('Information')
toast.warning('Warning!')</code></pre>
          </div>

          <div>
            <h3
              class="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-2"
            >
              Advanced Usage
            </h3>
            <pre
              class="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto text-sm"
            ><code>// With all options
toast.add({
  title: 'Event added to calendar',
  description: 'This event is scheduled for Dec 8, 2024.',
  icon: 'i-lucide-calendar-days',
  color: 'success',
  duration: 5000,
  actions: [{
    icon: 'i-lucide-refresh-cw',
    label: 'Retry',
    color: 'neutral',
    variant: 'outline',
    onClick: (e) => {
      e?.stopPropagation()
      console.log('Retry clicked')
    }
  }]
})</code></pre>
          </div>

          <div>
            <h3
              class="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-2"
            >
              With Avatar
            </h3>
            <pre
              class="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto text-sm"
            ><code>toast.add({
  title: 'User invited',
  description: 'benjamincanac was invited to the team.',
  avatar: {
    src: 'https://avatar.iran.liara.run/public',
    alt: 'User avatar'
  },
  color: 'primary'
})</code></pre>
          </div>
        </div>
      </div>
    </div>

    <!-- ToastContainer is now automatically added - no need to add it manually! -->
  </div>
</template>

<script setup lang="ts">
// useToast is auto-imported - no need to import!
const toast = useToast();

const showSuccess = () => {
  toast.success(
    "Operation completed successfully!",
    "Your changes have been saved."
  );
};

const showError = () => {
  toast.error(
    "Uh oh! Something went wrong.",
    "There was a problem with your request."
  );
};

const showInfo = () => {
  toast.info(
    "New update available",
    "Version 2.0 is now available for download."
  );
};

const showWarning = () => {
  toast.warning("Please be careful!", "This action cannot be undone.");
};

const showWithDescription = () => {
  toast.add({
    title: "Detailed notification",
    description:
      "This is a longer description that provides more context about what happened.",
    icon: "i-lucide-message-square",
    color: "info",
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
  });
};

const showWithActions = () => {
  toast.add({
    title: "Connection lost",
    description: "Unable to connect to the server.",
    icon: "i-lucide-wifi-off",
    color: "error",
    actions: [
      {
        icon: "i-lucide-refresh-cw",
        label: "Retry",
        color: "neutral",
        variant: "outline",
        onClick: (e) => {
          e?.stopPropagation();
          toast.success("Reconnected!", "Connection has been restored.");
        },
      },
    ],
  });
};

const showHorizontalActions = () => {
  toast.add({
    title: "File upload complete",
    description: "Your file has been successfully uploaded.",
    icon: "i-lucide-upload",
    color: "success",
    orientation: "horizontal",
    actions: [
      {
        label: "View",
        variant: "solid",
        onClick: () => {
          toast.info("Opening file...");
        },
      },
      {
        label: "Share",
        variant: "outline",
        onClick: () => {
          toast.info("Opening share dialog...");
        },
      },
    ],
  });
};

const showWithAvatar = () => {
  toast.add({
    title: "User invited",
    description: "benjamincanac was invited to the team.",
    avatar: {
      src: "https://avatar.iran.liara.run/public",
      alt: "User avatar",
    },
    color: "primary",
  });
};

const showWithIconAvatar = () => {
  toast.add({
    title: "New notification",
    description: "You have 3 unread messages.",
    avatar: {
      icon: "i-lucide-bell",
    },
    color: "info",
  });
};

const showNoProgress = () => {
  toast.add({
    title: "No progress bar",
    description: "This toast doesn't show a progress indicator.",
    icon: "i-lucide-loader-circle",
    color: "neutral",
    progress: false,
    duration: 5000,
  });
};

const showLongDuration = () => {
  toast.add({
    title: "Long duration toast",
    description: "This toast will stay for 10 seconds.",
    icon: "i-lucide-clock",
    color: "neutral",
    duration: 10000,
  });
};

const showMultiple = () => {
  const messages = [
    { title: "First notification", color: "success" },
    { title: "Second notification", color: "info" },
    { title: "Third notification", color: "warning" },
  ];

  messages.forEach((msg, index) => {
    setTimeout(() => {
      toast.add({
        ...msg,
        description: `This is notification #${index + 1}`,
        icon: "i-lucide-bell",
      } as any);
    }, index * 300);
  });
};
</script>

<style scoped>
.btn-primary {
  @apply inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors shadow-sm;
}

.btn-secondary {
  @apply inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-purple-600 hover:bg-purple-700 text-white font-medium rounded-lg transition-colors shadow-sm;
}

.btn-success {
  @apply inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-green-600 hover:bg-green-700 text-white font-medium rounded-lg transition-colors shadow-sm;
}

.btn-error {
  @apply inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-red-600 hover:bg-red-700 text-white font-medium rounded-lg transition-colors shadow-sm;
}

.btn-info {
  @apply inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-blue-400 hover:bg-blue-500 text-white font-medium rounded-lg transition-colors shadow-sm;
}

.btn-warning {
  @apply inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-yellow-500 hover:bg-yellow-600 text-white font-medium rounded-lg transition-colors shadow-sm;
}

.btn-neutral {
  @apply inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-gray-600 hover:bg-gray-700 text-white font-medium rounded-lg transition-colors shadow-sm;
}
</style>
