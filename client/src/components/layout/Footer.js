// This file handles the footer component for the website

//Bring in required modules/packages
import React from 'react'
import styled from 'styled-components';


//Fontawesome Icons
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCopyright } from '@fortawesome/free-regular-svg-icons'; 

//Styles
const Styles = styled.footer`
      color: red;
      padding-top: .5rem;
      padding-bottom: .5rem;
      width: 100%;
      height: 40px;
      text-align: center;
      font-size: 12px;
`

const Footer = () => {
    return (
        <Styles > 
            <br />
            <p> <FontAwesomeIcon icon={faCopyright} /> {new Date().getFullYear()} StockTips App - Developed by Nicholas Weldon </p>
        </Styles>
    )
}

export default Footer
