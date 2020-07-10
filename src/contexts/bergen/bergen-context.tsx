import React, { useContext } from "react"
import { bergenState } from "./bergen-methods"
import { BergenState, Provider } from "./bergen-types"
import { Token } from "../auth/auth-types"
import { ApolloClient } from 'apollo-client';
import {  NormalizedCacheObject } from 'apollo-cache-inmemory';

type BergenContext = [
    BergenState,
    {
        choose: (provider: Provider) => void,
        apply: (token: Token) => void,
        resign: () => void,
    },
]


export const BergenContext =  React.createContext<BergenContext>([
    bergenState,
    {
        choose: (provider) => {},
        apply: (token) => {},
        resign: () => {},
}
])


export const useBergen = () => useContext(BergenContext)
export const useBalder = () => useContext(BergenContext)[0].client as ApolloClient<NormalizedCacheObject>