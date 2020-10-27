// This file handles the Register component that handle a user registration


//Bring in required modules/packages
import React, { Fragment, useState } from 'react';
import axios from 'axios';
import { Form, Button, Alert } from 'react-bootstrap'
import styled from 'styled-components';

//Font Awesome Icons
import { faAt, faSignature, faKey } from '@fortawesome/free-solid-svg-icons'; 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


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

  //Set state for form
  const [formData, setFormData ] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: ''  
  });

   //Set state for alert
   const [show, setShow ] = useState(false);
   const [alertData, SetAlertData] = useState({
       variant: 'danger',
       alertMessage: ''
   })

   //Deconstructing the state
  const { firstName, lastName, email, password } = formData;
  const {variant, alertMessage} = alertData;

//function to change the state to input data
  const onChange = e => setFormData(
    { ...formData, [e.target.name]: e.target.value }
  );

//function to clear the state
  const clearState = e => setFormData({
          firstName: '',
          lastName: '',
          email: '',
          password: ''
          });

  //function to post        
  const onSubmit = async e => {
    e.preventDefault();
    console.log(formData);
 
      try {
        const res = await axios.post ('/register', {
          firstName,
          lastName,
          email,
          password,
        });
       
        //Show out alert
        setShow(true);
        // set the data for the alert
        SetAlertData({ variant:"success", alertMessage: res.data})
        console.log(res);
        //clearing the state
        clearState();
        console.log("clearing state...")
    } catch (error){
        console.log(error);
        //Show alert
        setShow(true);
        //set the data for the alert
        SetAlertData({ variant:"danger", alertMessage: error.response.data})
    }
}
    

  return (
    <Fragment>
      <Styles className="App">
      <H2>Register!</H2>
              <p className="lead">Please use this form to register with us as a user. We would love to have you onboard! </p>

              {
                show === true ? 
                (
                    <Alert className='mt-5' variant={variant} onClose={() => setShow(false)} dismissible>
                        <Alert.Heading>
                            {variant === 'success' ? 'Success!' : 'Oops....Something went wrong!'}
                            <p>
                                {alertMessage}
                            </p>
                        </Alert.Heading>
                    </Alert>
                ) :null
            }
      
          
          <Form onSubmit={e => onSubmit(e)}>
            <Form.Group>
              <Form.Label for="firstName"><FontAwesomeIcon icon= {faSignature}/>{' '}First Name:</Form.Label>
              <Form.Control 
                type="text" 
                placeholder="Enter First Name" 
                value={firstName}
                name="firstName" 
                onChange={e => onChange(e)} 
              />
            </Form.Group>

            <Form.Group>
              <Form.Label for="lastName"><FontAwesomeIcon icon= {faSignature}/>{' '}Last Name:</Form.Label>
              <Form.Control 
                type="text" 
                placeholder="Enter Last Name" 
                value={lastName}
                name="lastName" 
                onChange={e => onChange(e)} 
              />
            </Form.Group>

            <Form.Group>
              <Form.Label for="email"><FontAwesomeIcon icon= {faAt}/>{' '}Email:</Form.Label>
              <Form.Control 
                type="email" 
                placeholder="Enter Email" 
                name="email"
                value={email} 
                onChange={e => onChange(e)} 
              />
            </Form.Group>

            <Form.Group>
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

export default Register