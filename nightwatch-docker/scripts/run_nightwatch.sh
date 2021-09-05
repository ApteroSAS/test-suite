#!/usr/bin/env bash

if [ "x$DEBUG" == "x" ] ; then
  pwd
  npm run nightwatch
  #npm run nightwatch --reporter ./html-reporter.js
  #nightwatch-html-reporter -d /tests/nightwatch/reports
else
  npm run nightwatch-debug
fi
