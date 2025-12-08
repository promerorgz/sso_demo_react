import api, { setAccessToken } from './client'

export type LoginRequest = {
  username: string
  password: string
}

export type LoginResponse = {
  token: string
}

export async function login(req: LoginRequest): Promise<LoginResponse> {
  // Demo: simulate API
  await new Promise((r) => setTimeout(r, 600))
  const token = btoa(`${req.username}:${Date.now()}`)
  setAccessToken(token)
  return { token }
  // For real API:
  // const { data } = await api.post<LoginResponse>('/auth/login', req)
  // setAccessToken(data.token)
  // return data
}

export async function fetchProfile<T = any>(): Promise<T> {
  // Demo: simulate fetch
  await new Promise((r) => setTimeout(r, 400))
  return {
    name: 'Demo User',
    email: 'demo@example.com',
    roles: ['Presenter'],
  } as T
  // Real API example:
  // const { data } = await api.get<T>('/me')
  // return data
}

export function logout() {
  setAccessToken(null)
}
