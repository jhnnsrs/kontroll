import React from "react"
import { Navbar, Nav, Form, Button, FormControl } from "react-bootstrap"
import { LinkContainer } from 'react-router-bootstrap'
import { useAuth } from "../../contexts/auth/auth-context";
import { TopAppBar, TopAppBarRow, TopAppBarSection, TopAppBarNavigationIcon, TopAppBarTitle, TopAppBarActionItem, TopAppBarFixedAdjust} from "@rmwc/top-app-bar"

export const GraphHeader = (props: any) => {
    
    const [auth, methods] = useAuth();

    return (
        <>
        <TopAppBar short>
    <TopAppBarRow>
      <TopAppBarSection>
        <TopAppBarNavigationIcon icon="menu" />
        <TopAppBarTitle>Short</TopAppBarTitle>
      </TopAppBarSection>
      <TopAppBarSection alignEnd>
        <TopAppBarActionItem icon="login" />
      </TopAppBarSection>
    </TopAppBarRow>
  </TopAppBar>
  <TopAppBarFixedAdjust />
  </>)
}
