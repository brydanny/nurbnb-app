export interface User {
  id?: string
  name?: string
  lastname?: string
  city?: string
  country?: string
  email: string
  password: string
  isHost?: boolean
  isGuest?: boolean
}
