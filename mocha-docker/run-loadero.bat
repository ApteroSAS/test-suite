docker build -t mocha-docker .
rem set enfile with variable LOADERO_TOKEN
docker run --env-file ./loadero.env --rm mocha-docker mocha ""/project/src/loadero/**/*.test.js"