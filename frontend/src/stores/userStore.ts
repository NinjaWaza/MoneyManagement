import { defineStore } from 'pinia'
import { User } from 'shared'

export const userStore = defineStore('user', {
  state: () => ({
    isUserConnected: JSON.parse(localStorage.getItem('isUserConnected') || 'false'),
    user: JSON.parse(localStorage.getItem('user') || 'false') as User,
  }),
  actions: {
    setUserConnected(value: boolean) {
      this.isUserConnected = value
      localStorage.setItem('isUserConnected', JSON.stringify(value))
    },
    setUser(user: User) {
      this.user = user // Set the user information
      localStorage.setItem('user', JSON.stringify(user))
    },
    getUser(): User | undefined {
      return this.user
    },
  },
})
