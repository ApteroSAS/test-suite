rem docker build -t mocha-docker .
rem docker run --rm mocha-docker

docker-compose -f docker-compose-nightwatch.yml kill
docker-compose -f docker-compose-nightwatch.yml rm -vf

docker-compose -f docker-compose-nightwatch.yml build --pull mocha
docker-compose -f docker-compose-nightwatch.yml run --rm mocha

docker-compose -f docker-compose-nightwatch.yml kill
docker-compose -f docker-compose-nightwatch.yml rm -vf