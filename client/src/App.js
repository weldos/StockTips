// This is an App for my business

//importing react components and installed modules
import React, { Fragment } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import styled from 'styled-components';

// Import Custom Components
import Home from './components/Home'
import NotFound from './components/NotFound';
import Status from './components/Status';
import Newsletter from './components/Newsletter';
import Email from './components/Email';
import Sms from './components/Sms';
import Register from './components/Register';


// Import Layouts
import Layout from './components/layout/Layout';
import NavigationBar from './components/layout/NavigationBar';
import Jumbotron from './components/layout/Jumbotron';
import Footer from './components/layout/Footer';


//Styles
const Styles = styled.div`
      background-color: black;
      
`


function App() {
  return (
    <Fragment>
      <NavigationBar />
      <Jumbotron />
      <Styles>
      <Layout>
        <Router>
          <Switch>
            <Route exact path='/' component={Home}></Route>
            <Route exact path='/signup' component={Newsletter}></Route>
            <Route exact path='/status' component={Status}></Route>
            <Route exact path='/contact' component={Email}></Route>
            <Route exact path='/text' component={Sms}></Route>
            <Route exact path='/register' component={Register}></Route>
            <Route component={NotFound}></Route>
          </Switch>
        </Router>
      </Layout>
      <br />
      <br />
      <Footer /> 
      </Styles>
    </Fragment>
    
  );
}

export default App;
