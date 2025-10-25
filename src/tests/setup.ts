import { vi } from 'vitest'

if (!globalThis.ResizeObserver) {
  class ResizeObserverStub implements ResizeObserver {
    observe(): void {}
    unobserve(): void {}
    disconnect(): void {}
  }
  vi.stubGlobal('ResizeObserver', ResizeObserverStub)
}

if (!window.matchMedia) {
  vi.stubGlobal(
    'matchMedia',
    (query: string): MediaQueryList => ({
      media: query,
      matches: false,
      onchange: null,
      addListener: () => {},
      removeListener: () => {},
      addEventListener: () => {},
      removeEventListener: () => {},
      dispatchEvent: () => false,
    }),
  )
}
