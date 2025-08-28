<template>
  <div class="card">
    <h2>{{ title }}</h2>
    <!-- Display prop 'title' -->
    <div class="content">
      <slot>
        <!-- Default slot content if parent doesn't provide any -->
        No additional content provided.
      </slot>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  title: string
}>()
</script>

<style scoped>
.card {
  border: 1px solid #ccc;
  padding: 1rem;
  border-radius: 6px;
}
</style>
