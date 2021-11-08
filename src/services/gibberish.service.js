const { Gibberish } = require('../models');
const { stringToAppend } = require('../config/config');

/**
 * Create a document on db (gibberish collection) with original and modified values
 * @param {String} gibberish
 * @returns {Promise<Gibberish>}
 */
const create = async ({ gibberish: original }) => {
  return Gibberish.create({ original, modified: original + stringToAppend });
};

module.exports = { create };
