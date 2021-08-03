FROM node

# Install Bower & Grunt
RUN npm install -g mocha

# Define working directory.
WORKDIR /project

# Define default command.
CMD mocha "/project/src/**/*.test.js"

copy ./tests/package.json /project/package.json
RUN npm i

copy ./tests/ /project/

