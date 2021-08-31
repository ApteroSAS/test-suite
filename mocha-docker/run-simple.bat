rem docker build -t mocha-docker .
rem docker run --env-file ./loadero.env mocha-docker mocha /project/src/simple-test/*.test.js --reporter mochawesome

docker-compose -f docker-compose-simple.yml kill
docker-compose -f docker-compose-simple.yml rm -vf

docker-compose -f docker-compose-simple.yml build --pull mocha
docker-compose -f docker-compose-simple.yml run --rm mocha

docker-compose -f docker-compose-simple.yml kill
docker-compose -f docker-compose-simple.yml rm -vf