const faker = require('faker');
const { Gibberish } = require('../../../src/models');
const { stringToAppend } = require('../../../src/config/config');

describe('Gibberish model', () => {
  let mockGibberish;

  beforeEach(() => {
    const randomText = faker.random.words();
    mockGibberish = {
      original: randomText,
      modified: randomText + stringToAppend,
    };
  });

  test('should contain original & modified values', () => {
    expect(new Gibberish(mockGibberish).toJSON()).toEqual(expect.objectContaining(mockGibberish));
  });
});
