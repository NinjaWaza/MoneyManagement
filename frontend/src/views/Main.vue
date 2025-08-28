<template>
  <div>
    <div>
      <h1>Home Page</h1>
      <ChildComponent title="Welcome to the Finance App">
        <p>This is a child component with a slot.</p>
      </ChildComponent>

      <ChildComponent title="Another Card">
        <!-- No slot content here, so default slot content shows -->
      </ChildComponent>
    </div>

    <div>
      <h1>User Info</h1>
      <div v-if="error" style="color: red">{{ error }}</div>
      <div v-else-if="user">
        <p>ID: {{ user.id }}</p>
        <p>Name: {{ user.name }}</p>
        <p>Email: {{ user.email }}</p>
      </div>
      <div v-else>Loading...</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import ChildComponent from '@/components/ChildComponent.vue'

import { ref, onMounted } from 'vue'
import { fetchUserService } from '@/services/fetchUserService'
import type { User } from 'shared/models/User'

const user = ref<User | null>(null)
const error = ref<string | null>(null)

let users: [User]

onMounted(async () => {
  const userService = fetchUserService()

  try {
    user.value = await userService.fetchUser()

    await userService
      .fetchUsers()
      .then((fetchedUsers) => {
        users = fetchedUsers
      })
      .catch((err) => {
        console.log(err)
        error.value = err.message
      })
  } catch (e) {
    error.value = (e as Error).message
    console.log('Error : ', error.value)
  }
})
</script>
