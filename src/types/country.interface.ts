export interface ICountry {
  name: string
  code: string
  capital: string
  continent: {
    name: string
  }
  currency: string
  states: IState[]
}

export interface IState {
  name: string
}
