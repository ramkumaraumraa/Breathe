import '@testing-library/jest-dom'

// jsdom ships no IntersectionObserver, and motion's `whileInView` throws without
// one. Nothing asserts on scroll position, so a stub that never fires is enough.
if (!('IntersectionObserver' in globalThis)) {
  class NoopIntersectionObserver {
    readonly root = null
    readonly rootMargin = ''
    readonly thresholds: ReadonlyArray<number> = []
    observe() {}
    unobserve() {}
    disconnect() {}
    takeRecords() {
      return []
    }
  }
  globalThis.IntersectionObserver = NoopIntersectionObserver as unknown as typeof IntersectionObserver
}
