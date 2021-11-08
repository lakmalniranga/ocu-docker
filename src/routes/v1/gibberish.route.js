const express = require('express');
const validate = require('../../middlewares/validate');
const gibberishValidation = require('../../validations/gibberish.validation');
const gibberishController = require('../../controllers/gibberish.controller');

const router = express.Router();

router.route('/').post(validate(gibberishValidation.create), gibberishController.createGibberish);

module.exports = router;
