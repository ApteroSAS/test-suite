
docker-compose kill && docker-compose rm -vf
docker-compose build --pull nightwatch
docker-compose up -d web hub node-chrome node-firefox
timeout /t 5
docker-compose run --rm nightwatch