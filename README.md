# salty

### Dependencies

##### Required

```sh
node --version
v16.13.1

npm --version
6.14.14
```

##### Optional (but recommended)

```sh
pm2 --version
4.5.6
```

### How to Build

```sh
npm install
npm run build
```

### Start With PM2 (recommended)

```sh
pm2 start "npm run build:watch"
pm2 start "npm start"
```

Some helpful pm2 commands:

```sh
pm2 list
pm2 restart 1 2
pm2 stop 1 2
pm2 start 1 2
pm2 logs
```

### Start Without PM2

```sh
npm run build:watch
npm start
```

### How To Add A New Command

1. Create an authorizer which makes sure the user has permission to execute the command.
1. Create a validator which validates the arguments for the command.
1. Create a service which carries out the actions associated with the command.
1. Create a controller to manage the authorizer, validator, and service.
1. Add the new command and controller to the router.
