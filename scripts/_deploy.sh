#!/usr/bin/env bash

# A simple manual deploy script... should be automated soon.

./node_modules/.bin/standard-version --releaseCommitMessageFormat 'chore(release): {{currentTag}} [skip ci]'
git push --follow-tags origin master

export VERSION=`cat package.json | jq .version -r`
echo "Deploying Version: v${VERSION}"
docker-compose build

# re-tag the image docker-compose built for us
docker tag mojaloop/contrib-dev-portal:latest mojaloop/contrib-dev-portal:v${VERSION}
docker push ojaloop/contrib-dev-portal:v${VERSION}