# Nuxt Notify <img width="40" height="40" alt="logo" src="https://github.com/user-attachments/assets/72215460-5294-43c6-b686-42aa5f9c8548" /> 🚀

Advanced toast notifications for **Nuxt 3 / Nuxt 4** using **Tailwind CSS** and **Nuxt Icon** — clean UI, actions, avatars, progress, themes, and per-toast Tailwind overrides.

> Maintained by **Nizam Omer** · [Levi Labs](https://www.levilabs.dev/)  
> Official site: https://nuxt-notify.nizaamomer.com/  
> Website: https://www.nizaamomer.com  
> Studio: https://www.levilabs.dev/  
> GitHub: https://github.com/nizaamomer/nuxt-notify

---

<img width="1876" height="1146" alt="banner" src="https://github.com/user-attachments/assets/22ca8267-1a63-43f6-8788-804c034a81ce" />

<br>

![npm](https://img.shields.io/npm/v/nuxt-notify)
![downloads](https://img.shields.io/npm/dm/nuxt-notify)
![license](https://img.shields.io/npm/l/nuxt-notify)
![CI](https://github.com/nizaamomer/nuxt-notify/actions/workflows/ci.yml/badge.svg)
![bundle size](https://img.shields.io/bundlephobia/minzip/nuxt-notify)

![Nuxt](https://img.shields.io/badge/Nuxt-3%20%7C%204-00DC82)
![Vue](https://img.shields.io/badge/Vue-3-4FC08D)
![Tailwind](https://img.shields.io/badge/Tailwind-CSS-38BDF8)
![TypeScript](https://img.shields.io/badge/TypeScript-Ready-3178C6)

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
- 🌓 Theme switching (`dark | light | system`) scoped to toasts only
- 🎨 Per-toast Tailwind UI overrides
- 📦 Per-toast **`maxToasts` stack override**
- 📌 Persistent toasts (`duration: 0`)

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

### Option A: Tailwind v3 (`@nuxtjs/tailwindcss`)

```bash
npx nuxi@latest module add tailwindcss
```

```ts
export default defineNuxtConfig({
  modules: ['@nuxtjs/tailwindcss', 'nuxt-notify'],
})
```

```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

Content paths for module components are registered automatically.

---

### Option B: Tailwind v4 (Vite Plugin)

```bash
npm install tailwindcss @tailwindcss/vite
```

```ts
import tailwindcss from '@tailwindcss/vite'

export default defineNuxtConfig({
  modules: ['nuxt-notify'],
  vite: {
    plugins: [tailwindcss()],
  },
  css: ['~/assets/css/main.css'],
})
```

```css
@import 'tailwindcss';
@import 'nuxt-notify/styles';
```

> ⚠️ `@import "nuxt-notify/styles"` is required for Tailwind v4 component scanning.

---

## Install Nuxt Icon

```bash
npx nuxi@latest module add icon
```

---

## Quick Start

```ts
export default defineNuxtConfig({
  modules: ['nuxt-notify'],
  notify: {
    position: 'top-right',
    duration: 5000,
    maxToasts: 5,
    theme: 'system', // 'light' | 'dark' | 'system'
    showIcon: true,
  },
})
```

The toast container is mounted automatically.

---

## Usage

```vue
<script setup>
const toast = useToast()

toast.success('Saved', 'Your changes were saved.')
toast.error('Error', 'Something went wrong.')
toast.info('Heads up', 'New version is available.')
toast.warning('Careful', 'This action cannot be undone.')
</script>
```

---

## Per-Toast maxToasts

```ts
toast.add({
  title: 'Replace stack',
  maxToasts: 1,
})
```

Overrides the global stack size **for that toast only**.

---

## Persistent Toasts

Set `duration: 0` to keep a toast open until the user closes it manually:

```ts
toast.add({
  title: 'Action required',
  description: 'This toast stays until dismissed.',
  duration: 0,
  progress: false,
})
```

---

## Custom UI Overrides

```ts
toast.add({
  title: 'Custom UI',
  ui: {
    root: 'rounded-2xl border border-dashed',
    title: 'text-base font-semibold',
    description: 'text-xs opacity-80',
  },
})
```

---

## Troubleshooting

### Theme only affects toasts (not your whole app)

`notify.theme` applies the `dark` class to the toast container only. Your app's own color mode (e.g. `@nuxtjs/color-mode`) is not overridden.

### Tailwind v4 dark mode on toasts

If toast `dark:` classes are not applying, add this to your main CSS file:

```css
@custom-variant dark (&:where(.dark, .dark *));
```

Example (`assets/css/main.css`):

```css
@custom-variant dark (&:where(.dark, .dark *));

@import 'tailwindcss';
@import 'nuxt-notify/styles';
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

**Nizam Omer** — Founder, [Levi Labs](https://www.levilabs.dev/)  
Personal site: https://www.nizaamomer.com  
Studio: https://www.levilabs.dev/  
GitHub: https://github.com/nizaamomer

---

Made with 💚 by [Nizam Omer](https://www.nizaamomer.com) · [Levi Labs](https://www.levilabs.dev/)
