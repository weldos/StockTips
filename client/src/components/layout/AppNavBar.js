// React and Bootstrap imports
import React, { Fragment } from "react";
import { useHistory } from "react-router-dom";
import { Nav, Navbar, NavDropdown } from "react-bootstrap";

//Redux and Firebase imports
import { compose } from "redux";
import { connect } from "react-redux";
import { withFirestore } from "react-redux-firebase";

//FontAwesome and Styling imports
import { faCommentDollar, faSignal, faHome, faNewspaper, faSms, faEnvelopeOpenText, faUserPlus, faUsers, faSignInAlt, faSignOutAlt, faUserShield, faUserSecret  } from '@fortawesome/free-solid-svg-icons'; 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styled from 'styled-components';

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
    
    .nav-link {
      font-size:17px;
    }
`

const AppNavBar = ({ firebase, auth }) => {

  const history = useHistory();

  const logOut = (e) => {
    console.log("logout");
    //Logout from the database
    firebase
      .auth()
      .signOut()
      .then(() => {
        console.log("User has logged out!");
        history.push("/login");
      })
      .catch((error) => console.log(error));
  };

  const title = <span><FontAwesomeIcon icon={faUserShield}/> Admin Panel</span> 

  // if user is logged in
  const loggedIn = (
  <Fragment>
        <Nav.Link href='/signup'><FontAwesomeIcon icon={faNewspaper}/>{' '}Newsletter</Nav.Link>
        <Nav.Link href='/text'><FontAwesomeIcon icon={faSms}/>{' '}Text Message</Nav.Link>
        <Nav.Link href='/contact'><FontAwesomeIcon icon={faEnvelopeOpenText}/>{' '}Contact us</Nav.Link>
        {/* <Nav.Link href='/users'><FontAwesomeIcon icon={faUsers}/>{' '}Users</Nav.Link>
        <Nav.Link href='/users/register'><FontAwesomeIcon icon={faUserPlus}/>{' '}Register</Nav.Link> */}
        <NavDropdown title={title} id="basic-nav-dropdown">
          <NavDropdown.Item href='/users'><FontAwesomeIcon icon={faUsers}/>{' '}All Users</NavDropdown.Item>
          <NavDropdown.Item href='/users/register'><FontAwesomeIcon icon={faUserPlus}/>{' '}Register</NavDropdown.Item>
          <NavDropdown.Item href='/customers'><FontAwesomeIcon icon={faUserSecret}/>{' '}Customers</NavDropdown.Item>
          <NavDropdown.Divider />
          <NavDropdown.Item eventKey="disabled" disabled>{auth.email}</NavDropdown.Item>
          <NavDropdown.Item href="#!" onClick={(e) => logOut(encodeURIComponent)}><FontAwesomeIcon icon={faSignOutAlt}/>{' '}Logout</NavDropdown.Item>
        </NavDropdown>
        <Nav.Link href='/status'><FontAwesomeIcon icon= {faSignal}/>{' '}Server Status</Nav.Link>
        {/* <Nav.Link href="/#!" onClick={(e) => logOut(encodeURIComponent)}><FontAwesomeIcon icon={faSignOutAlt}/>{' '}Logout</Nav.Link> */}
        <Nav.Link href='/'><FontAwesomeIcon icon={faHome} size = '2x' /></Nav.Link>
  </Fragment>
  );

  // if user is logged Out
  const loggedOut = (
  <Fragment>
        <Nav.Link href="/login"><FontAwesomeIcon icon={faSignInAlt}/>{' '}Login</Nav.Link>
        <Nav.Link href='/users/register'><FontAwesomeIcon icon={faUserPlus}/>{' '}Register</Nav.Link>
        <Nav.Link href='/'><FontAwesomeIcon icon={faHome} size = '2x' /></Nav.Link>
  </Fragment>
  );

  //  // if user is logged in
  //  const loggedIn = (
  //   <Fragment>
  //     <Nav.Link href="/">Dashboard</Nav.Link>
  //     <Nav.Link href="/#!">{auth.email}</Nav.Link>
  //     <Nav.Link href="/#!" onClick={(e) => logOut(encodeURIComponent)}>
  //       Logout
  //     </Nav.Link>
  //   </Fragment>
  // );

  // // if user is logged Out
  // const loggedOut = (
  //   <Fragment>
  //     <Nav.Link href="/login">Login</Nav.Link>
  //     <Nav.Link href="/register">Register</Nav.Link>
  //   </Fragment>
  // );

  return (
    <Styles>
      <Navbar expand="lg">   
        <Navbar.Brand href="/">StockTips <FontAwesomeIcon icon= {faCommentDollar}/></Navbar.Brand>
        <Navbar.Toggle aria-controls='basic-navbar-nav' />
        <Navbar.Collapse id='basic-navbar-nav'>
          <Nav className='ml-auto'>    
            {auth.uid !== undefined ? loggedIn : loggedOut}
          </Nav>
        </Navbar.Collapse>                  
      </Navbar>
    </Styles>
    
  );
};

const enhance = compose(
    withFirestore,
    connect((state) => ({
      auth: state.firebase.auth,
      profile: state.firebase.profile,
    }))
  );
  
  export default enhance(AppNavBar);
