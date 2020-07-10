import useMethods from 'use-methods'
import { FlowState, FlowNode, FlowLink, FlowError, NodeID, FlowPod, PodID} from './flow-types'

 
export const flowState = { 
  nodes: [] as Array<FlowNode>,
  links: [] as Array<FlowLink>,
  pods: {} as Map<NodeID, FlowPod>,
  errors: [] as Array<FlowError>,
}

const methods = (state: FlowState) => ({
      setNodes(nodes: Array<FlowNode>) {
        state.nodes = nodes;
      },
      setLinks(links: Array<FlowLink>) {
        state.links = links
      },
      setPodForNode(id: NodeID, pod: FlowPod ) {
        state.pods = {...state.pods, [id]: pod};
      },
    })


export const useFlowMethods = () => useMethods(methods, flowState)