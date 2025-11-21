const express = require("express");
const { applyReferral } = require("../controllers/referralController");

const router = express.Router();

router.post("/apply-referral", applyReferral);

module.exports = router;
