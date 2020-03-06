'use strict';

import faker = require('faker');

const seedData = (new Array(10))
  .map(() => ({ name: faker.name.findName(), email: faker.internet.email() }));

