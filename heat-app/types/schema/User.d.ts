export type User = {
  id: number
  login: string
  password: string | null
  salt: string | null
  nickname: string
  role: 'User' | 'Admin'
  image: string | null
  refresh_token: string | null
  lang_id: number | null
  created_at: Date
  last_access: Date
}
