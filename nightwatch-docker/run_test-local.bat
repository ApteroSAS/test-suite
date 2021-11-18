SET TESTS_DIRECTORY=tests\renderApiTest.js
rem SET TESTS_DIRECTORY=tests\renderApiTest.js
call npx nightwatch --env chrome_local
rem call npx nightwatch-html-reporter -d ./tests_output