# RESTful API Server - Interview

This simple application has been developed to showcase docker skills.

## Table of Contents

- [Setup on local](#setup-on-local)
- [Environment Variables](#environment-variables)
- [Commands](#commands)
- [API Endpoints](#api-endpoints)
- [Project Structure](#project-structure)
- [Error Handling](#error-handling)
- [Dependencies](#dependencies)

## Environment Variables

The environment variables can be found and modified in the `.env` file. They come with these default values:

```bash
# Port number
PORT=7070

# URL of the Mongo DB
MONGODB_URL=mongodb://127.0.0.1:27017/ocu-challenge

# The string which needs to be appened to given text/string by user
STRING_TO_APPEND=bar
```

## Setup on local

Install the dependencies:

```bash
yarn install
```

Set the environment variables:

```bash
cp .env.example .env

# open .env and modify the environment variables (if needed)
```

## Commands

Running locally:

```bash
yarn dev
```

Running in production:

```bash
yarn start
```

Testing:

```bash
# run all tests
yarn test

# run all tests in watch mode
yarn test:watch

# run test coverage
yarn coverage
```

Run application stack directly on docker:

```bash
# run docker container in development mode
docker-compose -f docker-compose.yml -f docker-compose.dev.yml up

# run docker container in production mode
docker-compose -f docker-compose.yml -f docker-compose.prod.yml up

# run all tests in a docker container
docker-compose -f docker-compose.yml -f docker-compose.test.yml up
```

Run application stack using NPM scripts (Optional):

```bash
# run docker container in development mode
yarn docker:dev

# run docker container in production mode
yarn docker:prod

# run all tests in a docker container
yarn docker:test
```

Linting:

```bash
# run ESLint
yarn lint

# fix ESLint errors
yarn lint:fix

# run prettier
yarn prettier

# fix prettier errors
yarn prettier:fix
```

## API Endpoints

`POST /v1/gibberish` - create a record on database (in gibberish collection)

**Request Body**

```json
{
  "gibberish": "hello"
}
```

**Response Body**

```json
{
  "id": "618977fbf4fcbd40430ed265",
  "original": "hello",
  "modified": "hellobar"
}
```

**Example CURL**

```bash
curl --location --request POST 'http://localhost:7070/v1/gibberish' \
--header 'Content-Type: application/json' \
--data-raw '{
    "gibberish": "hello"
}'
```

## Project Structure

```
src\
 |--config\         # Environment variables and configuration related things
 |--controllers\    # Route controllers (controller layer)
 |--middlewares\    # Custom express middlewares
 |--models\         # Mongoose models (data layer)
 |--routes\         # Routes
 |--services\       # Business logic (service layer)
 |--utils\          # Utility classes and functions
 |--validations\    # Request data validation schemas
 |--app.js          # Express app
 |--index.js        # App entry point
```

## Error Handling

The app has a centralized error handling mechanism.

Controllers should try to catch the errors and forward them to the error handling middleware (by calling `next(error)`). For convenience, you can also wrap the controller inside the catchAsync utility wrapper, which forwards the error.

```javascript
const catchAsync = require('../utils/catchAsync');

const controller = catchAsync(async (req, res) => {
  // this error will be forwarded to the error handling middleware
  throw new Error('Something wrong happened');
});
```

The error handling middleware sends an error response, which has the following format:

```json
{
  "code": 404,
  "message": "Not found"
}
```

When running in development mode, the error response also contains the error stack.

The app has a utility ApiError class to which you can attach a response code and a message, and then throw it from anywhere (catchAsync will catch it).

## Dependencies

- **NoSQL database**: [MongoDB](https://www.mongodb.com) object data modeling using [Mongoose](https://mongoosejs.com)
- **Validation**: request data validation using [Joi](https://github.com/hapijs/joi)
- **Logging**: using [winston](https://github.com/winstonjs/winston) and [morgan](https://github.com/expressjs/morgan)
- **Testing**: unit and integration tests using [Jest](https://jestjs.io)
- **Error handling**: centralized error handling mechanism
- **Process management**: production process management using [PM2](https://pm2.keymetrics.io)
- **Dependency management**: with [Yarn](https://yarnpkg.com)
- **Environment variables**: using [dotenv](https://github.com/motdotla/dotenv) and [cross-env](https://github.com/kentcdodds/cross-env#readme)
- **Security**: set security HTTP headers using [helmet](https://helmetjs.github.io)
- **Santizing**: sanitize request data against xss and query injection
- **CORS**: Cross-Origin Resource-Sharing enabled using [cors](https://github.com/expressjs/cors)
- **Code coverage**: using [coveralls](https://coveralls.io)
- **Git hooks**: with [husky](https://github.com/typicode/husky) and [lint-staged](https://github.com/okonet/lint-staged)
- **Linting**: with [ESLint](https://eslint.org) and [Prettier](https://prettier.io)
- **Editor config**: consistent editor configuration using [EditorConfig](https://editorconfig.org)
