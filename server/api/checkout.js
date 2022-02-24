const stripeAPI = require("../../stripe");
require("dotenv").config();
const router = require("express").Router();

async function createCheckoutSession(req, res) {
  //this is going to be the heroku URL once we deploy
  const domainUrl = process.env.WEB_APP_URL;
  const { line_items, customer_email } = req.body;
  //check req body has line items and email
  if (!line_items || !customer_email) {
    return res
      .status(400)
      .json({ error: "missing required session paramaters" });
  }

  let session;

  try {
    session = await stripeAPI.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      line_items,
      customer_email,
      success_url: `${process.env.WEB_APP_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.WEB_APP_URL}/cart`,
    });
    res.status(200).json({ sessionID: session.id });
  } catch (error) {
    console.log(error);
    res
      .status(400)
      .json({ error: "an error occured, unable to create session" });
  }
}

module.exports = createCheckoutSession;
