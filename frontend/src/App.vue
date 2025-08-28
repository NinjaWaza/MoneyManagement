<template>
  <div id="app">
    <header>
      <nav>
        <router-link to="/">Home</router-link>
        <router-link to="/about">About</router-link>
        <router-link to="/main">Main</router-link>

        <router-link v-if="store.isUserConnected" to="/transactions">Transactions</router-link>
      </nav>
    </header>

    <main>
      <router-view />
    </main>

    <footer>
      <p>© 2025 ThdThreshold Finance-app</p>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { userStore } from '@/stores/userStore'

const store = userStore()
</script>

<style>
#app {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  text-align: center;
  background-color: #d9d9d9;
}

header {
  margin-bottom: 20px;
}

nav {
  display: flex;
  justify-content: center;
  gap: 15px;
}

main {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
}

footer {
  margin-top: 20px;
}
</style>
