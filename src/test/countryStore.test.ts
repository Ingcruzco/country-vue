import { describe, it, expect, beforeEach } from 'vitest'
import { createPinia, setActivePinia } from 'pinia'
import { useCountryStore } from '@/stores/conuntryStore'
import type { ICountry } from '@/types/country.interface'

describe('useCountryStore', () => {
  let store: ReturnType<typeof useCountryStore>

  beforeEach(() => {
    setActivePinia(createPinia())
    store = useCountryStore()
  })

  it('should have initial state', () => {
    expect(store.loading).toBe(false)
    expect(store.countries).toEqual([])
    expect(store.dataFilered).toEqual([])
    expect(store.dataDetailsFilered).toEqual([])
  })

  it('should update loading state', () => {
    store.setLoading(true)
    expect(store.loading).toBe(true)

    store.setLoading(false)
    expect(store.loading).toBe(false)
  })

  it('should update countries state', () => {
    const mockCountries: ICountry[] = [
      {
        name: 'United States',
        code: 'US',
        capital: 'Washington D.C.',
        continent: { name: 'North America' },
        currency: 'USD',
        states: [{ name: 'California' }]
      }
    ]

    store.setCountries(mockCountries)
    expect(store.countries).toEqual(mockCountries)
  })

  it('should update dataFilered state', () => {
    const filteredData: ICountry[] = [
      {
        name: 'Canada',
        code: 'CA',
        capital: 'Ottawa',
        continent: { name: 'North America' },
        currency: 'CAD',
        states: [{ name: 'Ontario' }]
      }
    ]

    store.setDataFiltered(filteredData)
    expect(store.dataFilered).toEqual(filteredData)
  })

  it('should update dataDetailsFilered state', () => {
    const filteredStates: ICountry['states'] = [{ name: 'New York' }, { name: 'California' }]

    store.setdataDetailsFilered(filteredStates)
    expect(store.dataDetailsFilered).toEqual(filteredStates)
  })
})
