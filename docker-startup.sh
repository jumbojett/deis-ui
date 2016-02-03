#!/bin/sh

echo "var controller = \"$DEIS_CONTROLLER\";" > /src/controller.js
nginx -c /conf/nginx.conf
