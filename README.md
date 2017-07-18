# node-restapi-ts
Generic REST API written in typescript. Enables http/2 and server sent events by default.


## Installation guide ##
```
#!python

npm install -g yarn
npm install -g gulp
yarn install
gulp
node dist/app.js
```

## Tests ##
We use mocha for testing. You can run test by 
```
node ./node_modules/mocha/bin/mocha
```

## Database ##
Mongo as first choice, strongly integrated

## Sample app ##
https://vps331205.ovh.net:3001/

### User API Methods ###
```
    GET /api/user
Returns array of user objects
    GET /api/user/:id
Returns single user with all details
    POST /api/user
Creates user from request body, returns created object.
    PUT /api/user/:id
Updates existing user, returns mongo status object
    DELETE /api/user/:id
Delete existing user
```

### User JSON Object ###
```
new mongoose.Schema({
    name: String,
    surname: String,
    username: String,
    photo: String,
    birth: Date,
    status: Number,
    id: String,
    phone: String,
    mail: String
}
```




