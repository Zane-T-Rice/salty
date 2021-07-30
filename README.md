# salty

### How To Add A New Command

1. Create an authorizer which makes sure the user has permission to execute the command.
1. Create a validator which validates the arguments for the command.
1. Create a service which carries out the actions associated with the command.
1. Create a controller to manage the authorizer, validator, and service.
1. Add the new command and controller to the router.
