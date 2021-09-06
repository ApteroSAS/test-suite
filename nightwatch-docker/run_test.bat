rem cleaning
docker-compose kill && docker-compose rm -vf

rem start test
docker-compose build --pull nightwatch
docker-compose up -d hub node-chrome node-firefox
timeout /t 5
docker-compose run nightwatch

rem cleaning
docker-compose kill && docker-compose rm -vf