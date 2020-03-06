'use strict'

import AddressInfo = require('./common/address-info');
import express = require('express');

import GetHealth = require('./features/get-health');
import GetUsers = require('./features/get-users');
import CreateUser = require('./features/create-user');
import GetUser = require('./features/get-user');
import UpdateUser = require('./features/update-user');
import DeleteUser = require('./features/delete-user');

const app = express();
app.get('/', GetHealth.handler);
app.get('/users', GetUsers.handler);
app.post('/users', CreateUser.handler);
app.get('/users{userId}', GetUser.handler);
app.put('/users{userId}', UpdateUser.handler);
app.delete('/users{userId}', DeleteUser.handler);

const server = app.listen(8080, () => {
    const port = (server.address() as AddressInfo).port;
    console.log("NBX assignment server started at http://localhost:%s", port);
});
