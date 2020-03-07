'use strict';

import RegisteredUser = require('../common/registered-user');
import UnregisteredUser = require('../common/unregistered-user');
import Uuid = require('../common/uuid');

import faker = require('faker');

const _users = new Map<Uuid, RegisteredUser>();

class UserDbFacade {
  static getUsers (): RegisteredUser[] {
    return Array.from(_users.values());
  }

  static getUser (id: Uuid): RegisteredUser | null {
    return _users.get(id.toString()) || null;
  }

  static addUser (newUser: UnregisteredUser): RegisteredUser {
    const user = RegisteredUser.from(newUser);
    _users.set(user.id.toString(), user);

    return user;
  }

  static updateUser (user: RegisteredUser): RegisteredUser | null {
    const oldUser =_users.get(user.id.toString()) || null;

    if (oldUser)
      _users.set(user.id.toString(), user);

    return oldUser;
  }

  static deleteUser (id: Uuid): RegisteredUser | null {
    const user =_users.get(id.toString()) || null;

    if (user)
      _users.delete(id.toString());

    return user;
  }
}

[...(new Array(10)).keys()]
  .map(() => ({ name: faker.name.findName(), email: faker.internet.email() }))
  .map(json => {
    return UnregisteredUser.fromJson(json) as UnregisteredUser;
  })
  .forEach(user => {
    return UserDbFacade.addUser(user);
  });

export = UserDbFacade;
