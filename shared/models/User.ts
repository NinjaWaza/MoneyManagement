export type User = {
  id: string
  name: string
  email: string
  password?: string // Optional for security reasons, never expose this in responses
}
