import { User } from 'shared/models/User'

export function fetchUserService() {
  return {
    fetchUser(): Promise<User> {
      return fetchUser()
    },
    fetchUsers(): Promise<[User]> {
      return fetchUsers()
    },
  }
}

async function fetchUser(): Promise<User> {
  console.log('Fetching user with cookies')
  //if (!token) throw new Error('Not authenticated');

  console.log("Let's call the backend with cookies")
  const res = await fetch('https://localhost:3000/api/user', {
    method: 'GET',
    credentials: 'include', // Include cookies in the request
  })

  if (res.status == 401) {
    throw new Error('Failed to fetch user because user is not authenticated')
  }

  if (!res.ok) throw new Error('Failed to fetch user')
  console.log('Response received with cookies')
  const user: User = await res.json()
  return user
}

async function fetchUsers(): Promise<[User]> {
  //if (!token) throw new Error('Not authenticated');

  const res = await fetch('https://localhost:3000/api/users', {
    credentials: 'include', // Include cookies in the request
  })
  if (!res.ok) throw new Error('Failed to fetch users')
  const user: [User] = await res.json()
  return user
}
