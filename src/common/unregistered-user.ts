'use strict'

const validateJson = require('jsonschema').validate;

const schema = {
  type: 'object',
  properties: {
    name: 'string',
    email: 'string'
  },
  required: [ 'name', 'email' ]
};

const _name = new WeakMap<object, string>();
const _email = new WeakMap<object, string>();

class UnregisteredUser {
  constructor (name: string, email: string) {
    _name.set(this, name);
    _email.set(this, email);
  }

  get name (): string {
    return _name.get(this) as string;
  }

  get email (): string {
    return _email.get(this) as string;
  }

  static fromJson (json: any): UnregisteredUser | null {
    if (!validateJson(json, schema))
      return null;

    return new UnregisteredUser(json.name, json.email);
  }
}

export = UnregisteredUser;
