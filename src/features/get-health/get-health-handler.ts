'use strict';

import express = require('express');

module.exports = (req: express.Request, res: express.Response) => {
  res.json({ name: 'user-service' });
}
