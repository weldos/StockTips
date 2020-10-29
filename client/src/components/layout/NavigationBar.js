// This file handles the Navbar component that allows users to navigate the site

//Bring in required packages
import React from 'react';
import { Button, Nav, Navbar, NavDropdown} from 'react-bootstrap';
import styled from 'styled-components';

//FontAwesome Icon
import { faCommentDollar, faSignal, faHome, faNewspaper, faSms, faEnvelopeOpenText, faUserPlus, faUsers  } from '@fortawesome/free-solid-svg-icons'; 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

//Styles
const Styles = styled.div`
    .navbar{
        background-color: whitesmoke;
        position: sticky;
        width: 100%;
        
    }

    .navbar-brand, .navbar-nav .nav-link {
        color: black;

        &:hover {
            color: green;
            transform: scale(1.15);
        }
    }

    .navbar-brand {
        font-size: 28px;
    }
    
`


const NavigationBar = props => {
    return (
        <Styles>
            <Navbar expand="lg"  >
                <Navbar.Brand href="/">StockTips <FontAwesomeIcon icon= {faCommentDollar}/></Navbar.Brand>
                <Navbar.Toggle aria-controls='basic-navbar-nav' />
                <Navbar.Collapse id='basic-navbar-nav'>
                    <Nav className='ml-auto'>
                        <Nav.Item>
                            <Nav.Link href='/signup'><FontAwesomeIcon icon={faNewspaper}/>{' '}Newsletter</Nav.Link>
                        </Nav.Item> 
                        <Nav.Item>
                            <Nav.Link href='/text'><FontAwesomeIcon icon={faSms}/>{' '}Text Message</Nav.Link>
                        </Nav.Item> 
                        <Nav.Item>
                            <Nav.Link href='/contact'><FontAwesomeIcon icon={faEnvelopeOpenText}/>{' '}Contact us</Nav.Link>
                        </Nav.Item>  
                        <Nav.Item>
                            <Nav.Link href='/status'><FontAwesomeIcon icon= {faSignal}/>{' '}Server Status</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link href='/users'><FontAwesomeIcon icon={faUsers}/>{' '}Users</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link href='/users/register'><FontAwesomeIcon icon={faUserPlus}/>{' '}Register</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link href='/'><FontAwesomeIcon icon={faHome} size = '2x' /></Nav.Link>
                        </Nav.Item>
                        
                    </Nav>
                </Navbar.Collapse>                    
            </Navbar>
        </Styles>
    )
}

export default NavigationBar
