<template>
  <div>
    <div v-if="store.isUserConnected">
      <p>Welcome : {{ store.getUser()?.name }}</p>
      <button class="logout-button" @click="userAuthenticationService.logout()">Logout</button>
    </div>
    <div v-else-if="!store.isUserConnected">
      <div class="login-container">
        <div class="login-form">
          <form @submit.prevent="submitLogin">
            <input v-model="formData.username" placeholder="Username" />
            <input type="password" v-model="formData.password" placeholder="Password" />
            <button type="submit">Login</button>
            <p>{{ message }}</p>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { authenticationService } from '@/services/authenticationService'
import { userStore } from '@/stores/userStore'
import { User } from 'shared'

const username = ref('')
const password = ref('')
const message = ref('')

const formData = ref({
  username: '',
  password: '',
})

const userAuthenticationService = authenticationService()
const store = userStore()

async function submitLogin() {
  const response: Response = await userAuthenticationService.sumbitLogin(
    formData.value.username,
    formData.value.password,
  )

  if (response.ok) {
    const userData = await response.json()
    const userToSaveInStore = userData.user as User
    store.setUser(userToSaveInStore)
    message.value = 'Logged in!'
    clearForm()
    store.setUserConnected(true)
  } else {
    message.value = 'Login failed'
    store.setUserConnected(false)
  }
}

function clearForm() {
  formData.value.username = ''
  formData.value.password = ''
}
</script>

<style>
.login-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.login-form {
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  width: 300px;
  text-align: center;
}

.login-form input {
  width: 100%;
  padding: 10px;
  margin: 10px 0;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.login-form button {
  width: 100%;
  padding: 10px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.login-form button:hover {
  background-color: #0056b3;
}

.message {
  margin-top: 10px;
  color: red;
}

.logout-button {
  width: 100%;
  padding: 10px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s;
}
</style>
