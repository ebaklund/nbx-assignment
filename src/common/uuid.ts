'use strict';

import uuid = require('uuid');
import validateUuid = require('uuid-validate');

const _uuidStr = new WeakMap<object, string>();

class Uuid {
  constructor (uuidStr: string) {
    if (!validateUuid(uuidStr))
      throw new TypeError('Input is not a valid uuid string format');

    _uuidStr.set(this, uuid.v4());
  }

  toString (): string {
    return _uuidStr.get(this) as string;
  }

  static getRandom (): Uuid {
    return new Uuid(uuid.v4());
  }

  static isValidUuidStr (uuidStr: string): boolean {
    return validateUuid(uuidStr);
  }
}

export = Uuid;
