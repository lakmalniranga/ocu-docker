const mongoose = require('mongoose');
const { toJSON } = require('./plugins');

/**
 * I'm sorry, couldn't think of any good name for this schema :D
 *
 */
const gibberishSchema = mongoose.Schema(
  {
    original: {
      type: String,
      required: true,
    },
    modified: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
gibberishSchema.plugin(toJSON);

/**
 * @typedef Gibberish
 */
const Gibberish = mongoose.model('Gibberish', gibberishSchema);

module.exports = Gibberish;
