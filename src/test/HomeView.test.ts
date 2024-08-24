import { describe, it, expect, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import HomeView from '@/views/HomeView.vue'
import { createPinia, setActivePinia } from 'pinia'
import { createRouter, createWebHistory } from 'vue-router'
import { RouterLinkStub } from '@vue/test-utils'
import { beforeEach } from 'node:test'
import { useCountryStore } from '@/stores/conuntryStore'

vi.mock('@/stores/conuntryStore', () => ({
  useCountryStore: vi.fn(() => ({
    countries: [
      {
        name: 'United States',
        code: 'US',
        capital: 'Washington D.C.',
        continent: { name: 'North America' },
        currency: 'USD',
        states: [{ name: 'California' }]
      }
    ],
    dataFilered: [
      {
        name: 'United States',
        code: 'US',
        capital: 'Washington D.C.',
        continent: { name: 'North America' },
        currency: 'USD',
        states: [{ name: 'California' }]
      }
    ],
    setLoading: vi.fn(),
    setCountries: vi.fn(),
    setDataFiltered: vi.fn(),
    setdataDetailsFilered: vi.fn()
  }))
}))

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/home'
    },
    {
      path: '/home',
      component: HomeView
    }
  ]
})

describe('HomeView', () => {
  beforeEach(async () => {
    setActivePinia(createPinia())
    router.push('/home')
    await router.isReady()

    const store = useCountryStore()
    store.setCountries([
      {
        name: 'United States',
        code: 'US',
        capital: 'Washington D.C.',
        continent: { name: 'North America' },
        currency: 'USD',
        states: [{ name: 'California' }]
      }
    ])
    store.setDataFiltered([
      {
        name: 'United States',
        code: 'US',
        capital: 'Washington D.C.',
        continent: { name: 'North America' },
        currency: 'USD',
        states: [{ name: 'California' }]
      }
    ])
  })

  it('renders the countries list correctly', async () => {
    router.push('/home')
    await router.isReady()

    const wrapper = mount(HomeView, {
      global: {
        plugins: [router],
        stubs: {
          RouterLink: RouterLinkStub
        }
      }
    })

    await wrapper.vm.$nextTick()

    expect(wrapper.text()).toContain('United States')
    expect(wrapper.text()).toContain('US')
    expect(wrapper.text()).toContain('Washington D.C.')
    expect(wrapper.text()).toContain('North America')
    expect(wrapper.text()).toContain('USD')
  })
})
