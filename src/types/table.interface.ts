import { type Ref } from 'vue'

export interface IHeaders {
  label: string
  key: string
}

export interface IProviderDataTable {
  rows: Ref<number>
  page: Ref<number>
  search: Ref<string>
  shouldResetPage: Ref<Boolean>
  resetPage: (flag: boolean) => void
}
