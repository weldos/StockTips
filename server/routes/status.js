// This file handles the Server Status route that allows users to check the status of the server

//Bring in required modules
const express = require('express');
const router = express.Router();

// //FontAwesome Icon
// import { faThumbsUp } from '@fortawesome/free-solid-svg-icons'; 
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
//{faThumbsUp} 


//Status Route
router.get('/', (req, res) => {
    res.send('🥳 Our server is up and running! 🥳');
    
  })

//export router
module.exports = router;


