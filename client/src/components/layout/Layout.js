// This file handles the Layout component 

//Bring in required packages
import React from 'react';
import { Container } from 'react-bootstrap';
import styled from 'styled-components';



//Styles
const Styles = styled.div`
    color: white; 
    
`
const Layout = props => {
    return (
        
        <Container>
            <Styles>
                { props.children }
            </Styles>
        </Container>
    
    )
}


export default Layout
