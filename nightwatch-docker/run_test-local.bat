SET TESTS_DIRECTORY=tests\loadero_sim_test.js
rem SET TESTS_DIRECTORY=tests\aptero-landing-page.js
call npx nightwatch --env chrome_local
rem call npx nightwatch-html-reporter -d ./tests_output