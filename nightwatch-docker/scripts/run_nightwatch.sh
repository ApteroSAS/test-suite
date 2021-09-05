#!/usr/bin/env bash

if [ "x$DEBUG" == "x" ] ; then
  pwd
  npm run nightwatch
  nightwatch-html-reporter -d /home/docker/app/tests_output
else
  npm run nightwatch-debug
fi
