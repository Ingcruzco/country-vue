<template>
  <template v-for="country in countries" :key="country.code">
    <tr>
      <td scope="col">{{ country.name }}</td>
      <td scope="col">{{ country.code }}</td>
      <td scope="col">{{ country.capital }}</td>
      <td scope="col">{{ country.continent.name }}</td>
      <td scope="col">{{ country.currency }}</td>
      <td scope="col"><ActionButton v-if="country.states.length > 0" :code="country.code" /></td>
    </tr>
  </template>
</template>

<script setup lang="ts">
import { useCountryStore } from '@/stores/conuntryStore'
import type { ICountry } from '@/types/country.interface'
import { filterCountries } from '@/utils/country'
import { computed, inject, onMounted, ref, watch } from 'vue'
import ActionButton from './ActionButton.vue'
import type { IProviderDataTable } from '@/types/table.interface'

const store = useCountryStore()

const tableConfig = inject<IProviderDataTable>('tableStatus')!

const data = ref<ICountry[]>([])

watch(
  () => store.countries,
  () => (data.value = store.countries)
)

const dataFiltered = ref<ICountry[]>([])

watch(data, (value) => {
  dataFiltered.value = value
})

const countries = computed<ICountry[]>(() => {
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
      dataFiltered.value = [...data.value]
      return
    }
    dataFiltered.value = filterCountries(data.value, newSearch)
  }
})

watch(dataFiltered, (countrieInfo) => store.setDataFiltered(countrieInfo))

onMounted(() => (data.value = store.countries))
</script>
