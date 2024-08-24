<template>
  <BackgroundCanvas />
  <ButtonBack />
  <div class="title-container">
    <h1 class="title">Country App</h1>
  </div>
  <br />
  <RouterView v-if="!store.loading" />
  <SpinnerCircular />
</template>

<script setup lang="ts">
import { RouterView } from 'vue-router'
import ButtonBack from './components/ButtonBack.vue'
import { onMounted, ref, watch } from 'vue'
import { fetchData } from './services/country.service'
import type { ICountry } from './types/country.interface'
import { useCountryStore } from './stores/conuntryStore'
import SpinnerCircular from './components/SpinnerCircular.vue'
import BackgroundCanvas from './components/BackgroundCanvas.vue'
const store = useCountryStore()

const data = ref<ICountry[]>([])

watch(data, () => store.setCountries(data.value ?? []))

onMounted(async () => {
  store.setLoading(true)

  fetchData()
    .then((res) => {
      data.value = res
    })
    .catch(() => {
      data.value = []
    })
    .finally(() => {
      store.setLoading(false)
    })
})
</script>

<style>
body {
  padding: 2.5rem;
}

.title-container {
  text-align: center;
}

.title {
  font-size: 4em;
  font-weight: bold;
  color: #333;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  margin: 0;
  padding: 0.5em;
  border-bottom: 2px solid #333;
  display: inline-block;
}

.title:hover {
  color: #000;
  border-bottom: 2px solid #000;
}
</style>
