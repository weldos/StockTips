// Newsletter route that contains the signup route for mailchimp service

// Bring in required modules
const express = require('express');
const request = require('request');

// Initialise express router
const router = express.Router();


// Signup Post Route
router.post('/', (req, res) => {
    console.log(req.body);
    //res.send(req.body);
    const { firstName, lastName, email } = req.body;
    console.log(firstName + ' ' + lastName );
    console.log(email);

    // check to make sure that fields are filled
    if (!firstName || !lastName || !email){
      res.status(400).send('Please ensure that all fields are filled out correctly');
      return; // header message
    }
    
    // Construct req data 
    const data = {
      members: [
        { 
          email_address: email,
          status: 'subscribed',
          merge_fields: {
            FNAME: firstName,
            LNAME: lastName,
          }
        }
      ]
    }
    
    console.log(data);
    const postData = JSON.stringify(data);
   
    
    //our mailchimp api url and authorisation code
    const options = {
      url: 'https://us8.api.mailchimp.com/3.0/lists/bfc7545846',
      method: 'POST',
      headers: {
        Authorization: 'auth 4bbe9258a79f3d1a54581e38cffe1888-us8'
      },
      body: postData
    }
    
    //status messages for alert
    request(options, (err, response, body) => {
      console.log(response.statusCode);
      console.log(response.statusMessage);
      if(err) {
        console.log(err);
        res.status(400).send('An error has occurred')
      } else {
        // console.log(response);
        if(response.statusCode === 200 ) {
          res.status(200).send('You have successfully signed up to our newsletter')
        } else {
          console.log(err);
          res.status(500).send('A server error has occurred');
        }
      }
    } );
    
  });

  //export router
  module.exports = router;