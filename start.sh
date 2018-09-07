#! /bin/bash
yarn tsc
pm2 start dist/tsc/scripts/webpack.dev.js
