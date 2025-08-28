<template>
  <div>
    <div>
      <p v-if="!store.isUserConnected">
        (this app don't accept registration sorry, contact the admin to have an access)
      </p>
      <LoginView />
    </div>
  </div>
</template>

<script setup lang="ts">
import LoginView from '@/components/LoginView.vue'
import { userStore } from '@/stores/userStore'

const store = userStore()
</script>
