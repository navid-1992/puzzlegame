const express = require("express");
const { register, login, addScore } = require("../functions");

const router = express.Router();

router.post("/register", register);

router.post("/login", login);

router.post("/updateScore", addScore);

module.exports = router;
