import { describe, it, expect } from 'vitest'
import { reducer } from '@/app/components/ui/use-toast'

const makeToast = (id: string) => ({
  id,
  title: 'Test toast',
  open: true,
})

describe('toast reducer', () => {
  it('ADD_TOAST adds a toast and respects TOAST_LIMIT of 1', () => {
    const state = { toasts: [] }
    const next = reducer(state, { type: 'ADD_TOAST', toast: makeToast('1') })
    expect(next.toasts).toHaveLength(1)
    expect(next.toasts[0].id).toBe('1')

    // Adding a second toast should drop first (limit = 1)
    const next2 = reducer(next, { type: 'ADD_TOAST', toast: makeToast('2') })
    expect(next2.toasts).toHaveLength(1)
    expect(next2.toasts[0].id).toBe('2')
  })

  it('UPDATE_TOAST updates matching toast by id', () => {
    const state = { toasts: [makeToast('1')] }
    const next = reducer(state, {
      type: 'UPDATE_TOAST',
      toast: { id: '1', title: 'Updated' },
    })
    expect(next.toasts[0].title).toBe('Updated')
  })

  it('UPDATE_TOAST leaves non-matching toasts unchanged', () => {
    const state = { toasts: [makeToast('1')] }
    const next = reducer(state, {
      type: 'UPDATE_TOAST',
      toast: { id: '999', title: 'Ghost' },
    })
    expect(next.toasts[0].title).toBe('Test toast')
  })

  it('DISMISS_TOAST sets open=false for specific toast', () => {
    const state = { toasts: [makeToast('1')] }
    const next = reducer(state, { type: 'DISMISS_TOAST', toastId: '1' })
    expect(next.toasts[0].open).toBe(false)
  })

  it('DISMISS_TOAST with no id dismisses all toasts', () => {
    const state = { toasts: [makeToast('1')] }
    const next = reducer(state, { type: 'DISMISS_TOAST' })
    expect(next.toasts[0].open).toBe(false)
  })

  it('REMOVE_TOAST removes specific toast by id', () => {
    const state = { toasts: [makeToast('1')] }
    const next = reducer(state, { type: 'REMOVE_TOAST', toastId: '1' })
    expect(next.toasts).toHaveLength(0)
  })

  it('REMOVE_TOAST with no id clears all toasts', () => {
    const state = { toasts: [makeToast('1')] }
    const next = reducer(state, { type: 'REMOVE_TOAST' })
    expect(next.toasts).toHaveLength(0)
  })
})
