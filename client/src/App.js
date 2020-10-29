// This is an App for my business

//importing react components and installed modules
import React, { Fragment } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import styled from 'styled-components';
import { Container } from "react-bootstrap";

// Redux Imports
import { Provider } from "react-redux";
import { ReactReduxFirebaseProvider } from "react-redux-firebase";
import store from "./store";
import rrfProps from "./config/rrfProps";

// Import Custom Components
import Home from './components/Home'
import NotFound from './components/NotFound';
import Status from './components/Status';
import Newsletter from './components/Newsletter';
import Email from './components/Email';
import Sms from './components/Sms';
import Register from './components/users/Register';
import Users from './components/users/Users'


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
    <Provider store={store}>
      <ReactReduxFirebaseProvider {...rrfProps}>
        <Fragment>
        <Router>
          <NavigationBar />
          <Jumbotron />
          <Styles>
          <Layout>  
              <Container>
                <Switch>
                  <Route exact path='/' component={Home}></Route>
                  <Route exact path='/signup' component={Newsletter}></Route>
                  <Route exact path='/status' component={Status}></Route>
                  <Route exact path='/contact' component={Email}></Route>
                  <Route exact path='/text' component={Sms}></Route>
                  <Route exact path='/users' component={Users}></Route>
                  <Route exact path='/users/register' component={Register}></Route>
                  <Route component={NotFound}></Route>
                </Switch>
              </Container>
          </Layout>
          <br />
          <br />
          <Footer /> 
          </Styles>
          </Router>
        </Fragment>
    </ReactReduxFirebaseProvider>
    </Provider>
    
  );
}

export default App;
