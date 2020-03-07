'use strict';

import express = require('express');

import db = require('../../database');
import errRes = require('../../common/error-response');
import RegisteredUser = require('../../common/registered-user');

module.exports = (req: express.Request, res: express.Response) => {
  try {
    const jsonUsers = db.getUsers().map(user => user.toJson());
    res.status(200).json(jsonUsers);
  }
  catch (err) {
    errRes(res, 500, err.message);
  }
}
