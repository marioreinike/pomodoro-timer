const { faker } = require('@faker-js/faker');
/** @type {import('sequelize-cli').Migration} */

module.exports = {
  async up(queryInterface) {
    const now = new Date();
    const sessionsData = Array(10).fill(1).map(() => ({
      pomodoroCount: faker.datatype.number({ min: 1, max: 10 }),
      elapsedTime: faker.datatype.number({ min: 100, max: 3000 }),
      createdAt: now,
      updatedAt: now,
    }));

    await queryInterface.bulkInsert('Sessions', sessionsData);
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('Sessions', null, {});
  },
};
