# Nuxt Notify 🚀

Advanced toast notifications for **Nuxt 3 / Nuxt 4** using **Tailwind CSS** and **Nuxt Icon** — clean UI, actions, avatars, progress, themes, and per-toast Tailwind overrides.

> Maintained by **Nizam Omer** (`nizaamomer`)  
> Official site: https://nuxt-notify.nizaamomer.com/  
> Website: https://www.nizaamomer.com  
> GitHub: https://github.com/nizaamomer/nuxt-notify

---

## Requirements

- **Tailwind CSS is required**  
  `nuxt-notify` relies entirely on Tailwind utility classes. Without Tailwind, toasts will render but appear unstyled.

- **@nuxt/icon is required for icons**  
  Icons are enabled by default. If `notify.showIcon` is `true`, `@nuxt/icon` must be installed.

---

## Features

- ✨ Nuxt 3 & Nuxt 4 compatible
- 🚀 Auto-mounts the toast container (no manual component setup)
- 🎨 Works with **Tailwind v3** and **Tailwind v4**
- 💅 Automatic Tailwind component scanning
- 🎭 Nuxt Icon integration
- 📍 Multiple positions (`top-right`, `top-left`, `bottom-right`, `bottom-left`, `top-center`, `bottom-center`)
- ⚙️ Global configuration via `nuxt.config.ts`
- 🎯 Global + per-toast icon control
- 🔘 Actions (vertical & horizontal layouts)
- 👤 Avatars (image / icon / text)
- ⏱️ Progress bar with pause on hover
- 🎨 Per-toast Tailwind UI overrides
- 📦 Per-toast **`maxToasts` stack override**

---

## Installation

### 1) Install the module

```bash
npx nuxt module add nuxt-notify
```

Or manually:

```bash
npm install nuxt-notify
# pnpm add nuxt-notify
# yarn add nuxt-notify
```

---

## Tailwind CSS Setup

Choose **ONE** option.

### Option A: Tailwind v3 (Recommended)

```bash
npx nuxi@latest module add tailwindcss
```

```ts
export default defineNuxtConfig({
  modules: ["@nuxtjs/tailwindcss", "nuxt-notify"],
});
```

```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

---

### Option B: Tailwind v4 (Vite Plugin)

```bash
npm install tailwindcss @tailwindcss/vite
```

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

```css
@import "tailwindcss";
@import "nuxt-notify/styles";
```

> ⚠️ Required for Tailwind v4 component scanning.

---

## Install Nuxt Icon

```bash
npx nuxi@latest module add icon
```

---

## Quick Start

```ts
export default defineNuxtConfig({
  modules: ["nuxt-notify"],
  notify: {
    position: "top-right",
    duration: 5000,
    maxToasts: 5,
    theme: "dark",
    showIcon: true,
  },
});
```

The toast container is mounted automatically.

---

## Usage

```vue
<script setup>
const toast = useToast();

toast.success("Saved", "Your changes were saved.");
toast.error("Error", "Something went wrong.");
toast.info("Heads up", "New version is available.");
toast.warning("Careful", "This action cannot be undone.");
</script>
```

---

## Per-Toast maxToasts

```ts
toast.add({
  title: "Replace stack",
  maxToasts: 1,
});
```

Overrides the global stack size **for that toast only**.

---

## Custom UI Overrides

```ts
toast.add({
  title: "Custom UI",
  ui: {
    root: "rounded-2xl border border-dashed",
    title: "text-base font-semibold",
    description: "text-xs opacity-80",
  },
});
```

---

## Troubleshooting

### Tailwind v4 dark mode not working

If you are using **Tailwind v4** and `dark:` classes are not applying even though `html.dark` is present (for example when `notify.theme: "system"`), add this line to your main CSS file:

```css
@custom-variant dark (&:where(.dark, .dark *));
```

Example (`assets/css/main.css`):

```css
@import "tailwindcss";
@import "nuxt-notify/styles";

/* Ensure Tailwind v4 dark: utilities follow html.dark */
@custom-variant dark (&:where(.dark, .dark *));
```

---

## Documentation & Changelog

- 📖 Documentation & Playground: https://nuxt-notify.nizaamomer.com/
- 🧾 Changelog: [CHANGELOG.md](./CHANGELOG.md)

---

## License

MIT

---

## Author

**Nizam Omer**  
Website: https://www.nizaamomer.com  
GitHub: https://github.com/nizaamomer

---

Made with 💚 by Nizam Omer
