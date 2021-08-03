docker build -t mocha-docker .
docker run --rm mocha-docker mocha ""/project/src/loadero/**/*.test.js"