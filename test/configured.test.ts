import { resolve } from 'node:path'
import { describe, it, expect } from 'vitest'
import { setup, $fetch } from '@nuxt/test-utils/e2e'

const fixture = (name: string) => resolve('test/fixtures', name)

describe('configured runtime config', async () => {
  await setup({
    rootDir: fixture('configured'),
  })

  it('exposes notify options in runtime config', async () => {
    const html = await $fetch('/')
    expect(html).toContain('bottom-left-3000-2-dark-false')
  })
})
