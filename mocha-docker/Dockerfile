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
RUN npm install -g mocha
RUN npm install -g mochawesome

# Define working directory.
WORKDIR /project

copy ./tests/package.json /project/package.json
RUN npm i

copy ./tests/ /project/

# Define default command.
WORKDIR /project/tests/src
CMD mocha "**/*.test.js" --reporter mochawesome

