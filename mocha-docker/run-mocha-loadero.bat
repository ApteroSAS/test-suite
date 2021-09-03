docker-compose -f docker-compose-loadero.yml kill
docker-compose -f docker-compose-loadero.yml rm -vf

rem docker-compose -f docker-compose-loadero.yml build --no-cache --pull mocha
docker-compose -f docker-compose-loadero.yml build --pull mocha
docker-compose -f docker-compose-loadero.yml --env-file loadero.env run --rm mocha

docker-compose -f docker-compose-loadero.yml kill
docker-compose -f docker-compose-loadero.yml rm -vf