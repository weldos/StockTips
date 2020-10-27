// This file handles the SMS component that send a sms through nexmo. 

//import required modules
import React, {Fragment, useState} from 'react';
import {Form, Button, Alert} from 'react-bootstrap';
import axios from 'axios';
import styled from 'styled-components';

//FontAwesome Icons
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMobileAlt, faSignature, faEnvelopeOpenText  } from '@fortawesome/free-solid-svg-icons';

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

export const Sms = () => {
    // Set state for the sms
    const[ formData, setFormData ] = useState({
        name: '',
        number: '',
        message: ''
    });

     //Set state for alert
    const [show, setShow ] = useState(false);
    const [alertData, SetAlertData] = useState({
       variant: 'danger',
       alertMessage: ''
   })

    //Deconstructing the states
    const {name, number, message} = formData;
    const {variant, alertMessage} = alertData;

    //function to change the state to whatever is input
    const onChange = e => setFormData({
        ...formData, [e.target.name]: e.target.value
    })

    //function to clear the state
    const clearState = e => setFormData({
        name: '',
        number: '',
        message: ''
        });

    
    //function to post
    const handleSubmit = async e => {
        e.preventDefault();
        console.log('handle Submit')
        console.log(formData)

        try{
            const res = await axios.post('/sms', formData);

            console.log(res)

            //Show out alert
            setShow(true);

            //set the data for the alert
            SetAlertData({ variant:"success", alertMessage: res.data})
            console.log(res);

            //clearing the state
            clearState();

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
            <Styles>
            <H2>SMS Contact</H2>
            <p className="lead">If email is too boring for you, Send us a message via SMS!</p>


            {/* Alert  */}
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

            {/* Form */}
                <Form onSubmit={handleSubmit}>
                    <Form.Group controlId="name">
                        <Form.Label><FontAwesomeIcon icon= {faSignature}/> Your Name</Form.Label>
                        <Form.Control 
                            type="text" 
                            placeholder="Enter your name" 
                            name="name"
                            value={name}
                            onChange={e => onChange(e)}
                        />
                    </Form.Group>
                    <Form.Group controlId="mobileNumber">
                        <Form.Label><FontAwesomeIcon icon={faMobileAlt} /> Mobile Number</Form.Label>
                        <Form.Control 
                            type="text" 
                            placeholder="Enter your mobile number" 
                            name="number"
                            value={number}
                            onChange={e => onChange(e)}
                        />
                    </Form.Group>
                    <Form.Group controlId="message">
                        <Form.Label><FontAwesomeIcon icon= {faEnvelopeOpenText}/> Message</Form.Label>
                        <Form.Control 
                            type="textarea" 
                            placeholder="Enter your message" 
                            name="message"
                            value={message}
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
};

export default Sms
