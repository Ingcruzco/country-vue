import { beforeEach, vi } from 'vitest'

globalThis.scrollTo = vi.fn()

beforeEach(() => {
  const canvas = document.createElement('canvas')
  canvas.getContext = vi.fn(() => ({
    beginPath: vi.fn(),
    arc: vi.fn(),
    fillStyle: '',
    fill: vi.fn(),
    clearRect: vi.fn(),
    strokeStyle: '',
    lineWidth: 0,
    moveTo: vi.fn(),
    lineTo: vi.fn(),
    stroke: vi.fn()
  }))
  document.body.appendChild(canvas)
})
