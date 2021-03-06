'use strict';

import express = require('express');

import db = require('../../database');
import Uuid = require('../../common/uuid');
import errRes = require('../../common/error-response');
import RegisteredUser = require('../../common/registered-user');

module.exports = (req: express.Request, res: express.Response) => {
  try {
    const reqId = Uuid.fromString(req.params.id);

    if (!reqId)
      return errRes(res, 404, `malformed user id: '${req.params.id || ''}'`);

    const deletedUser = db.deleteUser(reqId);

    if (!deletedUser)
      return errRes(res, 404, `user not found. id:  '${reqId.toString()}'`);

    res.status(204).send();
  }
  catch (err) {
    errRes(res, 500, err.message);
  }
}
