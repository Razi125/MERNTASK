const express = require("express");
const {
    referralLink
} = require("../controllers/referralController");

// Router
const router = express.Router();

router.route("/referrallink").post(referralLink);


module.exports = router;