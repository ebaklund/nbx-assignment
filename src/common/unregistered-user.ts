'use strict'

import { validate } from 'jsonschema';

const BaseUser = require('./base-user');

const schema = {
  id: '/UnregisteredUser',
  type: 'object',
  properties: {
    name: { type: 'string', "required": true },
    email: { type: 'string', "required": true },
  }
};

class UnregisteredUser extends BaseUser {
  constructor (name: string, email: string) {
    super(name, email);
  }

  static fromJson (json: any): UnregisteredUser | null {
    const vres = validate(json, schema);

    if (!vres)
      return null;

    return new UnregisteredUser(json.name, json.email);
  }
}

export = UnregisteredUser;
