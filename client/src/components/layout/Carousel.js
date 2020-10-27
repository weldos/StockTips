// This file handles the image carousel component for the website hosted in /Home

//Bring in required modules/packages
import React from 'react'
import {Carousel} from 'react-bootstrap'
import styled from 'styled-components';

//Image Assests
import CryptoBitcoin from '../../assets/images/bitcoin.jpg';
import FtseIphone from '../../assets/images/FTSE_iphone.jpg';
import Wallst from '../../assets/images/wallst.jpg';

//Font Awesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBitcoin } from '@fortawesome/free-brands-svg-icons'; 


//Styles
const Styles = styled.div`
     .image{
        width: 70%;
        height: 50%;
        display: block;
        margin-left: auto;
        margin-right: auto;
         
     } 
     .redText{
        color: red;
        -webkit-text-stroke: red 1px;
     } 
 
`


const imgCarousel = () => {
    return (
        <Styles>
        <Carousel>
            <Carousel.Item>
                <a
                href="/bitcoin">
                <img
                className="image"
                src={CryptoBitcoin}
                alt="Bitcoins"
                />
                </a>
                <Carousel.Caption>
                <h3>Bitcoin Boom <FontAwesomeIcon icon={faBitcoin} /> </h3>
                <p>Is the cryptocurrency market set for another major spike.</p>
                </Carousel.Caption>
            </Carousel.Item>

            <Carousel.Item>
                <a
                href="/MobileTrading">
                <img
                className="image"
                src={FtseIphone}
                alt="Mobile Phone FTSE chart"
                />
                </a>

                <Carousel.Caption>
                <h3>An insight into Mobile Trading</h3>
                <p> All the tools you will need in the palm of your hand to pick apart the markets and come out on top</p>
                </Carousel.Caption>
            </Carousel.Item>

            <Carousel.Item>
                <a
                href="/wallst">
                <img
                className="image"
                src={Wallst}
                alt="Wall Sreet"
                />
                </a>
                <Carousel.Caption>
                <h3 className="redText">Wall St: Forward via the past</h3>
                <p className="redText">A look into the history of Wall St and how the past is shaping the future</p>
                </Carousel.Caption>
            </Carousel.Item>

        </Carousel>
        </Styles>
    )
}

export default imgCarousel
