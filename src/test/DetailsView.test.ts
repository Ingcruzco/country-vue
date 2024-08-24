import { describe, it, expect, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import DetailsComponent from '@/views/DetailView.vue'
import { useCountryStore } from '@/stores/conuntryStore'
import { createPinia, setActivePinia } from 'pinia'
import { createRouter, createWebHistory } from 'vue-router'
import { RouterLinkStub } from '@vue/test-utils'
import HomeView from '@/views/HomeView.vue'
import { beforeEach } from 'node:test'

vi.mock('@/stores/conuntryStore', () => ({
  useCountryStore: vi.fn(() => ({
    countries: [{ code: 'US', name: 'United States', states: [{ name: 'California' }] }],
    dataDetailsFilered: [{ name: 'California' }],
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
      name: 'home',
      component: HomeView
    },
    {
      path: '/details/:code',
      name: 'details',
      component: () => import('@/views/DetailView.vue')
    }
  ]
})
describe('DetailsComponent', () => {
  beforeEach(async () => {
    setActivePinia(createPinia())
    router.push('/details/US')
    await router.isReady()

    const store = useCountryStore()
    store.setCountries([{ code: 'US', name: 'United States', states: [{ name: 'California' }] }])
    store.setdataDetailsFilered([{ name: 'California' }])
  })

  it('renders the country name and states count', async () => {
    router.push('/details/US')
    await router.isReady()

    const wrapper = mount(DetailsComponent, {
      global: {
        plugins: [router],
        stubs: {
          RouterLink: RouterLinkStub
        }
      },
      mocks: {
        $route: { params: { code: 'US' } }
      }
    })
    expect(wrapper.text()).toContain('Did you know that United States has 1 states/provinces?')
  })

  it('renders the card with the correct image source and alt text', async () => {
    const wrapper = mount(DetailsComponent, {
      global: {
        plugins: [router],
        stubs: {
          RouterLink: RouterLinkStub
        }
      },
      mocks: {
        $route: { params: { code: 'US' } }
      }
    })

    const img = wrapper.find('img')
    expect(img.exists()).toBe(true)
    expect(img.attributes('src')).toBe('https://flagsapi.com/US/shiny/64.png')
    expect(img.attributes('alt')).toBe('flag_US')
  })

  it('renders DataTable and StateContent components', async () => {
    const wrapper = mount(DetailsComponent, {
      global: {
        plugins: [router],
        stubs: {
          RouterLink: RouterLinkStub
        }
      },
      mocks: {
        $route: { params: { code: 'US' } }
      }
    })

    expect(wrapper.text()).toContain('Did you know that United States has 1 states/provinces?')
  })
})
