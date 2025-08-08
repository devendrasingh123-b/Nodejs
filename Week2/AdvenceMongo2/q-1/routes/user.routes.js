const express = require("express");
const router = express.Router();
const ctrl = require("../controllers/user.controller");

router.post("/add-user", ctrl.addUser);
router.post("/add-profile", ctrl.addProfile);
router.get("/profiles", ctrl.getAllProfiles);

module.exports = router;