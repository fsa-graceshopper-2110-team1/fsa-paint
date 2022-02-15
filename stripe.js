const dotenv = require('dotenv').config().parsed
const stripeAPI = require('stripe')(dotenv.SECRET_KEY);


module.exports = stripeAPI
