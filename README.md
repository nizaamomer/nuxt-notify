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

- ✨ Nuxt 3 / Nuxt 4 compatible
- 🚀 Auto-mounts the toast container (no manual component setup)
- 🎨 **Works with both Tailwind v4 and Tailwind v3** (auto-detects setup)
- 💅 Tailwind CSS styling with automatic component scanning
- 🎭 Nuxt Icon support
- 📍 Multiple positions: `top-right`, `top-left`, `bottom-right`, `bottom-left`, `top-center`, `bottom-center`
- ⚙️ Configurable: `duration`, `maxToasts`, `theme` (`dark | light | system`)
- 🎯 Icon control: global `showIcon` + per-toast override
- 🔘 Actions (vertical / horizontal layouts)
- 👤 Avatars (image / icon / text)
- ⏱️ Progress bar + pause on hover
- 🎨 Per-toast UI overrides via Tailwind classes

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

Choose **ONE** of the following options based on your preference:

#### Option A: Tailwind v3 via Nuxt Module (Recommended - Zero Config ✨)

```bash
npx nuxi@latest module add tailwindcss
```

**`nuxt.config.ts`:**

```ts
export default defineNuxtConfig({
  modules: ["@nuxtjs/tailwindcss", "nuxt-notify"],
});
```

**`assets/css/main.css`:**

```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

✅ **That's it! The module automatically scans its components. No additional setup needed!**

---

#### Option B: Tailwind v4 via Vite Plugin (Advanced)

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
@import "nuxt-notify/styles"; /* Required for Tailwind v4 */
```

> ⚠️ **Important:** When using Tailwind v4, the `@import "nuxt-notify/styles";` line is **required** for proper component scanning.

**`tailwind.config.js`:** (Optional - only if you need custom configuration)

```js
module.exports = {
  darkMode: "class",
};
```

---

### 3) Install Nuxt Icon (required for icons)

```bash
npx nuxi@latest module add icon
```

---

## Quick Start

Add the module to `nuxt.config.ts`:

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

That's it! The toast container is mounted automatically.

---

## Usage

`useToast()` is auto-imported:

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

## API Reference

### `toast.add(options)`

Create a custom toast:

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

Remove a specific toast:

```ts
const id = toast.add({ title: "Hello" });
toast.remove(id);
```

### `toast.clear()`

Clear all toasts:

```ts
toast.clear();
```

---

## Configuration

### Module Options

Configure globally in `nuxt.config.ts`:

| Option      | Type                                                                                              | Default       | Description                                          |
| ----------- | ------------------------------------------------------------------------------------------------- | ------------- | ---------------------------------------------------- |
| `position`  | `"top-right" \| "top-left" \| "bottom-right" \| "bottom-left" \| "top-center" \| "bottom-center"` | `"top-right"` | Toast container position                             |
| `duration`  | `number`                                                                                          | `5000`        | Default toast duration (ms)                          |
| `maxToasts` | `number`                                                                                          | `5`           | Maximum visible toasts; old toasts are removed first |
| `theme`     | `"dark" \| "light" \| "system"`                                                                   | `"dark"`      | Theme mode                                           |
| `showIcon`  | `boolean`                                                                                         | `true`        | Global icon enable/disable                           |

### Per-Toast Options

```ts
toast.add({
  title: "Custom toast",
  description: "Per-toast configuration",
  color: "info", // "primary" | "secondary" | "success" | "info" | "warning" | "error" | "neutral"
  icon: "i-lucide-bell",
  duration: 3000,
  progress: true,
  close: true,
  orientation: "vertical", // "vertical" | "horizontal"
});
```

---

## Theme Configuration

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

- `system` automatically uses the OS theme preference
- Your project must use Tailwind `darkMode: "class"` for theme switching

---

## Icon Control

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
  showIcon: false,
});

