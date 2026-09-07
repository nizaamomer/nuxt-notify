// @ts-check
import { createConfigForNuxt } from '@nuxt/eslint-config/flat'

// Run `npx @eslint/config-inspector` to inspect the resolved config interactively
export default createConfigForNuxt({
  features: {
    // Rules for module authors
    tooling: true,
    // Rules for formatting
    stylistic: true,
  },
  dirs: {
    src: [
      './src',
    ],
  },
})
  .append(
    {
      ignores: [
        'playground/**',
        'test/**',
        'dist/**',
        'build.config.ts',
      ],
    },
    {
      files: ['src/runtime/components/**/*.vue'],
      rules: {
        'vue/multi-word-component-names': 'off',
      },
    },
  )
