// This file handles the Contact Form route that sends an email with a 'Name', 'Email' and 'Message' through nodemail

// Import required Node modules
const express = require('express');
const nodemailer = require('nodemailer');


// Initialise express router
const router = express.Router();

//Post Route
router.post('/', (req, res) => {
    console.log(req.body);

    const { name, email, message } = req.body;
    if (!name || !email|| !message){
        res.status(400).send('Please ensure that all fields are filled out correctly');
        return; // header message
      }

    const output = `
    <p> You have a new contact request!</p>
    <h3>Contact Details</h3>
    <ul>
        <li>Name: ${req.body.name}</li>
        <li>Email: ${req.body.email}</li>
    </ul>
    <h3> Message Text : </h3>
    <p>${req.body.message}</p>
    `;

    

    //Step 1 - Create Transport Object
   
    let transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com', 
        port: 587,
        secure: false,
        auth: {
            user: process.env.EMAIL,
            pass: process.env.PASS      // needs to match .env file
        },
        tls: {
            rejectUnauthorized: false
        }

    })


    //Step 2 - Create Mail Options
    let mailOptions = {
        from: process.env.EMAIL, //senders adress
        to: process.env.EMAILTO, //recievers address
        subject: 'Node contact request',
        html: output
    }

    
    //Step 3 - Send Email Message
    transporter.sendMail(mailOptions, (error, info) => {
        console.log('sending mail...');
        if(error){
            res.status(500).send('An Error has occurred')
            return console.log('Errors: ', error);
        } else {
            console.log("Message sent: %s", info.messageId);
            console.log('Email sent. SUCCESS!');
            res.status(200).send('Your Email was successfuly sent!')
        }
    })

});



module.exports = router;