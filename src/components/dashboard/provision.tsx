import React, { useEffect } from "react"
import { Container, Card, Badge, Button} from "react-bootstrap"
import {  MonitorqueryQuery, MonitorqueryQueryVariables, MonitorsubscribeSubscription, MonitorsubscribeSubscriptionVariables, Monitorquery, Monitorsubscribe, PodType, NodeType } from '../../generated/graphql';
import { useQuery } from "@apollo/react-hooks";
import { useBalder } from "../../contexts/bergen/bergen-context";

export const ClassicNode = ({node} : {node: NodeType}) => {


    return <>
            <Card.Title>{node?.name}</Card.Title>
            Inputs: {node?.inputs?.map( node => {
                switch (node?.__typename) {
                    case "ModelPortType": return <Badge variant="primary">Model</Badge>
                    case "ObjectPortType": return <Badge variant="secondary">Object</Badge>
                    default: return <Badge variant="dark">Standard</Badge>
                }
            }
            )}
            <br/>
            Outputs: {node?.outputs?.map( node => {
                switch (node?.__typename) {
                    case "ModelPortType": return <Badge variant="primary">Model</Badge>
                    case "ObjectPortType": return <Badge variant="secondary">Object</Badge>
                    default: return <Badge variant="dark">Standard</Badge>
                }
            }
            )}


        </>


}


export const ClassicPod = ({pod} : {pod: PodType}) => {

    const testPod = () => {

        console.log("Testing")

    }

    return <>
            {pod.status == "ready" && "Ready" }
            {pod.status == "pending" && "Initializing" }<br/>
            Unique: {pod.unique && pod.unique } <br/>
            Provider: {pod.provider && pod.provider } <br/>
            {pod.status == "ready" && <Button onClick={() => testPod()}>Test</Button>}<br/>

    </>

}




export const Status = (props: {data: MonitorqueryQuery}) => {

    return <Card>
            {props.data.data?.provider}
            <br/>
            {props.data.data?.node && <ClassicNode node={props.data.data.node as NodeType}/>}
            {props.data.data?.pod && <ClassicPod pod={props.data.data.pod as PodType}/>}
        </Card>
}







export const Provision = (props: {reference: string}) => {
    const { data, subscribeToMore } = useQuery<MonitorqueryQuery, MonitorqueryQueryVariables>(
        Monitorquery,
        { variables: { reference: props.reference } }
    );

    const client = useBalder()

    useEffect(() => {
        console.log("Subscription activated")
        subscribeToMore<MonitorsubscribeSubscription,MonitorsubscribeSubscriptionVariables>({
            document: Monitorsubscribe,
            variables: {
                reference: props.reference
            },
            updateQuery: (prev, { subscriptionData}) => {
                if (!subscriptionData.data) return prev;
                return { ...prev, data: subscriptionData.data.data} as any
            }

        })
    },[])

    return <>
      { data && <Status
        data={data}/>}
    </>

}