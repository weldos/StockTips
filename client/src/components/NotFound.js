// This file handles the Not Found component that displays a not found page when a user hits a route that dosent exist

//Import required packages
import React from 'react';
import styled from 'styled-components';

//FontAwesome Icons
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';
import { faCompass } from '@fortawesome/free-regular-svg-icons';

//Go back function
function goBack() {
    window.history.back();
}

//styling
const Style = styled.div`
    .bodyText{
        text-align: center;
    }
     
    .h2{
    font-size: 4rem;
    color: red;
    text-align: center;
    }

    .h3{
    font-size: 3rem;
    color: red;
    text-align: center;
    }

    .p {
    font-size: 1.2rem;
    text-align: center;
    } 

    .link {
        color: red;
        text-align: center;
        display: block;

        &:hover {
            color: lightgreen;
            transform: scale(1.15);
            padding-bottom: 2rem;
            display: block;
            
        }
    }
`





const NotFound = () => {
    return (
        <Style className="bodyText">
            <h2 className="h2"><FontAwesomeIcon icon= {faExclamationTriangle}/>OOPS...</h2>
            <h3 className="h3"> PAGE FAILED </h3>
            <p className="p"> You have taken a wrong turn! </p>
            <br />
            <i className="link"><FontAwesomeIcon icon={faCompass} spin size = '8x' onClick={goBack} /></i>
            <p className="p"> Click the compass to go back to safety</p>
            
        </Style>
    )
}

export default NotFound
