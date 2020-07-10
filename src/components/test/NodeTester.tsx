
import React, { useState } from "react"
import { Card, Container, Button, Form, Row, Col} from "react-bootstrap"
import { AllNodes, AllNodesQuery, ProvisionNodeSubscription, ProvisionNode, ProvisionNodeSubscriptionVariables } from "../../generated/graphql";
import { useForm } from "react-hook-form";
import { useObservable } from "rxjs-hooks";
import { Observable, Subject } from "rxjs";
import { tap, switchMap } from "rxjs/operators";
import { useBalder } from "../../contexts/bergen/bergen-context";
import { v4 } from "uuid";
import { useQuery } from "@apollo/react-hooks";
import { ProvisionWrapper } from "./ProvisionWrapper"

type TestInputs = {
    selector: string,
};

const ProvisionSubject = new Subject<ProvisionNodeSubscriptionVariables>()
  

  

export const NodeTester = () => {

    const {data, loading, error} = useQuery<AllNodesQuery>(AllNodes)
    const [ provision, setPod ] = useState<ProvisionNodeSubscription | null>(null)
    const client = useBalder()
    const { register, handleSubmit, watch } = useForm<TestInputs>();
    const watched_selector = watch("selector", "@port/__all__")

    const value = useObservable(() => ProvisionSubject.pipe(
        tap( value => console.log(value)),
        switchMap( value => {
            return (Observable.create((observer: any) => {
                client.subscribe<ProvisionNodeSubscription,ProvisionNodeSubscriptionVariables>({
                    query: ProvisionNode,
                    variables: value
                }).subscribe(
                    result => {
                        console.log(result)
                        
                        observer.next(result.data);
                        return result
                    }
                );
            }) as Observable<ProvisionNodeSubscription>).pipe(
                tap(nana => console.log(nana)),
                tap(nana => setPod(nana))
            ) 
        })
  
    ))

    async function provide(id: string){
        console.log(watched_selector)
        console.log("Trying to Provide", id)
        ProvisionSubject.next({
            reference: v4(),
            id: id || "1",
            selector: watched_selector
        })

    }


    if (loading) return <>'Loading...'</>
    if (error) return <>'Something Bad Happened'</>

    return (
        <Container>
             <form>
                        <Form>
                            
                            <Form.Group>
                                <Form.Label>Selector</Form.Label>
                                <Form.Control name="selector" as="select" ref={register} defaultValue={"@port/__all__"}>
                                    <option value="@fremmed/__unique__">@fremmed/__unique__</option>
                                    <option value="@kanal/__all__">@kanal/__all__</option>
                                    <option value="@port/__all__">@port/__all__</option>
                                </Form.Control>
                            </Form.Group>
                        </Form>
            </form>
            { provision && <ProvisionWrapper provision={provision}/>}

            <hr/>
            <Container>
                <Row>
                { data && data.nodes?.filter(node => node?.variety == "flow").map( (node, index) =>
                    <Col className="col-sm-2" key={index}>
                        <Card body>
                            <Card.Title>{node?.name ? node.name : "Not Set"}</Card.Title>
                            <Button onClick={() => provide(node?.id || "fake" )}>
                                Provide
                            </Button>
                            
                            
                        </Card>
                    </Col>
                        )}
                </Row>
            </Container>

        </Container>
    )
    
}