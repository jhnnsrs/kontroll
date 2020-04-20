import React, { useContext } from "react"
import { authState } from "./auth-methods"
import { AuthState } from "./auth-types"


type AuthContext = [
    AuthState,
    {
        login: () => void,
        logout: () => void,
    },
]


export const AuthContext =  React.createContext<AuthContext>([
    authState,
    {
        login: () => {},
        logout: () => {},
}
])


export const useAuth = () => useContext(AuthContext)