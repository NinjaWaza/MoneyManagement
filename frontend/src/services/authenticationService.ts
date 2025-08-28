import { userStore } from '@/stores/userStore'
import router from '../router/router'

export function authenticationService() {
  return {
    sumbitLogin(username: string, password: string): Promise<Response> {
      return submitLogin(username, password)
    },
    logout,
    checkIfUserIsConnected,
  }
}

async function logout() {
  const store = userStore()

  const res = await fetch('http://localhost:3000/logout', {
    method: 'POST',
    credentials: 'include',
  })

  if (res.status == 401) {
    console.log('not authorized, means already logged out')
  } else if (!res.ok) {
    throw new Error('Logout failed')
  }

  console.log('User successfully logged out')
  store.setUserConnected(false)
  router.push('/')
}

async function submitLogin(username: string, password: string): Promise<Response> {
  return await fetch('http://localhost:3000/login', {
    method: 'POST',
    credentials: 'include',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username: username, password: password }),
  })
}

async function checkIfUserIsConnected(): Promise<Response> {
  return await fetch('http://localhost:3000/isUserConnected', {
    method: 'GET',
    credentials: 'include',
  })
}
