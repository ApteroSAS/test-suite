SET TESTS_DIRECTORY=build\animation_button_test.js
rem SET TESTS_DIRECTORY=tests\aptero-landing-page.ts
npm run chrome-local
rem call npx nightwatch-html-reporter -d ./tests_output