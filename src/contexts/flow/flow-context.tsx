import React, { useContext } from "react"
import { FlowState, FlowNode } from "./flow-types"
import { flowState } from "./flow-methods"


type FlowContext = [
    FlowState,
    {
        loadGraph: () => void,
        stopFlow: () => void,
        provide: (node: FlowNode) => void
    },
]


export const FlowContext =  React.createContext<FlowContext>([
    flowState,
    {
        loadGraph: () => {},
        stopFlow: () => {},
        provide: (node) => {},
}
])


export const useFlow = () => useContext(FlowContext)