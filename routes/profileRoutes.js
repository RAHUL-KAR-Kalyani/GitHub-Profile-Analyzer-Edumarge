const express = require("express");
const router = express.Router();
const { analyzeProfile, getProfiles, getSingleProfile } = require("../controllers/profileController");

router.get("/analyze/:username", analyzeProfile);
router.get("/", getProfiles);
router.get("/:username", getSingleProfile);

module.exports = router;