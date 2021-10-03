#!/bin/bash

curl --http1.1 https://$APITOKEN@api.appetize.io/v1/apps \
  -H 'Content-Type: application/json' \
  -d '{"url":"https://www.dropbox.com/s/vstixt6q61dg6sv/Wikipedia.zip?dl=1", "platform": "ios"}'
