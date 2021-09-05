FROM node

##################
##install docker (for docker in docker)
##################
RUN apt install -y curl
RUN curl -fsSL https://get.docker.com -o get-docker.sh
RUN sh get-docker.sh

##################
##install docker compose
##################
RUN apt install -y python3-pip
RUN pip3 install docker-compose

##################
# Install Bower & Grunt
##################
RUN npm i -g mocha
RUN npm i -g mochawesome
RUN npm i -g ts-node

# Define working directory.
WORKDIR /project

copy ./tests/package.json /project/package.json
RUN npm i

copy ./tests/ /project/
copy ./loadero.env /project/tests/src/loadero.env

# Define default command.
WORKDIR /project/tests/src
CMD mocha "**/*.test.js" --reporter mochawesome

