// SMS route that contains the signup route for the nexmo sms service

//Bring in required modules
const express = require('express');
const Nexmo = require('nexmo');

// Initialise express router
const router = express.Router();


//Init Nexmo
const nexmo = new Nexmo({
    apiKey: 'fe959eb0',
    apiSecret: 'u3EFKrcmsazsT7v0'
}, {debug: true});


// Signup post route
router.post('/', (req, res) => {    
    console.log(req.body);
    const toNumber = process.env.PHONE

    //destructure body
    const { name, number, message } = req.body;


    //Field Validation alert message
    if (!name || !number|| !message){
        res.status(400).send('Please ensure that all fields are filled out correctly');
        return; // header message
      }

    //defining text 
    const text = name + " " + message

    //Nexmo send SMS function
    nexmo.message.sendSms(
        
        //SMS Data
         number, toNumber, text, {type: 'unicode'},
        (error, responseData) => {
            if(error){
                res.status(500).send('An Error has occurred');
                return console.log('Errors: ', error);
            } else {
                console.log("Message sent successfuly");
                // Get data from response
                const data = {
                    id: responseData.messages[0]['message-id'],
                    number: responseData.messages[0]['to']
                }
                console.log(data)
                res.status(200).send('The SMS was successfuly sent')

                
            }
        }
    )
});

module.exports = router;