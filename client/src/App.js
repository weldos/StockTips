// This is an App for my business

//importing react components and installed modules
import React from 'react';
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
import UserDetails from './components/users/UserDetails'
import EditUser from './components/users/EditUser'
import Login from './components/auth/Login'

// Import Layouts
import Layout from './components/layout/Layout';
import AppNavBar from "./components/layout/AppNavBar";
import Jumbotron from './components/layout/Jumbotron';
import Footer from './components/layout/Footer';

import Customer from './components/customer/CustomerData'
//Styles
const Styles = styled.div`
      background-color: black;
      
`


function App() {
  return (
    <Provider store={store}>
      <ReactReduxFirebaseProvider {...rrfProps}>
        <Router>
          <AppNavBar />
          <Jumbotron />
          <Styles>
          <Layout>  
              <Container>
                <Switch>
                  <Route exact path='/' component={Home} />
                  <Route exact path='/signup' component={Newsletter} />
                  <Route exact path='/status' component={Status} />
                  <Route exact path='/contact' component={Email} />
                  <Route exact path='/text' component={Sms} />
                  <Route exact path='/users' component={Users} />
                  <Route exact path='/users/register' component={Register} />
                  <Route exact path="/users/:id" component={UserDetails} />
                  <Route exact path="/users/edit/:id" component={EditUser} />
                  <Route exact path="/login" component={Login} />
                  <Route exact path='/customers' component={Customer}/>
                  <Route component={NotFound} />
                </Switch>
              </Container>
          </Layout>
          <br />
          <br />
          <Footer /> 
          </Styles>
          </Router>
      </ReactReduxFirebaseProvider>
    </Provider>
    
  );
}

export default App;
