<template>
  <thead>
    <tr>
      <template v-for="header in props.headers" :key="header.key">
        <th scope="col">{{ header.label }}</th>
      </template>
    </tr>
  </thead>
  <tbody>
    <slot></slot>
  </tbody>
</template>

<script setup lang="ts">
import type { IHeaders } from '@/types/table.interface'

const props = defineProps<{
  headers: IHeaders[]
}>()
</script>
