const path = require('path')
const express = require('express')
const cors = require('cors')
const morgan = require('morgan')
const createCheckoutSession = require('./api/checkout')
const app = express()
const stripeAPI = require("../stripe");

module.exports = app



// logging middleware
app.use(morgan('dev'))

// body parsing middleware
app.use(express.json())

//cors to allow requests from different origins
app.use(cors({origin:true}))

// auth and api routes
app.use('/auth', require('./auth'))
app.use('/api', require('./api'))

app.get('/', (req, res)=> res.sendFile(path.join(__dirname, '..', 'public/index.html')));

//stripe api checkout
app.post('/create-checkout-session',createCheckoutSession)
// app.get('/success/success', async (req, res,next) => {
//   try{
//       const session = await stripeAPI.checkout.sessions.retrieve(
//           req.query.session_id
//         );
//         const customer = await stripeAPI.customers.retrieve(session.customer);
//         res.send({ session: session, customer: customer });
//   }catch(ex){
//       next(ex)
//   }
// });
// static file-serving middleware
app.use(express.static(path.join(__dirname, '..', 'public')))

// any remaining requests with an extension (.js, .css, etc.) send 404
app.use((req, res, next) => {
  if (path.extname(req.path).length) {
    const err = new Error('Not found')
    err.status = 404
    next(err)
  } else {
    next()
  }
})

// sends index.html
app.use('*', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'public/index.html'));
})

// error handling endware
app.use((err, req, res, next) => {
  console.error(err)
  console.error(err.stack)
  res.status(err.status || 500).send(err.message || 'Internal server error.')
})
