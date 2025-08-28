<template>
  <div>
    <h1>404 - Page Not Found</h1>
    <p>Redirecting you to the homepage in {{ counter }} second{{ counter > 1 ? 's' : '' }}...</p>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const counter = ref(5)
let interval = null // Declare the interval variable

onMounted(() => {
  interval = setInterval(() => {
    if (counter.value > 0) {
      counter.value--
    } else {
      clearInterval(interval)
      router.push('/')
    }
  }, 1000)
})

onBeforeUnmount(() => {
  clearInterval(interval) // Clear the interval when the component is unmounted
})
</script>
