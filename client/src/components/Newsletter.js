// This file handles the Newsletter signup form component that takes a 'firstName', 'lastName' and 'email' and adds those details to an audience in mailchimp

//Import required packages
import React, { Fragment, useState } from 'react'
import { Form, Button, Alert } from 'react-bootstrap'
import axios from 'axios'
import styled from 'styled-components';

//FontAwesome Icons
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMailchimp} from '@fortawesome/free-brands-svg-icons'; 
import {faAt, faSignature} from '@fortawesome/free-solid-svg-icons'

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

export const Newsletter = () => {
    // Set state for the form
    const[ formData, setFormData ] = useState({
        firstName: '',
        lastName: '',
        email: ''
    });

    //Set state for alert
    const [show, setShow ] = useState(false);
    const [alertData, SetAlertData] = useState({
        variant: 'danger',
        message: ''
    })

    //Deconstructing the state
    const {firstName,lastName,email} = formData;
    const {variant, message} = alertData;

    //function to change the state to inout data
    const onChange = e => setFormData({
        ...formData, [e.target.name]: e.target.value
    })

    //function to clear the state
    const clearState = e => setFormData({
        firstName: '',
        lastName: '',
        email: ''
        });
    
    //function to post
    const handleSubmit = async e => {
        e.preventDefault();
        console.log(firstName + ' ' + lastName);
        console.log(email);

        try {
            const res = await axios.post('/signup', formData);
            console.log(res);
            //SHow out alert
            setShow(true);
            // set the data for the alert
            SetAlertData({ variant:"success", message: res.data})
            clearState();
        } catch (error){
            console.log(error);
            //Show alert
            setShow(true);
            //set the data for the alert
            SetAlertData({ variant:"danger", message: error.response.data})
        }
    }


    return (
        <Fragment>
            <Styles>
            <H2>Newsletter Signup <FontAwesomeIcon icon={faMailchimp} /></H2>
            <p className="lead">Signup to our awesome Newsletter to stay connected!</p>

            {
                show === true ? 
                (
                    <Alert className='mt-5' variant={variant} onClose={() => setShow(false)} dismissible>
                        <Alert.Heading>
                            {variant === 'success' ? 'Success!' : 'Oops....Something went wrong!'}
                            <p>
                                {message}
                            </p>
                        </Alert.Heading>
                    </Alert>
                ) :null
            }

            <Form onSubmit={handleSubmit}>
                <Form.Group controlId="firstName">
                    <Form.Label><FontAwesomeIcon icon= {faSignature}/>{' '}First Name:</Form.Label>
                    <Form.Control 
                        type="text" 
                        placeholder="Enter First Name" 
                        name="firstName"
                        value={firstName}
                        onChange={e => onChange(e)}
                    />
                </Form.Group>

                <Form.Group controlId="lastName">
                    <Form.Label><FontAwesomeIcon icon= {faSignature}/>{' '}Last Name:</Form.Label>
                    <Form.Control 
                        type="text" 
                        placeholder="Enter Last Name" 
                        name="lastName"
                        value={lastName}
                        onChange={e => onChange(e)}
                    />
                </Form.Group>

                <Form.Group controlId="email">
                    <Form.Label><FontAwesomeIcon icon= {faAt}/>{' '}Email:</Form.Label>
                    <Form.Control 
                        type="email" 
                        placeholder="Enter Email" 
                        name="email"
                        value={email}
                        onChange={e => onChange(e)}
                    />
                </Form.Group>
       
                <Button variant="success" type="submit">Submit</Button>
                {" "}
                <Button onClick={clearState} variant="danger" type="reset" value="Reset">Clear</Button>

            </Form>
            </Styles>
        </Fragment>
    )
}

export default Newsletter


