import { Provider } from "../bergen/bergen-types"

export type User = {
    name: string,
}

export type Token = string

export type AuthState = {
    isAuthenticated: boolean,
    provider: Provider | null,
    token: Token | undefined,
    user: User | null
}
 