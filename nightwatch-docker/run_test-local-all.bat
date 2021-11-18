SET TESTS_DIRECTORY=build
rem SET TESTS_DIRECTORY=tests\aptero-landing-page.ts
npm run chrome-local
rem call npx nightwatch-html-reporter -d ./tests_output