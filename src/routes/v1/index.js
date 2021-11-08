const express = require('express');
const gibberishRoute = require('./gibberish.route');

const router = express.Router();

router.use('/gibberish', gibberishRoute);

module.exports = router;
