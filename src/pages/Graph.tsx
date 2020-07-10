import React from "react";
import { Container } from "react-bootstrap";
import { Graph } from "../components/graph/Graph";

export const GraphPage = () => {
  
    return (
        <Container fluid className="bg-dark">
            <Graph/>
        </Container>
    );
  };