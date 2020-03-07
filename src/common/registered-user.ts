'use strict'

import { validate } from 'jsonschema';

import BaseUser = require('./base-user');
import UnregisteredUser = require('./unregistered-user');
import Uuid = require('./uuid');

const schema = {
  id: '/RegisteredUser',
  type: 'object',
  properties: {
    id: { type: 'string', "required": true },
    name: { type: 'string', "required": true },
    email: { type: 'string', "required": true },
  }
};

const _id = new WeakMap<object, Uuid>();

class RegisteredUser extends BaseUser {
  constructor (id: Uuid, name: string, email: string) {
    super(name, email);
    _id.set(this, id);
  }

  get id (): Uuid {
    return _id.get(this) as Uuid;
  }

  toJson (): object {
    return {
      id: this.id.toString(),
      name: this.name,
      email: this.email
    };
  }

  static from (newUser: UnregisteredUser): RegisteredUser {
    return new RegisteredUser(Uuid.getRandom(), newUser.name, newUser.email);
  }

  static fromJson (json: any): RegisteredUser | null {
    const vres = validate(json, schema);

    if (!vres)
      return null;

    if (!Uuid.isValidUuidStr(json.id))
      return null;

    return new RegisteredUser(new Uuid(json.id), json.name, json.email);
  }
}

export = RegisteredUser;
