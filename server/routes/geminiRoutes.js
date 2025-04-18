const express = require("express");
const router = express.Router();
const geminiController = require("../controllers/geminiController");

router.route("/generate-itinerary").post(geminiController.generateItinerary);

module.exports = router;
