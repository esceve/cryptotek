const mongoose = require("mongoose");
const axios = require("axios");
const { Guild, User, Account } = require("../models/index");
const express = require('express');
const router = new express.Router();

router.post('/welcome',  async (req, res) => {
        return res.status(200).send({ message: "Hello world!" });
});


module.exports = router;