import React from "react"
import { Navbar, Nav, Form, Button, FormControl, Dropdown } from "react-bootstrap"
import { LinkContainer } from 'react-router-bootstrap'
import { useAuth } from "../../contexts/auth/auth-context";
import { useBergen } from "../../contexts/bergen/bergen-context";

export const Menu = (props: any) => {
    
    const [auth, authmethods] = useAuth();
    const [bergen, bergenmethods] = useBergen();

    return (
    <> 
        {bergen.client ?
        <Button onClick={() => bergenmethods.resign() } variant="outline-danger">Logout</Button> :
        <Dropdown>
            <Dropdown.Toggle variant="success" id="dropdown-basic">
            Login
            </Dropdown.Toggle>

            <Dropdown.Menu>
                {bergen.available.map( provider => 
                <Dropdown.Item onClick={() => bergenmethods.choose(provider)}>{provider.name}</Dropdown.Item>
                )}
            </Dropdown.Menu>
        </Dropdown>
        }
  </>)
}