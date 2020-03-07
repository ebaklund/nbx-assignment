'use strict'

const _name = new WeakMap<object, string>();
const _email = new WeakMap<object, string>();

class BaseUser {
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
}

export = BaseUser;
