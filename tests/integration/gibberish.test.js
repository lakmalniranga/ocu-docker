const request = require('supertest');
const faker = require('faker');
const httpStatus = require('http-status');
const app = require('../../src/app');
const setupTestDB = require('../utils/setupTestDB');
const { Gibberish } = require('../../src/models');
const { stringToAppend } = require('../../src/config/config');

setupTestDB();

describe('Gibberish routes', () => {
  describe('POST /v1/gibberish', () => {
    let sampleRequest;
    beforeEach(() => {
      sampleRequest = { gibberish: faker.random.words() };
    });

    test('should return 201 and successfully create new gibberish if data is ok', async () => {
      const res = await request(app).post('/v1/gibberish').send(sampleRequest).expect(httpStatus.CREATED);

      const expectedResponse = {
        original: sampleRequest.gibberish,
        modified: sampleRequest.gibberish + stringToAppend,
      };

      expect(res.body).toEqual({ ...expectedResponse, id: expect.anything() });

      const dbGibberish = await Gibberish.findById(res.body.id);
      expect(dbGibberish).toBeDefined();
      expect(dbGibberish).toMatchObject({ ...expectedResponse, createdAt: expect.anything() });
    });

    test('should return 400 error if gibberish is invalid or empty', async () => {
      await request(app).post('/v1/gibberish').send({ gibberish: '' }).expect(httpStatus.BAD_REQUEST);
    });
  });
});
