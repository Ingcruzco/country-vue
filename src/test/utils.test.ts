import { describe, it, expect } from 'vitest'
import type { ICountry } from '@/types/country.interface'
import { filterCountries, filterNames } from '@/utils/country'

const countries: ICountry[] = [
  {
    name: 'United States',
    code: 'US',
    capital: 'Washington D.C.',
    continent: { name: 'North America' },
    currency: 'USD',
    states: [{ name: 'California' }]
  },
  {
    name: 'Canada',
    code: 'CA',
    capital: 'Ottawa',
    continent: { name: 'North America' },
    currency: 'CAD',
    states: [{ name: 'Ontario' }]
  },
  {
    name: 'Germany',
    code: 'DE',
    capital: 'Berlin',
    continent: { name: 'Europe' },
    currency: 'EUR',
    states: [{ name: 'Bavaria' }]
  }
]

describe('filterCountries', () => {
  it('should filter countries by name', () => {
    const result = filterCountries(countries, 'canada')
    expect(result).toHaveLength(1)
    expect(result[0].name).toBe('Canada')
  })

  it('should filter countries by code', () => {
    const result = filterCountries(countries, 'DE')
    expect(result).toHaveLength(1)
    expect(result[0].name).toBe('Germany')
  })

  it('should return an empty array if no country matches', () => {
    const result = filterCountries(countries, 'XYZ')
    expect(result).toHaveLength(0)
  })
})

describe('filterNames', () => {
  it('should filter states by name', () => {
    const result = filterNames(countries[0].states, 'california')
    expect(result).toHaveLength(1)
    expect(result[0].name).toBe('California')
  })

  it('should return an empty array if no state matches', () => {
    const result = filterNames(countries[0].states, 'texas')
    expect(result).toHaveLength(0)
  })
})
