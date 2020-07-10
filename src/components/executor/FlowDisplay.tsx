import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useFlow } from '../../contexts/flow/flow-context';
import { Button } from 'react-bootstrap';



export const FlowDisplay = () => {

    const [ flowState, methods ] = useFlow()

    return (
        <>
            <div>  
            {flowState.links.map( (link, index) => <div>{link.target}</div>)}
            {flowState.nodes.map( (node, index) => <Button onClick={() => methods.provide(node)}>Test {node.name}</Button>)}
            {Object.entries(flowState.pods).map( (link, index) => <div>{link[0]}</div>)}
            <Button onClick={() => methods.loadGraph()}>LoadGraph</Button>
            <Link to="/login">Login</Link>
            </div>
    </>
    );
};