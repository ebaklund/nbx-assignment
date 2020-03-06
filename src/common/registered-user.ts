'use strict'

const validateJson = require('jsonschema').validate;

const schema = {
  type: 'object',
  properties: {
    id: 'string',
    name: 'string',
    email: 'string'
  },
  required: [ 'id', 'name', 'email' ]
};

import UnregisteredUser = require('./unregistered-user');
import Uuid = require('./uuid');

const _id = new WeakMap<object, Uuid>();

class RegisteredUser extends UnregisteredUser {
  constructor (id: Uuid, name: string, email: string) {
    super(name, email);
    _id.set(this, id);
  }

  get id (): Uuid {
    return _id.get(this) as Uuid;
  }

  static register(newUser: UnregisteredUser): RegisteredUser {
    return new RegisteredUser(Uuid.getRandom(), newUser.name, newUser.email);
  }

  static fromJson (json: any): RegisteredUser | null {
    if (!validateJson(json, schema))
      return null;

    if (!Uuid.isValidUuidStr(json.id))
      return null;

    return new RegisteredUser(new Uuid(json.id), json.name, json.email);
  }
}

export = UnregisteredUser;
