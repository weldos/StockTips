// This file handles the the routing for all our pages to join our front end components with our backend routes. 

// Bring in required packages
const express = require('express');
const request = require('request');
require('dotenv').config();


//init App
const app = express();

// Require Routes
const newsletterRoutes = require('./routes/newsletter');
const statusRoutes = require('./routes/status');
const emailRoutes = require('./routes/email');
const smsRoutes = require('./routes/sms')

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// Use Routes
app.use('/signup', newsletterRoutes)
app.use('/status', statusRoutes)
app.use('/contact', emailRoutes)
app.use('/sms', smsRoutes)


//Port server is being hosted on
const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`Server started on port: ${PORT}`));