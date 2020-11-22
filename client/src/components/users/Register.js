// This file handles the Register component that handle a user registration


//Bring in required modules/packages
import React, { Fragment, useState } from 'react';
import { useHistory } from "react-router-dom";
//import axios from 'axios';
import { Form, Button } from 'react-bootstrap'
import styled from 'styled-components';
import { v4 as uuidv4 } from 'uuid';

//Font Awesome Icons
import { faAt, faSignature, faKey, faPhone } from '@fortawesome/free-solid-svg-icons'; 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

// Redux Imports
import { compose } from "redux";
import {
  withFirestore,
  useFirestoreConnect,
  useFirestore,
} from "react-redux-firebase";


//Styles
const Styles = styled.div`
    .form-group{
        color: lightgreen;
    }
`
const H2 = styled.h2`
    font-size: 2.5rem;
    color: lightgreen;
    font-weight: bold;
`;

 
//Register class that handles the states
const Register = () => {
  
  const UUID = uuidv4();

  //Set state for form
  const [userDetails, setUserDetails ] = useState({
    userId: UUID,
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: ''
  });


   // Add in database config and listeners
  const firestore = useFirestore();
  useFirestoreConnect("users");
  const history = useHistory();


   //Deconstructing the state
  const { firstName, lastName, email, phone, password } = userDetails;

//function to change the state to input data
  const onChange = e => setUserDetails(
    { ...userDetails, [e.target.name]: e.target.value }
  );

//function to clear the state
  const clearState = e => setUserDetails({
          firstName: '',
          lastName: '',
          email: '',
          phone: '',
          password: ''
          });


const onSubmit = (e) => {
  e.preventDefault();
  // console.log("Submit Clicked");
  // console.log(clientDetails);
  const newClient = userDetails;

  // add the new client to the database
  firestore
    .collection("users")
    .add(newClient)
    .then(() => console.log("User added"));

  //redirect user back to the dashboard after adding a new client
  history.push("/users");
};

    

  return (
    <Fragment>
      <Styles className="App">
      <H2>Register!</H2>
              <p className="lead">Please use this form to register with us as a user. We would love to have you onboard! </p>
          
          <Form onSubmit={e => onSubmit(e)}>
            <Form.Group controlId="firstName">
              <Form.Label for="firstName"><FontAwesomeIcon icon= {faSignature}/>{' '}First Name:</Form.Label>
              <Form.Control 
                type="text" 
                placeholder="Enter First Name" 
                value={firstName}
                name="firstName" 
                onChange={e => onChange(e)} 
              />
            </Form.Group>

            <Form.Group controlId="lastName">
              <Form.Label for="lastName"><FontAwesomeIcon icon= {faSignature}/>{' '}Last Name:</Form.Label>
              <Form.Control 
                type="text" 
                placeholder="Enter Last Name" 
                value={lastName}
                name="lastName" 
                onChange={e => onChange(e)} 
              />
            </Form.Group>

            <Form.Group controlId="email">
              <Form.Label for="email"><FontAwesomeIcon icon= {faAt}/>{' '}Email:</Form.Label>
              <Form.Control 
                type="email" 
                placeholder="Enter Email"
                //pattern="[a-zA-Z0-9_\.\+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-\.]+" 
                name="email"
                value={email} 
                onChange={e => onChange(e)} 
              />
            </Form.Group>

            <Form.Group controlId="phone">
            <Form.Label for="phone"><FontAwesomeIcon icon= {faPhone}/>{' '}Phone:</Form.Label>
              <Form.Control
                type="tel"
                pattern="[0-9]{10}"
                placeholder="Enter your phone number"
                name="phone"
                value={phone}
                onChange={(e) => onChange(e)}
              />
            </Form.Group>

            <Form.Group controlId="password">
              <Form.Label for="password"><FontAwesomeIcon icon= {faKey}/>{' '}Password:</Form.Label>
              <Form.Control 
                type="password" 
                name="password" 
                value={password}
                placeholder="Enter password"  
                onChange={e => onChange(e)} 
              />
            </Form.Group>

            <Button variant="success" type="submit">Submit</Button>
            {" "}
            <Button onClick={clearState} variant="danger" type="reset" value="Reset">Clear</Button>
          
          </Form>
          
      </Styles>
    </Fragment>
  );
}

const enhance = compose(withFirestore);

export default enhance(Register);