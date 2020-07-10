import React from "react"
import { Navbar, Nav, Form, Button, FormControl } from "react-bootstrap"
import { LinkContainer } from 'react-router-bootstrap'
import { useAuth } from "../../contexts/auth/auth-context";
import { Menu } from "./Menu";

export const Header = (props: any) => {
    
    const [auth, methods] = useAuth();

    return (
    <Navbar bg="dark" variant="dark">
        <LinkContainer to="/home"><Navbar.Brand>Kontroll</Navbar.Brand></LinkContainer>
        <Nav className="mr-auto">
        <LinkContainer to="/graph"><Nav.Link>Graph</Nav.Link></LinkContainer>
        <LinkContainer to="/excecutor"><Nav.Link>Excecutor</Nav.Link></LinkContainer>
        <LinkContainer to="/test"><Nav.Link>Tester</Nav.Link></LinkContainer>
        </Nav>
        <Menu/>
  </Navbar>)
}
