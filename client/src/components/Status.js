// This file handles the Server Status component that allows users to check the status of the server

//Import required packages
import React, {useState} from 'react';
import styled from 'styled-components';
import axios from 'axios';
import {Button} from 'react-bootstrap';

//Styles
const Styles = styled.div`
    background-color: black;
    color: White;
    font-size: 2rem;
    font-weight: bold;
    padding: 1rem;
    margin: 1rem;
    text-align: center; 
` 
const ServerMessage = styled.h2`
    color: lightgreen;
    font-size: 3rem;
`

const H3 = styled.h3`
    color: lightgreen;
    font-size: 2rem;
`

const Status = () => {
    const [serverStatus, setServerStatus] = useState({
        message: ''
    });

    //Function to get status of server
    const getServerStatus = async () => {
        console.log('getServerStatus')
        try {
            const res = await axios.get('/status');
            console.log(res)
            setServerStatus({message: res.data});
        } catch (error){
            if (error.response.status === 500)
            {
                setServerStatus({message:'Whoops! 🤬🤬 Looks like someone unplugged the server,  We will send someone to plug it back in shortly. Thankyou for your patience'});
            } else {
                setServerStatus({message: 'Unexpected error!!'});
            }
        }
    };


    return (
        <Styles>
            <div>
                <H3>Server Status</H3>
                <p className="lead">Check to see if our server is running!</p>
                    <Button variant="primary" onClick={() => getServerStatus()}>
                        Check Server Status
                    </Button>
                <br />
                <br />
                <ServerMessage> {serverStatus.message} </ServerMessage>
            </div>
        </Styles>
    )
}

export default Status
