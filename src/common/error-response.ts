'use strict';

import express = require('express');

function errorResponse (res: express.Response<any>, code: number, message: string): express.Response<any> {
  return res.status(code).json({ httpError: `${code}`, message });
};

export = errorResponse;
