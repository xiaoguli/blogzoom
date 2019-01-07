#!/bin/bash
git pull origin master
git add .
git commit -m'updata'
rm -rf dist
npm run build
git push origin master