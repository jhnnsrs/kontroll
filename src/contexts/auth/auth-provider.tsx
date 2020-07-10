import React, { useContext, useEffect, useMemo } from "react";
import { useOAuth2Token } from 'react-oauth2-hook';
import { AuthContext } from './auth-context';
import { useAuthMethods } from './auth-methods';
import { useBergen } from "../bergen/bergen-context";
import { Provider } from "../bergen/bergen-types";


const redirectUri = window.location.origin +"/callback"


export const AuthProvider = (props: any) => {
  // const [cart, setCart] = useState([]);
  const [authState, methods] = useAuthMethods()
  const [bergenState, bergenmethods] = useBergen()
  const [token, getToken, setToken] = useOAuth2Token(bergenState.chosen ? bergenState.chosen : bergenState.default) 

  useEffect(() => {
      if (token && token !== "undefined") {
        console.log("Oauth found token", token)
        localStorage.setItem("token",token)
        bergenmethods.apply(token)
      }
    },[token])

  useEffect( () => {
    if (bergenState.chosen) {
      console.log(bergenState.chosen)
      console.log(bergenState.token, token)
      if (bergenState.token !== token){
        console.log("Changed the chosen Bergen, Trying to find token")
        getToken()
      }
      else {
        console.log("It appears we have already changed this token")
      }
    }
  },[bergenState.chosen])

  const login = () => {
    console.log("Redirection URI:", redirectUri)
    getToken()
  }

  const logout = () => {
    setToken(undefined)
    methods.logout()
  }


  return (
    <AuthContext.Provider
      value={[authState, {login: login, logout: logout}]}
    >
      {props.children}
    </AuthContext.Provider>
  )
}