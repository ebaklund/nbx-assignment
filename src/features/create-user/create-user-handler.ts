'use strict';

import express = require('express');

import db = require('../../database');
import UnregisteredUser = require('../../common/unregistered-user');
import errRes = require('../../common/error-response');
import RegisteredUser = require('../../common/registered-user');

module.exports = (req: express.Request, res: express.Response) => {
  try {
    const reqUser = UnregisteredUser.fromJson(req.body);

    if (!reqUser)
      return errRes(res, 422, 'body not recognized as user data');

    const addedUser = db.addUser(RegisteredUser.from(reqUser));

    if (!addedUser)
      return errRes(res, 500, 'user data rejected by database');

    res.status(203).json(addedUser.toJson());
  }
  catch (err) {
    errRes(res, 500, err.message);
  }
}
