'use strict';

import express = require('express');

import db = require('../../database');
import Uuid = require('../../common/uuid');
import errRes = require('../../common/error-response');

module.exports = (req: express.Request, res: express.Response) => {
  try {
    const recId = Uuid.fromString(req.params.id);

    if (!recId)
      return errRes(res, 404, `malformed user id: '${req.params.id || ''}'`);

    const user = db.getUser(recId);

    if (!user)
      return errRes(res, 404, `user not found. id:  '${recId}'`);

    res.status(200).json(user.toJson());
  }
  catch (err) {
    errRes(res, 500, err.message);
  }
}
