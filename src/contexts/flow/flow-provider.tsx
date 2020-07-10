import React, { useContext } from "react";
import { FlowContext } from './flow-context';
import { useFlowMethods } from './flow-methods';
import { FlowGraph, FlowNode, FlowLink} from "./flow-types";
import { ProvisionNode,ProvisionNodeSubscription, ProvisionNodeSubscriptionVariables} from '../../generated/graphql';
import { BehaviorSubject, Observable } from 'rxjs';
import { map, switchMap, mergeMap, tap } from 'rxjs/operators';
import { useObservable } from 'rxjs-hooks'
import { useBalder } from "../bergen/bergen-context";
import { v4 } from "uuid";

const redirectUri = window.location.origin +"/callback"

const ProvisionSubject = new BehaviorSubject<ProvisionNodeSubscriptionVariables>({
  reference: "hallo",
  id: "3",
  selector: "@fremmed/__unique__"
})


export const FlowProvider = (props: any) => {
  // const [cart, setCart] = useState([]);
  const [flowState, methods] = useFlowMethods()
  const client = useBalder()
  const value = useObservable(() => ProvisionSubject.pipe(
      tap( value => console.log(value)),
      switchMap( value => {
          return Observable.create((observer: any) => {
              client.subscribe<ProvisionNodeSubscription,ProvisionNodeSubscriptionVariables>({
                  query: ProvisionNode,
                  variables: value
              }).subscribe(
                  result => {
                      
                      observer.next(result);
                      return result
                  }
              );
          }).pipe(
              tap(nana => console.log(nana)),
              tap(result => methods.setPodForNode("id",{
                  id: "1",
                  node: 1
                })
              )
          )
      })

  ))

  const provide = (node: FlowNode) => {
      console.log("Trying to Provide", node)
      ProvisionSubject.next({
          reference: v4(),
          id: node.nodeid || "1",
          selector: "@fremmed/__unique__"
      })
  }

  
  const loadGraph = () => {
    console.log("Redirection URI:", redirectUri)
    let localGraph = localStorage.getItem("latest_graph")
    if (localGraph) {
      let serialized = JSON.parse(localGraph as string) as FlowGraph

      let nodeLayers = serialized.layers.filter( layer => layer.type == "diagram-nodes" && !layer.isSvg)
      let nodes = nodeLayers.flatMap( layer => 
        Object.entries(layer.models).map( ([value, element]) => 
        ({...element} as unknown as FlowNode)))
      methods.setNodes(nodes)


      let linkLayers = serialized.layers.filter( layer => layer.type == "diagram-links")
      let links = linkLayers.flatMap( layer => 
        Object.entries(layer.models).map( ([value, element]) => 
        ({...element} as unknown as FlowLink)))
      methods.setLinks(links)
    }
  }

  const stopFlow = () => {}

  return (
    <FlowContext.Provider
      value={[flowState, {loadGraph: loadGraph, stopFlow: stopFlow, provide: provide}]}
    >
      {props.children}
    </FlowContext.Provider>
  )
}