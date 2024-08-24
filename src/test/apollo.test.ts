import { describe, it, expect } from 'vitest'
import { HttpLink, InMemoryCache } from '@apollo/client/core'
import client from '@/apollo/apolloClient'

describe('Apollo Client', () => {
  it('should have correct service configuration', () => {
    expect(client.cache).toBeInstanceOf(InMemoryCache)
    expect(client.link).toBeInstanceOf(HttpLink)
  })
})
