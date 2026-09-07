import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { describe, it, expect } from 'vitest'
import module from '../src/module'

/** Mirrors module tailwind detection — guards Nuxt 3/4 module array formats */
function isNuxtTailwindModule(mod: unknown): boolean {
  const name = Array.isArray(mod) ? mod[0] : mod
  return (
    typeof name === 'string'
    && (name === '@nuxtjs/tailwindcss' || name.includes('nuxtjs/tailwindcss'))
  )
}

describe('tailwind v3 module detection', () => {
  it('detects string module entry', () => {
    expect(isNuxtTailwindModule('@nuxtjs/tailwindcss')).toBe(true)
  })

  it('detects tuple module entry (Nuxt 3/4 config style)', () => {
    expect(isNuxtTailwindModule(['@nuxtjs/tailwindcss', { exposeConfig: true }])).toBe(true)
  })

  it('ignores unrelated modules', () => {
    expect(isNuxtTailwindModule('nuxt-notify')).toBe(false)
    expect(isNuxtTailwindModule(['@nuxt/icon', {}])).toBe(false)
  })
})

describe('nuxt compatibility', () => {
  it('declares nuxt 3 and 4 peer support', () => {
    const pkg = JSON.parse(
      readFileSync(resolve('package.json'), 'utf8'),
    ) as { peerDependencies?: { nuxt?: string } }

    expect(pkg.peerDependencies?.nuxt).toBe('^3.0.0 || ^4.0.0')
  })

  it('exports a nuxt module definition', () => {
    expect(typeof module).toBe('function')
  })
})
