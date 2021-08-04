#!/usr/bin/env bash

DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
# TODO: this should be master once the following PR is merged: 
# https://github.com/mojaloop/thirdparty-scheme-adapter/pull/110

BRANCH=feat/2365-update-outbound-interface
# Updates any external assets we have copied into this repo.

# TODO: we should really get this from api-snippets...
wget https://raw.githubusercontent.com/mojaloop/thirdparty-scheme-adapter/${BRANCH}/src/interface/api-outbound.yaml\
  -O ${DIR}/../docs/.vuepress/public/3p-scheme-adapter-outbound.yaml

# TODO: modify the default responses for easier reading - this is currently a manual process