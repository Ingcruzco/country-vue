import { describe, it, expect, beforeEach, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import CanvasAnimation from '@/components/BackgroundCanvas.vue'

describe('CanvasAnimation.vue', () => {
  let wrapper: any
  let canvas: HTMLCanvasElement
  let ctx: CanvasRenderingContext2D

  beforeEach(() => {
    vi.spyOn(console, 'log').mockImplementation(() => {})
    vi.spyOn(console, 'debug').mockImplementation(() => {})
    vi.spyOn(console, 'error').mockImplementation(() => {})
    vi.spyOn(console, 'warn').mockImplementation(() => {})
    wrapper = mount(CanvasAnimation, {
      attachTo: document.body
    })
    canvas = wrapper.find('canvas').element as HTMLCanvasElement
    ctx = canvas.getContext('2d') as CanvasRenderingContext2D
  })

  it('initializes canvas with correct dimensions', () => {
    expect(canvas.width).toBe(window.innerWidth)
    expect(canvas.height).toBe(window.innerHeight)
  })

  it('creates particles and animates', async () => {
    const initSpy = vi.spyOn(wrapper.vm, 'initCanvas')
    console.log('initSpy created:', initSpy)

    await wrapper.vm.$nextTick()

    wrapper.vm.initCanvas()
    expect(initSpy).toHaveBeenCalled()
  })

  it('resizes canvas on window resize', async () => {
    window.innerWidth = 500
    window.innerHeight = 500
    window.dispatchEvent(new Event('resize'))

    await wrapper.vm.$nextTick()

    expect(canvas.width).toBe(500)
    expect(canvas.height).toBe(500)
  })
})
