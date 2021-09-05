FROM node:14.17.4

ENV HOME /home
ENV APP_DIR $HOME/docker/app

# create directories
RUN mkdir -p $APP_DIR
RUN mkdir -p $APP_DIR/tests_output/screenshots

WORKDIR $APP_DIR

COPY package.json package-lock.json ./

# `npm ci` actually enforces the package-lock and is way faster!
# See https://docs.npmjs.com/cli/ci.html
RUN npm ci --ignore-scripts --unsafe-perm --loglevel warn --no-progress || \
    npm install --ignore-scripts --unsafe-perm --loglevel warn --no-progress

# add rest of repo to image (doing this after installing npm dependencies
# makes for a faster development workflow because only a change to package*.json
# will force docker to rebuild the "npm install" layer above)
COPY . ./

ENV NODE_ENV=test
ENV TESTS_DIRECTORY=tests
ENV PATH="${PATH}:${APP_DIR}/node_modules/nightwatch/bin"