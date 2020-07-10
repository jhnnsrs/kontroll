import { useApolloClient, useMutation } from "@apollo/react-hooks";
import createEngine, { DagreEngine, DiagramModel, PathFindingLinkFactory } from '@projectstorm/react-diagrams';
import React, {useState}from "react";
import { DragDropContext, DropResult, ResponderProvided } from 'react-beautiful-dnd';
import { Button, Col, Container, Row, Modal, Form } from "react-bootstrap";
import { GraphNode, GraphNodeQuery, GraphNodeQueryVariables, NodeType, CreateGraphMutation, CreateGraph} from "../../generated/graphql";
import { Diagram } from "./Diagram";
import { Nodes } from "./drawer/Nodes";
import { BasePortFactory } from "./ports/BasePortFactory";
import { StandardNodeFactory } from './standard-node/StandardNodeFactory';
import { StandardNodeModel } from './standard-node/StandardNodeModel';
import { engine } from "./engine/default";
import { dagreengine } from "./engine/dagre";
import { useForm } from "react-hook-form";

type FlowNodeInputs = {
    selector: string,
    integrator: string,
  };



export const Graph = () => {

    const client = useApolloClient()
    const [show, setShow] = useState(false);
    const [query, setGraphQuery] = useState<GraphNodeQuery | null>(null);
    
    const { register, handleSubmit } = useForm<FlowNodeInputs>();

    const onSubmit = (data: FlowNodeInputs) => {
        // Spawns a New Node Model from the Node Input
        setShow(false)
        let node = query?.node as GraphNodeQuery["node"]

        let node_model = new StandardNodeModel({node: node, selector: data.selector, integrator: data.integrator});
        
        let x = engine.getCanvas().clientWidth/2 - 100
        let y = engine.getCanvas().clientHeight/2 - 100
        node_model.setPosition(x,y)
        engine.getModel().addNode(node_model)
        engine.repaintCanvas()
    }

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    async function onDragEnd(result: DropResult, provided: ResponderProvided) {
        // Display the Form and Query the Node
        // Asynchronisolouy fetches the Node and then sets the Node
        setShow(true)
        await client.query<GraphNodeQuery, GraphNodeQueryVariables>({ query: GraphNode, variables: {id: result.draggableId}}).
        then(
            response => {
                setGraphQuery(response.data)
            }
        )

    }

    function autoDistribute(event: any){
        dagreengine.redistribute(engine.getModel());

		// only happens if pathfing is enabled (check line 25)
		engine.getLinkFactories()
			.getFactory<PathFindingLinkFactory>(PathFindingLinkFactory.NAME)
			.calculateRoutingMatrix();
		engine.repaintCanvas();

    }

    async function serialize(event: any){
        let serialized = engine.getModel().serialize()
        console.log(serialized)
        localStorage.setItem("latest_graph", JSON.stringify(serialized))
        //await 
    }

    function deserialize(event: any) {
        let str = localStorage.getItem("latest_graph")
        if (str){
            let model2 = new DiagramModel();
            model2.deserializeModel(JSON.parse(str), engine);
            engine.setModel(model2);
        }

    }



    
  
    return (
        <Container fluid>
            <Button onClick={autoDistribute}>AutoDistribute</Button>
            <Button onClick={deserialize}>Load</Button>
            <Button onClick={serialize}>Save</Button>
            <DragDropContext onDragEnd={onDragEnd}>     
                <Row className="bg-dark">
                <Col lg={10}>
                    <Diagram engine={engine}/>
                </Col>
                <Col lg={2}>
                    <Nodes/>
                </Col>
                </Row>
            </DragDropContext> 
            <Modal show={show} onHide={handleClose}>
                { query ?
                 <>
                    <Modal.Header closeButton>
                        <Modal.Title>{query.node?.name}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <Form>
                            
                            <Form.Group>
                                <Form.Label>Selector</Form.Label>
                                <Form.Control name="selector" as="select" ref={register}>
                                    <option value="@fremmed/__unique__">@fremmed/__unique__</option>
                                    <option value="@kanal/__all__">@kanal/__all__</option>
                                    <option value="@auto/__all__">@auto</option>
                                </Form.Control>
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Integrator</Form.Label>
                                <Form.Control name="integrator" as="select" ref={register}>
                                    <option value="combine">Combine</option>
                                    <option value="trigger">Trigger</option>
                                </Form.Control>
                            </Form.Group>
                            <Button type="submit" variant="primary">Create Node</Button>
                        </Form>
                    </form>
                    </Modal.Body> 
                    <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                    Close
                    </Button>
                    </Modal.Footer>
                    </>
                : <> "Loading" </> }
            </Modal>      
        </Container>
    );
  };