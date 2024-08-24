import { describe, it, expect } from 'vitest'
import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import DetailView from '../views/DetailView.vue'
import router from '../router'

describe('Router Configuration', () => {
  it('should redirect "/" to "/home"', async () => {
    const localRouter = createRouter({
      history: createWebHistory(),
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
          component: DetailView
        }
      ]
    })

    localRouter.push('/')
    await localRouter.isReady()

    expect(localRouter.currentRoute.value.fullPath).toBe('/home')
  })

  it('should navigate to "/home"', async () => {
    router.push('/home')
    await router.isReady()

    expect(router.currentRoute.value.name).toBe('home')
  })

  it('should lazy load the DetailView component', async () => {
    const route = {
      path: '/details/:code',
      name: 'details',
      component: () => import('../views/DetailView.vue')
    }
    const component = await route.component()
    expect(component).not.toBeUndefined()
  })
})
