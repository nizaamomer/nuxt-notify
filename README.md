# Nuxt Notify 🚀

Advanced toast notifications for **Nuxt 3 / Nuxt 4** with **Tailwind CSS** and **Nuxt Icon** — clean UI, actions, avatars, progress, themes, and per-toast Tailwind overrides.

> Maintained by **Nizam Omer** (`nizaamomer`)  
> Website: https://www.nizaamomer.com  
> Repository: `nizaamomer/nuxt-notify`

---

## Features

- Nuxt 3 / Nuxt 4 compatible
- Auto-mounts the toast container (no manual component setup)
- Tailwind CSS styling (runtime files included in Tailwind content scanning)
- Nuxt Icon support
- Positions: `top-right`, `top-left`, `bottom-right`, `bottom-left`, `top-center`, `bottom-center`
- Options: `duration`, `maxToasts`, `theme` (`dark | light | system`)
- Icon control: global `showIcon` + per-toast override `showIcon`
- Actions (vertical / horizontal)
- Avatars (image / icon / text)
- Progress bar + pause on hover
- Per-toast UI overrides via Tailwind classes (`ui: { root, title, ... }`)

---

## Installation

### Recommended (Nuxt CLI)

```bash
npx nuxt module add nuxt-notify
```

### Manual

```bash
npm i nuxt-notify
# pnpm add nuxt-notify
# yarn add nuxt-notify
```

---

## Setup

Add the module to `nuxt.config.ts`:

```ts
export default defineNuxtConfig({
  modules: ["nuxt-notify"],

  toastify: {
    position: "bottom-left",
    duration: 2000,
    maxToasts: 3,

    // Theme: "dark" | "light" | "system"
    // Default: "dark"
    theme: "dark",

    // Global icons toggle (default: true)
    showIcon: true,
  },
});
```

That’s it. The toast container is mounted automatically.

---

## Usage

`useToast()` is auto-imported.

```ts
const toast = useToast();

toast.success("Saved", "Your changes were saved.");
toast.error("Error", "Something went wrong.");
toast.info("Heads up", "New version is available.");
toast.warning("Careful", "This action cannot be undone.");
```

---

## API

### `toast.add(options)`

```ts
toast.add({
  title: "Event added",
  description: "Scheduled for Dec 8, 2025",
  color: "success",
  icon: "i-lucide-calendar-days",
  duration: 5000,
});
```

### `toast.remove(id)`

```ts
const id = toast.add({ title: "Hello" });
toast.remove(id);
```

### `toast.clear()`

```ts
toast.clear();
```

---

## Configuration

### Module options (`nuxt.config.ts`)

| Option      | Type                                                                                              | Default       | Description                                          |
| ----------- | ------------------------------------------------------------------------------------------------- | ------------- | ---------------------------------------------------- |
| `position`  | `"top-right" \| "top-left" \| "bottom-right" \| "bottom-left" \| "top-center" \| "bottom-center"` | `"top-right"` | Toast container position                             |
| `duration`  | `number`                                                                                          | `5000`        | Default toast duration (ms)                          |
| `maxToasts` | `number`                                                                                          | `5`           | Maximum visible toasts; old toasts are removed first |
| `theme`     | `"dark" \| "light" \| "system"`                                                                   | `"dark"`      | Theme mode                                           |
| `showIcon`  | `boolean`                                                                                         | `true`        | Global icon enable/disable                           |

### Per-toast options (commonly used)

```ts
toast.add({
  title: "Custom toast",
  description: "Per-toast configuration",
  color: "info",
  icon: "i-lucide-bell",
  duration: 3000,
  progress: true,
  close: true,
  orientation: "vertical",
});
```

---

## Theme

Set theme globally:

```ts
export default defineNuxtConfig({
  modules: ["nuxt-notify"],
  toastify: {
    theme: "light", // "dark" | "light" | "system"
  },
});
```

Notes:

- `system` uses the OS theme.
- Your project must use Tailwind `darkMode: "class"` for theme switching via `html.dark`.

---

## Icons (global + per-toast)

### Disable icons globally

