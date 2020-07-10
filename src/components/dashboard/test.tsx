import React from "react"
import { useMutation, useQuery } from "@apollo/react-hooks";
import {  ProvideNode, ProvideNodeMutation, ProvideNodeMutationVariables,AllNodesQuery, AllNodes} from '../../generated/graphql';
import { Button, Container, Row, Col, Card } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

export const DeployNodeButton = ({node}: {node: string}) => {
    
    const [provideNode, { data }] = useMutation<ProvideNodeMutation, ProvideNodeMutationVariables>(ProvideNode);

    const provide = () => {
        provideNode({variables: {node: node, selector: "@port/__all__"}})
    }
    return <>
       
        { data?.provide?.reference ? <LinkContainer to={"/dashboard/" + data.provide.reference} ><a>Dashboard</a></LinkContainer> :  <Button onClick={ () => provide() }>Provide</Button>}


    </>
}


export const DeployNodeGraph = () => {
    const {data, loading, error} = useQuery<AllNodesQuery>(AllNodes)

    if (loading) return <>'Loading...'</>
    if (error) return <>'Something Bad Happened'</>

    return (
        <Container>
            <Container>
                <Row>
                { data && data.nodes?.filter(node => node?.variety == "flow").map( (node, index) =>{
                    if (node) return <Col className="col-sm-2" key={index}>
                        <Card body>
                            <Card.Title>{node?.name ? node.name : "Not Set"}</Card.Title>
                            <DeployNodeButton node={node?.id}/>
                        </Card>
                    </Col>
                        
                        })}
                </Row>
            </Container>

        </Container>
    )
}