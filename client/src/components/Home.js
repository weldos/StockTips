// This file handles the Home or '/' component for the website 

//Bring in required modules/packages
import React from 'react'
import styled from 'styled-components';
import Carousel from './layout/Carousel'

//TradingView Widget
import TradingViewWidget from 'react-tradingview-widget'; 

//FontAwesome Icon
import { faCommentDollar} from '@fortawesome/free-solid-svg-icons'; 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';



//Styles
const Styles = styled.div`

.textCenter{
    text-align: center;
}

.h1{
    font-weight: bold;
    font-size: 2.7rem;
    color: lightgreen;
    
}

.p{
    font-size: 1.5rem;
    text-align: center;
    
}

.green{
    color: lightgreen;
}

.gray{
    color: grey;
}

.TradingViewWidget{
    align-items: center;
}

.greenLink{
    color: lightgreen;
    &:hover {
            font-style: Bold;
            text-decoration: underline;
            
            
        }
}

`;

const Home = () => {
    return (
        <Styles>
            <div className="textCenter">
            <h1 className='h1'>Welcome to <strong>StockTips </strong><FontAwesomeIcon icon={faCommentDollar} /> </h1>
            <br />
            <p className='p'>Get the all latest <strong>News, Updates</strong> and <strong>Professional advice </strong> you will ever need for all things markets to stay ahead of the game... All for the low price of <strong>FREE!</strong> </p>
            <br />
            <br />
            <Carousel />
            <br />
            <br />
            <br />
            <br />
            <h1> Market of the week: </h1>  
            <h2><a className="greenLink" href="https://www.tradingview.com/symbols/ASX-XJO/" target="_blank" rel="noopener noreferrer">ASX 200 ( Australian top 200 index) </a></h2>
            <p className="gray"> Feel free to make use of our Trading View Stock Chart to search for your desired Chart</p>
            <TradingViewWidget expand="lg"
                // Settings
                symbol="XJO"  
                theme="DARK" 
                timezone="Australia/Sydney" 
                range="YTD" 
                height="600"
                width="900" 
                show_popup_button="true"
                withdateranges="true"
            /> 
            </div>
        </Styles>
    )
}

export default Home


/* Notes
- TradingView Widget default settings can also be changed via node_modules\react-tradingview-widget\dist\index.js -> defaultProps

*/