// Force icon ON (even if global is false)
toast.add({
  title: "With icon",
  description: "This toast shows an icon",
  icon: "i-lucide-bell",
  showIcon: true,
});
```

---

## Actions

### Vertical Actions

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

### Horizontal Actions

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

**Action variants:** `solid`, `outline`, `soft`, `ghost`, `link`

---

## Avatars

### Image Avatar

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

### Icon Avatar

```ts
toast.add({
  title: "Notification",
  description: "You have unread messages.",
  avatar: { icon: "i-lucide-bell" },
  color: "info",
});
```

### Text Avatar

```ts
toast.add({
  title: "New member",
  description: "DL joined the workspace.",
  avatar: { text: "DL" },
  color: "secondary",
});
```

---

## Progress Bar

Disable progress for a specific toast:

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

## Click Callback

Execute a function when clicking anywhere on the toast:

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

## Custom Styling

Override Tailwind classes per toast:

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

**Available `ui` keys:**

- `root` - Toast container
- `wrapper` - Content wrapper
- `title` - Title text
- `description` - Description text
- `icon` - Icon element
- `avatar` - Avatar element
- `actions` - Actions container
- `progress` - Progress bar
- `close` - Close button

---

## TypeScript Support

Full TypeScript support with autocomplete. Types are included automatically.

If autocomplete doesn't work:

- Restart your IDE's TypeScript server
- Run `npm install` to ensure types are properly installed
- Check that you're using the latest version

---

## Troubleshooting

### Toasts are unstyled

**Cause:** Tailwind CSS is not properly configured.

**Solutions:**

1. **For Tailwind v3 (@nuxtjs/tailwindcss):**

   - Check that `@nuxtjs/tailwindcss` is in your `modules` array
   - Verify your CSS file has the Tailwind directives:
     ```css
     @tailwind base;
     @tailwind components;
     @tailwind utilities;
     ```

2. **For Tailwind v4 (@tailwindcss/vite):**
   - Verify `@import "nuxt-notify/styles";` is in your CSS file
   - Check that `@tailwindcss/vite` is in your `vite.plugins`
   - Ensure `@import "tailwindcss";` comes first

### Icons are missing

**Cause:** `@nuxt/icon` is not installed.

**Solution:**

```bash
npx nuxi@latest module add icon
```

### Module detection

The module logs which Tailwind setup it detects:

**For Tailwind v3:**

```
ℹ [nuxt-notify] Using Tailwind CSS via @nuxtjs/tailwindcss (auto-configured ✅)
```

**For Tailwind v4:**

```
ℹ [nuxt-notify] Using Tailwind CSS via Vite plugin
📝 Add this to your CSS file:
  @import "tailwindcss";
  @import "nuxt-notify/styles";
```

If you see unexpected messages, verify your Tailwind installation matches one of the setup options above.

---

## Comparison: Tailwind v4 vs v3

| Feature          | Tailwind v3 (Nuxt Module)             | Tailwind v4 (Vite)                                       |
| ---------------- | ------------------------------------- | -------------------------------------------------------- |
| Setup Complexity | ✅ Easy (zero config)                 | ⚠️ Medium (requires CSS import)                          |
| CSS Import       | `@tailwind base/components/utilities` | `@import "tailwindcss"` + `@import "nuxt-notify/styles"` |
| Configuration    | Automatic                             | Manual CSS import required                               |
| Recommended For  | **Most users** (simpler setup)        | Advanced users, new Tailwind features                    |

**Recommendation:** Use **Tailwind v3 with @nuxtjs/tailwindcss** for the simplest setup with zero manual configuration.

---

## Examples

Check out the [official documentation](https://nuxt-notify.nizaamomer.com/) for:

- Live interactive demos
- Complete code examples
- Advanced usage patterns
- Playground for testing

---

## License

MIT License - see [LICENSE](LICENSE) file for details

---

## Author

**Nizam Omer** (`nizaamomer`)

- Website: https://www.nizaamomer.com
- GitHub: [@nizaamomer](https://github.com/nizaamomer)

---

## Support

- 📖 [Documentation](https://nuxt-notify.nizaamomer.com/)
- 🐛 [Issue Tracker](https://github.com/nizaamomer/nuxt-notify/issues)
- 💬 [Discussions](https://github.com/nizaamomer/nuxt-notify/discussions)

---

## Changelog

See [CHANGELOG.md](CHANGELOG.md) for version history and updates.

---

Made with ❤️ by [Nizam Omer](https://www.nizaamomer.com)
