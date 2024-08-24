import { defineStore } from 'pinia'
import type { ICountry } from '@/types/country.interface'

export const useCountryStore = defineStore('countries', {
  state: () => ({
    loading: false,
    countries: [] as ICountry[],
    dataFilered: [] as ICountry[],
    dataDetailsFilered: [] as ICountry['states']
  }),
  actions: {
    setLoading(loading: boolean) {
      this.loading = loading
    },
    setCountries(countries: ICountry[]) {
      this.countries = countries
    },
    setDataFiltered(data: ICountry[]) {
      this.dataFilered = data
    },
    setdataDetailsFilered(data: ICountry['states']) {
      this.dataDetailsFilered = data
    }
  }
})
