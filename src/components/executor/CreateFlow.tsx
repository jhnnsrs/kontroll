import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useFlow } from '../../contexts/flow/flow-context';
import { Button, Form, Card } from 'react-bootstrap';
import { useMutation } from '@apollo/react-hooks';
import { CreateGraph, CreateGraphMutation, CreateGraphMutationVariables, ConvertToFlotMutation, ConvertToFlotMutationVariables, ConvertToFlot } from '../../generated/graphql';
import { useForm } from 'react-hook-form';

export type CreateFlowInputs = {
    name: string,
    description: string,
}



export const GraphDetail = ({mutation}: {mutation: CreateGraphMutation}) => {
    const [converToFlot, { data: flow }] = useMutation<ConvertToFlotMutation, ConvertToFlotMutationVariables>(ConvertToFlot);

    let graph = mutation.createGraph?.graph

    return <Card>
        {graph && <div>
            <Button onClick={() => converToFlot({variables: {graph: graph?.id as string}})}>Convert To Flow</Button>
        </div>}
        {flow?.toFlow?.status}


    </Card>


}

export const CreateFlow = () => {

    
    
    const { register, handleSubmit } = useForm<CreateFlowInputs>();
    const [createGraph, { data: postedgraph }] = useMutation<CreateGraphMutation, CreateGraphMutationVariables>(CreateGraph);

    async function deserialize(event: any) {

    }

    function onSubmit(data: CreateFlowInputs) {
        
        let str = localStorage.getItem("latest_graph") as string
        let model = JSON.parse(str)
        console.log(model)

        createGraph({ variables: {diagram: model, name: data.name} })

    }


    return (
        <>
            <div>  
                {postedgraph && <GraphDetail mutation={postedgraph}/>}
                <form onSubmit={handleSubmit(onSubmit)}>
                    <Form>
                        <Form.Group>
                                <Form.Label>Name</Form.Label>
                                <Form.Control name="name" as="input" ref={register}>
                                </Form.Control>
                        </Form.Group>
                    </Form>
                    <Button type="submit" variant="primary">Create Graph</Button>

                </form>
            <Button onClick={() => deserialize("lala")}>Create Flow</Button>
            </div>
    </>
    );
};