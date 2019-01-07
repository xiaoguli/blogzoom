#!/bin/bash
git pull origin master
git add .
git commit -m'up'
rm -rf dist
npm run build
git push origin master