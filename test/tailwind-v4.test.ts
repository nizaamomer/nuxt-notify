import { resolve } from 'node:path'
import { describe, it, expect } from 'vitest'
import { setup, $fetch } from '@nuxt/test-utils/e2e'

const fixture = (name: string) => resolve('test/fixtures', name)

describe('tailwind v4 fixture', async () => {
  await setup({
    rootDir: fixture('tailwind-v4'),
  })

  it('builds and renders with @tailwindcss/vite', async () => {
    const html = await $fetch('/')
    expect(html).toContain('tailwind-v4')
  })
})
