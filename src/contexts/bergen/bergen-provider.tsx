import React, { useContext, useEffect, useMemo } from "react";
import { useOAuth2Token } from 'react-oauth2-hook';
import { useBergenMethods } from './bergen-methods';
import { Provider } from "./bergen-types";
import { BergenContext } from "./bergen-context";
import { generateBergenClient } from "./bergen-client";
import { Token } from "../auth/auth-types";


const redirectUri = window.location.origin +"/callback"




export const BergenProvider = (props: any) => {

  const [bergenState, methods] = useBergenMethods()


  const createClient = (provider: Provider, token: Token) => generateBergenClient(provider, token)

  useEffect(() => {
      let possibleBergen = bergenState.chosen || localStorage.getItem("current_bergen") ? JSON.parse(localStorage.getItem("current_bergen") as string) as Provider : null
      let possibleToken = localStorage.getItem("current_token")
      
      console.log("Found new Configuration with", possibleBergen, possibleToken)
      if (possibleBergen) {
        console.log("We have a provider")
        if (possibleToken) {
          console.log("We also have a token, looking if we need to sign in. Current Bergen: ", bergenState.current)
          if (bergenState.current) {
            console.log("We are already signed in. Do we need to change?")
            if (possibleBergen.name !== bergenState.current?.name) {
              console.log("We found a new Provider and will change the Balder Client to", possibleBergen)
              const client = createClient(possibleBergen, possibleToken)
              methods.setClient(client)
              methods.setCurrent(possibleBergen)
            }
            else {
              console.log("Current Configuration is the same as before, omitting")
            }
          }
          else {
            console.log("We are not signed in. Creating Balder client")
            const client = createClient(possibleBergen, possibleToken)
            methods.setClient(client)
            methods.setCurrent(possibleBergen)
          }
          
        }
        else {
          console.log("Bergen is defined, but token not, looking if we need to sign out")
          if (bergenState.current) {
            console.log("It appears we are signed it. Loging out")
            methods.setClient(null)
            methods.setCurrent(null)
          }
          else {
            console.log("We appear to not be signed in. Waiting for signing in!")
          }
        }
      }
      else {
        console.log("No Bergen Found, Please choose and login")
      }
    },[bergenState.chosen, bergenState.token])


  const choose = (provider: Provider) => {
    methods.setChosen(provider)
  }

  const apply = (token: Token)  => {
    localStorage.setItem("current_token", token)
    methods.setToken(token)
  }

  const resign = ()  => {
    localStorage.removeItem("current_token")
    methods.setToken(null)
  }



  return (
    <BergenContext.Provider
      value={[bergenState, {choose: choose , apply: apply, resign: resign}]}
    >
      {props.children}
    </BergenContext.Provider>
  )
}


