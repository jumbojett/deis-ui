# deis-ui
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
This is a little hacky. 
1. Alter line 13 in `/app/scripts/services/deisservice.js` to point towards your deis api endpoint.
2. `grunt build`
3. Deploy to deis

