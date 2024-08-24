<template>
  <tr v-for="state in states" :key="state.name">
    <td scope="col">{{ state.name }}</td>
  </tr>
</template>

<script setup lang="ts">
import { useCountryStore } from '@/stores/conuntryStore'
import type { ICountry } from '@/types/country.interface'
import type { IProviderDataTable } from '@/types/table.interface'
import { filterNames } from '@/utils/country'
import { computed, inject, ref, watch, watchEffect, type Ref } from 'vue'

const store = useCountryStore()

const country = inject<Ref<ICountry>>('country')

const dataFiltered = ref<ICountry['states']>([])

watchEffect(() => {
  dataFiltered.value = country?.value?.states ?? []
})

const tableConfig = inject<IProviderDataTable>('tableStatus')!

const states = computed<ICountry['states']>(() => {
  let start = (tableConfig.page.value - 1) * tableConfig.rows.value
  const end = tableConfig.rows.value
  if (start > dataFiltered.value.length) {
    start = 0
    tableConfig.resetPage(true)
  }
  return [...dataFiltered.value].sort((a, b) => a.name.localeCompare(b.name)).splice(start, end)
})

watch(tableConfig.search, (newSearch: string, oldSearch: string) => {
  if (newSearch !== oldSearch) {
    if (!newSearch.trim()) {
      dataFiltered.value = [...(country?.value?.states ?? [])]
      return
    }
    dataFiltered.value = filterNames(country?.value?.states ?? [], newSearch)
  }
})
watch(
  dataFiltered,
  (countrieInfo) => {
    store.setdataDetailsFilered(countrieInfo)
  },
  { immediate: true }
)
</script>
