rem docker build -t mocha-docker .
rem docker run --rm mocha-docker

docker-compose kill && docker-compose rm -vf
docker-compose build --pull mocha
docker-compose run --rm mocha
docker-compose kill && docker-compose rm -vf