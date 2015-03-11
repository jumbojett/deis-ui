# deis-ui
![Screenshot](/screenshot.png?raw=true "Screenshot")
Full client-side web app that interfaces with deis api. It works but there are many more features needed. Please submit pull requests.

## Compatibility
This attempts to be compatible with the latest version of the deis API. Not backwards compatible.

## Features
- Full login and logout with session support
- Browse and view running apps
- Display all environmental variables 
- Logs are properly rendered with terminal colors

## TODO
- Create and delete apps
- Manage users

## Install

You should be able to:

    deis create deis-ui
    git push deis master

If `DEIS_CONTROLLER_FQDN` is defined as an environment variable, it will use that when proxying API requests to the controller through the local deis-router which is assumed to be at `172.17.42.1:80`

It will infer your domain name by querying etcd at `http://172.17.42.1:4001`, which can be overridden by specifying an `ETCD_PEER` environment variable.

This is a little hacky. 

1. Alter line 13 in `/app/scripts/services/deisservice.js` to point towards your deis api endpoint.
2. `grunt build`
3. Deploy to deis

