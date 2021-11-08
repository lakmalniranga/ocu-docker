const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const { gibberishService } = require('../services');

const createGibberish = catchAsync(async (req, res) => {
  const gibberish = await gibberishService.create(req.body);
  res.status(httpStatus.CREATED).send(gibberish);
});

module.exports = { createGibberish };
