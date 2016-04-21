"use strict";

const express = require('express');

var router = express.Router();

router.get('/', function (req, res) {
  res.end('ok');
});

module.exports = router;