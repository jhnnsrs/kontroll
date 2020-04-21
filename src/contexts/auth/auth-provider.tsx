import React from "react";

import {AuthContext} from './auth-context'
import { useAuthMethods } from './auth-methods'
import { useOAuth2Token } from 'react-oauth2-hook'
import { useEffect } from 'react'
import { TLSSocket } from "tls";

const redirectUri = window.location.origin +"/callback"


export const AuthProvider = (props: any) => {
  // const [cart, setCart] = useState([]);
  const [authState, methods] = useAuthMethods()
  const [token, getToken, setToken] = useOAuth2Token({
    authorizeUrl: "http://localhost:8000/o/authorize",
    scope: ["read"],
    clientID: "NYGOhGOeIZLNd2zl8PK99voteHz7hI6ciuQSwOf3",
    redirectUri: redirectUri
  }) 

  useEffect(() => {
      if (token && token != "undefined") {
        console.log(token)
        localStorage.setItem("token",token)
        methods.token_success(token)
        fetch(
          'http://localhost:8000/api/config/nodes', {
            headers: {
              'Authorization': 'Bearer '+ token, 
            }}
        ).then(response => response.json()).then(
          data => console.log(data)
        ).catch(error => console.log(error))
      }
    },[token])

  const login = () => {
    console.log("Redirection URI:", redirectUri)
    getToken()
    ;
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