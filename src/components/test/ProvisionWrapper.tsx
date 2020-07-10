import React, { useState } from "react"
import { ProvisionNodeSubscription } from "../../generated/graphql"
import { Card, Alert, Spinner, Button, Badge} from "react-bootstrap"
import { ProvidedRequiredArgumentsOnDirectivesRule } from "graphql/validation/rules/ProvidedRequiredArgumentsRule";


export const ProvisionFailedAlert = (props : { error: string}) => {
    const [show, setShow] = useState(true);
  
    if (show) {
      return (
        <Alert variant="danger" onClose={() => setShow(false)} dismissible>
          <Alert.Heading>Oh snap! You got an error!</Alert.Heading>
          <p>
            {props.error}
          </p>
        </Alert>
      );
    }
    return <></>;
  }





export const ProvisionWrapper = ( {provision} : {provision: ProvisionNodeSubscription} ) => {
    let provide = provision.provide


    const openFremmed = (unique: string) => {
        window.open("http://localhost:3000/fremmed/" + unique)
    }

    const testPod = (id: string) => {
        window.open("http://localhost:3000/podtest/" + id)
    }

    if (!provide) return <></>

    if (provide.pod) {
        let user = provide.user
        let pod = provide.pod
        let node = provide.node

        let color: "success" | "primary" | "dark" | null = null
        switch (pod.status) {
            case "pending": color = "primary"; break
            case "ready": color = "success"; break
            default: color = "dark"; break
        }


        return <Card body>
            <Card.Title>{node?.name}</Card.Title>
            <Card.Subtitle>{provide.reference}</Card.Subtitle>
            { color && <Spinner animation="grow" variant={color}/>}
            {pod.status == "ready" && "Ready" }
            {pod.status == "pending" && "Initializing" }<br/>
            Unique: {pod.unique && pod.unique } <br/>
            Provider: {pod.provider && pod.provider } <br/>
            Creator: {user && user.username}<br/>
            {pod.status == "pending" && pod.provider == "fremmed" && <Button onClick={() => openFremmed(pod.unique)}>Open</Button>}<br/>
            {pod.status == "ready" && <Button onClick={() => testPod(pod.id)}>Test</Button>}<br/>
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


        </Card>
        
        
        
    }


    return <></>


}