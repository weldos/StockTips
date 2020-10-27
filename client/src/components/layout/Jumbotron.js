// This file handles the Jumbotron component that sits below the navbar 

//Bring in required packages
import React from 'react';
import { Jumbotron as Jumbo } from 'react-bootstrap';
import styled from 'styled-components';



//Images
import StockMarketImage from '../../assets//images/stockTicker.jpg';


const Styles = styled.div`

.jumbo {
    background: url(${StockMarketImage}) no-repeat fixed bottom;
    background-size: cover;
    color: #efefef;
    height: 100px;
    position: relative;
    z-index: -2;
}
.overlay{
    background-color: #000;
    opacity: 0.5;
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    z-index: -1;
}

.h1{
    font-weight: bold;
}

.text{
    text-align: center;
}

.p{
    font-size: 1.6rem;
}

`;

const Jumbotron = () => {
    return (
        <Styles>
            <Jumbo fluid className='jumbo'>
                <div className='overlay'></div>
            </Jumbo>
        </Styles>
    )
}

export default Jumbotron
