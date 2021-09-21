#!/usr/bin/env bash

set -euo pipefail
DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"


# Updates any external assets we have copied into this repo.
# We maintain separate copies from the upstream swagger files
# because that allows us to fix formatting issues, add extra context
# and modify the servers, meaning that the examples can work out of the box

BRANCH=master

# TODO: we should really get this from api-snippets...
# wget https://raw.githubusercontent.com/mojaloop/thirdparty-scheme-adapter/${BRANCH}/src/interface/api-outbound.yaml\
#   -O ${DIR}/../docs/.vuepress/public/3p-scheme-adapter-outbound.yaml

wget https://raw.githubusercontent.com/mojaloop/sdk-scheme-adapter/master/src/OutboundServer/api.yaml\
  -O ${DIR}/../docs/.vuepress/public/sdk-scheme-adapter-outbound.yaml

echo 'Copied across external assets. Now make sure you do the following manually:'
echo ' - modify the default responses for easier reading - this is currently a manual process'