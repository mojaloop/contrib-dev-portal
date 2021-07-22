#!/usr/bin/env bash

DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"

# Updates any external assets we have copied into this repo.


wget https://raw.githubusercontent.com/mojaloop/thirdparty-scheme-adapter/master/src/interface/api-outbound.yaml\
  -O ${DIR}/../docs/apis/3p-scheme-adapter-outbound.yaml

# TODO: modify the default responses for easier reading - this is currently a manual process