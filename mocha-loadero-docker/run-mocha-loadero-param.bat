rem docker-compose -f docker-compose-loadero.yml kill
rem docker-compose -f docker-compose-loadero.yml rm -vf
rem docker-compose -f docker-compose-loadero.yml build --no-cache --pull mocha
rem docker-compose -f docker-compose-loadero.yml build --pull mocha
rem docker-compose -f docker-compose-loadero.yml --env-file loadero.env run --rm mocha
rem docker-compose -f docker-compose-loadero.yml kill
rem docker-compose -f docker-compose-loadero.yml rm -vf

IF [%1] == [] GOTO error
SET PROD=%2
IF [%2] == [] SET PROD=false

docker build -t mocha-docker .
rem set ./loadero.env with variable LOADERO_TOKEN and PROD_RUN=true
docker run -e PROD_RUN=%PROD% -v %cd%\results\loadero\mochawesome-report\:/project/tests/src/mochawesome-report/ --rm mocha-docker mocha "/project/src/loadero/%1" --reporter mochawesome

GOTO :EOF
:error
ECHO incorrect_parameters