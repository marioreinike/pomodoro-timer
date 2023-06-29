import { faker } from '@faker-js/faker';
import { factory, SequelizeAdapter } from 'factory-girl';
import Session from '../../models/session';

factory.setAdapter(new SequelizeAdapter());

factory.define('Session', Session, {
  pomodoroCount: () => faker.datatype.number({ min: 1, max: 10 }),
  elapsedTime: () => faker.datatype.number({ min: 1500, max: 3000 }),
});
