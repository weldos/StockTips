// This file handles the Contact Form component that sends an email with a 'Name', 'Email' and 'Message'


//Bring in required modules/packages
import React, { Fragment, useState } from 'react';
import axios from 'axios';
import { Form, Button, Alert } from 'react-bootstrap'
import styled from 'styled-components';

//Font Awesome Icons
import { faAt, faSignature, faEnvelopeOpenText } from '@fortawesome/free-solid-svg-icons'; 
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
 
//Email class that handles the states
const Email = () => {

  //Set state for form
  const [formData, setFormData ] = useState({
    name: '',
    email: '',
    message: ''  
  });

   //Set state for alert
   const [show, setShow ] = useState(false);
   const [alertData, SetAlertData] = useState({
       variant: 'danger',
       alertMessage: ''
   })

   //Deconstructing the state
  const { name, email, message } = formData;
  const {variant, alertMessage} = alertData;

//function to change the state to input data
  const onChange = e => setFormData(
    { ...formData, [e.target.name]: e.target.value }
  );

//function to clear the state
  const clearState = e => setFormData({
          name: '',
          email: '',
          message: ''
          });

  //function to post        
  const onSubmit = async e => {
    e.preventDefault();
    console.log(formData);
 
      try {
        const res = await axios.post ('/contact', {
          name,
          email,
          message,
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
      <H2>Contact Form</H2>
              <p className="lead">Please use this form to contact us. We would love to hear from you! </p>

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
              <Form.Label for="name"><FontAwesomeIcon icon= {faSignature}/>{' '}Name:</Form.Label>
              <Form.Control 
                type="text" 
                placeholder="Enter Name" 
                value={name}
                name="name" 
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
              <Form.Label for="message"><FontAwesomeIcon icon= {faEnvelopeOpenText}/>{' '}Message:</Form.Label>
              <Form.Control 
                type="textarea" 
                name="message" 
                value={message}
                placeholder="Enter Message"  
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

export default Email