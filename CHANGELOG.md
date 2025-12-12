# Changelog

All notable changes to **nuxt-notify** will be documented in this file.

This project follows **Semantic Versioning (SemVer)**:  
`MAJOR.MINOR.PATCH`

---

## [1.1.3] – 2025-12-13

### Fixed

- Fixed toast progress timer cleanup to prevent memory leaks on rapid mount/unmount.
- Ensured per-toast `showIcon` correctly overrides global `notify.showIcon` in all cases.
- Improved toast click handling to avoid conflicts with action buttons.
- Minor UI polish for avatar + icon alignment in horizontal layout.
- Improved type safety for `ToastAction` and `ToastUI`.

### Changed

- Internal refactors for better Nuxt 4 runtime compatibility.
- Small performance optimizations in toast rendering and stacking logic.

---

## [1.1.2] – 2025-12-12

### Fixed

- Removed duplicate auto-import warning for `useToast` by switching to explicit `addImports` registration.
- Corrected close button visibility in light mode.
- Unified theme handling to rely on `html.dark` as the single source of truth.

---

## [1.1.1] – 2025-12-12

### Added

- Full **Tailwind CSS v4** compatibility via `@tailwindcss/vite`.
- Automatic Tailwind setup detection for Tailwind v3 and v4.
- Required Tailwind v4 CSS import support:
  ```css
  @import "tailwindcss";
  @import "nuxt-notify/styles";
  ```
- Improved documentation, setup instructions, troubleshooting, and examples.
- Enhanced theme handling (`dark | light | system`) with OS preference detection.
- More stable toast container auto-mounting.

### Changed

- Refactored module build logic for Nuxt 3 + Nuxt 4 compatibility.
- Improved dependency detection logs (Tailwind, Nuxt Icon, Vite plugin).
- Updated UI defaults, animations, and Tailwind utility usage.

### Fixed

- Local dev error: **"Can't resolve 'tailwindcss'"** when using `file:..`.
- Component scanning issues under Tailwind v4.
- Rare container mount issues on first render.
- Dark mode toggling inconsistencies when using system theme.

---

## [1.1.0]

### Added

- Stable release of **nuxt-notify**.
- Toast actions (horizontal & vertical).
- Avatar support (image, icon, text).
- Progress bar with pause/resume behavior.
- Theme switching (`dark | light | system`).
- Per-toast Tailwind UI class overrides.
- Auto-mounted global ToastContainer.
- `useToast()` composable.
- Nuxt Icon integration.

### Fixed

- Minor UI alignment issues.
- Transition smoothing updates.

---

## [1.0.0]

Initial release.
