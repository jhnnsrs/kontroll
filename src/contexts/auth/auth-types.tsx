export type Scopes = 
  | "CAN_READ"
  | "CAN_PARSE"
  | "CAN_HOST_POD"
  | "CAN_PROVIDE_POD"

export type Provider = {
    clientid: string,
    clientsecret: string,
    authorization_url: string,
    scopes: [Scopes]
}

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
 