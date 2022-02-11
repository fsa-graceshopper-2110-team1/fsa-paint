const createCheckoutSession = require("./checkout");

const router = require("express").Router();
module.exports = router;


router.post('/',createCheckoutSession)

