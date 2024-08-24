import type { ICountry } from '@/types/country.interface'

export const filterCountries = (countries: ICountry[], text: string) => {
  return countries.filter(
    (country) =>
      country.name.toLowerCase().includes(text.toLocaleLowerCase()) ||
      country.code.toLowerCase().includes(text.toLocaleLowerCase())
  )
}

export const filterNames = (states: ICountry['states'], text: string) => {
  return states.filter((state) => state.name.toLowerCase().includes(text.toLocaleLowerCase()))
}
