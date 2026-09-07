import { describe, it, expect } from 'vitest'
import { useToast } from '../src/runtime/composables/useToast'

describe('useToast composable', () => {
  it('adds, trims, and removes toasts', () => {
    const { add, remove, clear, toasts } = useToast()

    clear()

    const id1 = add({ title: 'First', maxToasts: 2 })
    const id2 = add({ title: 'Second', maxToasts: 2 })
    add({ title: 'Third', maxToasts: 2 })

    expect(toasts.value).toHaveLength(2)
    expect(toasts.value.some(t => t.id === id1)).toBe(false)
    expect(toasts.value.some(t => t.id === id2)).toBe(true)
    expect(toasts.value.at(-1)?.title).toBe('Third')

    remove(id2)
    expect(toasts.value).toHaveLength(1)

    clear()
    expect(toasts.value).toHaveLength(0)
  })

  it('provides convenience helpers with colors', () => {
    const { success, error, info, warning, clear, toasts } = useToast()

    clear()

    success('Saved')
    error('Failed')
    info('Note')
    warning('Careful')

    expect(toasts.value.map(t => t.color)).toEqual([
      'success',
      'error',
      'info',
      'warning',
    ])
  })

  it('supports persistent toasts when duration is 0', () => {
    const { add, clear, toasts } = useToast()

    clear()

    add({ title: 'Persistent', duration: 0, progress: false })
    expect(toasts.value[0]?.duration).toBe(0)
    expect(toasts.value[0]?.progress).toBe(false)
  })
})
