// fetchData.test.ts
import { describe, it, expect, vi } from 'vitest'
import { gql } from '@apollo/client/core'
import client from '../apollo/apolloClient'
import { fetchData } from '@/services/country.service'
import { beforeEach } from 'node:test'

vi.mock('../apollo/apolloClient', async (importOriginal) => {
  const actual = await importOriginal()
  return {
    default: {
      ...actual,
      query: vi.fn()
    }
  }
})
describe('fetchData', () => {
  beforeEach(() => {
    vi.spyOn(console, 'log').mockImplementation(() => {})
    vi.spyOn(console, 'debug').mockImplementation(() => {})
    vi.spyOn(console, 'error').mockImplementation(() => {})
    vi.spyOn(console, 'warn').mockImplementation(() => {})
  })

  it('should fetch and return countries data', async () => {
    const mockData = {
      data: {
        countries: [
          {
            name: 'United States',
            code: 'US',
            capital: 'Washington D.C.',
            continent: {
              name: 'North America'
            },
            currency: 'USD',
            states: [{ name: 'California' }]
          }
        ]
      }
    }

    ;(client.query as vi.Mock).mockResolvedValue(mockData)

    const countries = await fetchData()

    expect(client.query).toHaveBeenCalledWith({
      query: gql`
        query GetCountries {
          countries {
            name
            code
            capital
            continent {
              name
            }
            currency
            states {
              name
            }
          }
        }
      `
    })

    expect(countries).toEqual(mockData.data.countries)
  })

  it('should handle errors', async () => {
    ;(client.query as vi.Mock).mockRejectedValue(new Error('Failed to fetch'))

    const countries = await fetchData()

    expect(countries).toBeUndefined()
  })
})
