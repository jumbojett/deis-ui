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

```bash
deis create
deis config:set DEIS_API=http://deis.local3.deisapp.com
git push deis master
```

## Development

```bash
npm install
npm start
```