```ts
export default defineNuxtConfig({
  modules: ["nuxt-notify"],
  toastify: {
    showIcon: false,
  },
});
```

### Override per toast

```ts
// Force icon OFF (even if global is true)
toast.add({
  title: "No icon",
  description: "This toast hides the icon",
  icon: "i-lucide-bell",
  showIcon: false,
});

// Force icon ON (even if global is false)
toast.add({
  title: "Force icon",
  description: "This toast shows an icon anyway",
  icon: "i-lucide-bell",
  showIcon: true,
});
```

---

## Actions

### Vertical actions

```ts
toast.add({
  title: "Connection lost",
  description: "Unable to connect to the server.",
  color: "error",
  icon: "i-lucide-wifi-off",
  orientation: "vertical",
  actions: [
    {
      icon: "i-lucide-refresh-cw",
      label: "Retry",
      variant: "outline",
      onClick: (e) => {
        e?.stopPropagation();
        toast.success("Reconnected", "Connection restored");
      },
    },
    {
      icon: "i-lucide-x",
      label: "Dismiss",
      variant: "ghost",
      onClick: (e) => {
        e?.stopPropagation();
      },
    },
  ],
});
```

### Horizontal actions

```ts
toast.add({
  title: "Upload complete",
  description: "Your file has been uploaded.",
  color: "success",
  icon: "i-lucide-upload",
  orientation: "horizontal",
  actions: [
    {
      label: "View",
      variant: "solid",
      onClick: () => toast.info("Opening..."),
    },
    {
      label: "Share",
      variant: "outline",
      onClick: () => toast.info("Sharing..."),
    },
  ],
});
```

---

## Avatars

### Image avatar

```ts
toast.add({
  title: "User invited",
  description: "A new user was invited to your team.",
  avatar: {
    src: "https://avatar.iran.liara.run/public",
    alt: "User avatar",
  },
  color: "primary",
});
```

### Icon avatar

```ts
toast.add({
  title: "Notification",
  description: "You have unread messages.",
  avatar: { icon: "i-lucide-bell" },
  color: "info",
});
```

### Text avatar

```ts
toast.add({
  title: "New member",
  description: "DL joined the workspace.",
  avatar: { text: "DL" },
  color: "secondary",
});
```

---

## Progress bar

Disable progress for a single toast:

```ts
toast.add({
  title: "No progress bar",
  description: "This toast hides progress.",
  icon: "i-lucide-loader-circle",
  color: "neutral",
  progress: false,
  duration: 5000,
});
```

---

## Click callback (click anywhere on toast)

```ts
toast.add({
  title: "Clickable toast",
  description: "Click anywhere on this toast.",
  icon: "i-lucide-mouse-pointer-click",
  color: "info",
  callback: () => {
    toast.success("Callback fired", "You clicked the toast.");
  },
});
```

---

## Custom UI (Tailwind overrides)

Override internal Tailwind classes per toast:

```ts
toast.add({
  title: "Custom UI",
  description: "These classes override the default toast UI.",
  color: "neutral",
  icon: "i-lucide-sparkles",
  ui: {
    root: "rounded-2xl border border-dashed border-gray-400/40 bg-white/80 dark:bg-gray-900/60 backdrop-blur",
    title: "text-base font-semibold tracking-tight",
    description: "text-xs opacity-80",
    progress: "h-0.5",
  },
});
```

Supported `ui` keys:

- `root`, `wrapper`, `title`, `description`, `icon`, `avatar`, `actions`, `progress`, `close`

---

## TypeScript

Types are included. If autocomplete does not appear after install:

- restart your IDE TypeScript server
- reinstall dependencies
- ensure you are using the latest published version

---

## Troubleshooting

### Theme not changing (light/dark)

Ensure Tailwind is class-based dark mode:

```js
// tailwind.config.js
export default {
  darkMode: "class",
};
```

### Classes missing in production

Build + preview to verify Tailwind doesn’t purge runtime styles:

```bash
npm run build
npm run preview
```

---

## License

MIT

---

## Author

**Nizam Omer** (`nizaamomer`)  
Website: https://www.nizaamomer.com
