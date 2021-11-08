FROM node:14-alpine

RUN mkdir -p /usr/src/node-app && chown -R node:node /usr/src/node-app

WORKDIR /usr/src/node-app

# Cache and install dependencies
COPY package.json yarn.lock ./

# Switch to node user
USER node

# Install dependencies without any locks
RUN yarn install --pure-lockfile

# Copy source files
COPY --chown=node:node . .
