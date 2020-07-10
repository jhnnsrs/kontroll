import useMethods from 'use-methods'
import { AuthState , Token, User} from './auth-types'

 
export const authState = { provider: null, isAuthenticated: false,  token: undefined, user: null}

const methods = (state: AuthState) => ({
      token_success(token: Token) {
        state.token = token;
        state.isAuthenticated = true
      },
      login_success(user: User) {
        state.user = user;
      },
      logout() {
        state.provider = null;
        state.user = null;
        state.isAuthenticated = false
        state.token = undefined
      }
    })


export const useAuthMethods = () => useMethods(methods, authState)