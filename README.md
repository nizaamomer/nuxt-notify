# Nuxt Notify 🚀

Advanced toast notifications for **Nuxt 3 / Nuxt 4** with **Tailwind CSS** and **Nuxt Icon** — clean UI, actions, avatars, progress, themes, and per-toast Tailwind overrides.

> Maintained by **Nizam Omer** (`nizaamomer`)  
> Official site: https://nuxt-notify.nizaamomer.com/ (Docs + Playground)  
> Website: https://www.nizaamomer.com  
> Repository: `nizaamomer/nuxt-notify`

---

## Requirements

- **Tailwind CSS is required for styling.**  
  `nuxt-notify` uses Tailwind utility classes for its UI. Without Tailwind, toasts will render but appear unstyled.

- **@nuxt/icon is required for icons.**  
  If you use icons (default behavior), install `@nuxt/icon`. Without it, icons will not render.

---

## Features

- Nuxt 3 / Nuxt 4 compatible
- Auto-mounts the toast container (no manual component setup)
- **Works with both Tailwind v4 and @nuxtjs/tailwindcss** (auto-detects setup)
- Tailwind CSS styling (runtime files automatically scanned)
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

### 1) Install the module

```bash
npx nuxt module add nuxt-notify
```

Or manually:

```bash
npm i nuxt-notify
# pnpm add nuxt-notify
# yarn add nuxt-notify
```

---

### 2) Tailwind CSS Setup

This module **automatically detects** and works with both Tailwind CSS setups:

#### Option A: Tailwind via Vite Plugin (v4+)

```bash
npm install tailwindcss @tailwindcss/vite
```

**`nuxt.config.ts`:**

```ts
import tailwindcss from "@tailwindcss/vite";

export default defineNuxtConfig({
  modules: ["nuxt-notify"],

  vite: {
    plugins: [tailwindcss()],
  },

  css: ["~/assets/css/main.css"],
});
```

**`assets/css/main.css`:**

```css
@import "tailwindcss";
```

✅ **No `tailwind.config` needed!** The module handles component scanning automatically.

---

#### Option B: Tailwind via Nuxt Module

```bash
npm install -D @nuxtjs/tailwindcss
```

**`nuxt.config.ts`:**

```ts
export default defineNuxtConfig({
  modules: ["@nuxtjs/tailwindcss", "nuxt-notify"],

  css: ["~/assets/css/main.css"],
});
```

**`tailwind.config.js`:**

```js
module.exports = {
  content: [
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./app.vue",
  ],
  darkMode: "class",
};
```

✅ **The module automatically adds its components to Tailwind's content scanning.**

---

### 3) Install Nuxt Icon (required for icons)

```bash
npx nuxi@latest module add icon
```

---

## Setup

Add the module to `nuxt.config.ts`:

```ts
export default defineNuxtConfig({
  modules: ["nuxt-notify"],

  notify: {
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

That's it! The toast container is mounted automatically.

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
  notify: {
    theme: "light", // "dark" | "light" | "system"
  },
});
```

**Notes:**

- `system` uses the OS theme preference
- Your project must use Tailwind `darkMode: "class"` for theme switching via `html.dark`

---

## Icons (global + per-toast)

### Disable icons globally

```ts
export default defineNuxtConfig({
  modules: ["nuxt-notify"],
  notify: {
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

**Supported `ui` keys:**

- `root`, `wrapper`, `title`, `description`, `icon`, `avatar`, `actions`, `progress`, `close`

---

## TypeScript

Types are included. If autocomplete does not appear after install:

- Restart your IDE TypeScript server
- Reinstall dependencies
- Ensure you are using the latest published version

---

## Troubleshooting

### Toasts are unstyled

**Cause:** Tailwind CSS is not properly configured.

**Solution:**

- Ensure Tailwind is installed (either `@tailwindcss/vite` or `@nuxtjs/tailwindcss`)
- Check that Tailwind is in your `modules` array (for @nuxtjs/tailwindcss)
- Verify your CSS file imports Tailwind: `@import "tailwindcss"`

### Icons are missing

**Cause:** `@nuxt/icon` is not installed.

**Solution:**

```bash
npx nuxi@latest module add icon
```

### Module detection issues

The module will log which Tailwind setup it detects:

```
ℹ [nuxt-notify] Using Tailwind CSS via @nuxtjs/tailwindcss
```

or

```
ℹ [nuxt-notify] Using Tailwind CSS via Vite plugin
```

If you see a different message, check your Tailwind installation.

---

## License

MIT

---

## Author

**Nizam Omer** (`nizaamomer`)  
Website: https://www.nizaamomer.com

---

## Contributing

Contributions are welcome! Please open an issue or submit a pull request on [GitHub](https://github.com/nizaamomer/nuxt-notify).
