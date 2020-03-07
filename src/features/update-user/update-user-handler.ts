'use strict';

import express = require('express');

import db = require('../../database');
import Uuid = require('../../common/uuid');
import errRes = require('../../common/error-response');
import RegisteredUser = require('../../common/registered-user');

module.exports = (req: express.Request, res: express.Response) => {
  try {
    const reqUser = RegisteredUser.fromJson(req.body);

    if (!reqUser)
      return errRes(res, 422, 'body not recognized as user data');

    const updatedUser = db.updateUser(reqUser);

    if (!updatedUser)
      return errRes(res, 404, `user not found. id:  '${reqUser.id}'`);

    res.status(200).json(updatedUser.toJson());
  }
  catch (err) {
    errRes(res, 500, err.message);
  }
}
