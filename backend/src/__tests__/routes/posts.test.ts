import supertest from 'supertest';
import app from '../../app';
import orm from '../../sequelize';
import factory from '../factories';
import Session from '../../models/session';

const request = supertest(app.callback());

describe('Sessions routes', () => {
  let sessions: Session[];
  let session: Session;

  beforeAll(async () => {
    await orm.sync({ force: true });

    sessions = await factory.createMany('Session', 9);
    session = sessions[0];
  });

  afterAll(async () => {
    await orm.close();
  });

  describe('Create', () => {
    test('Missing param - throws error', async () => {
      const response = await request.post('/sessions').send({ other: 'incorrect param' });

      expect(response.status).toBe(400);
    });

    test('executes correctly', async () => {
      const response = await request
        .post('/sessions')
        .send({ pomodoroCount: 1, elapsedTime: 1500 });

      expect(response.status).toBe(201);
      expect(response.body).toEqual(expect.objectContaining({
        id: expect.any(Number),
        pomodoroCount: 1,
        elapsedTime: 1500,
      }));
    });
  });

  describe('List', () => {
    test('executes correctly', async () => {
      const response = await request.get('/sessions');

      expect(response.status).toBe(200);
      expect(response.body).toHaveLength(10);
    });
  });

  describe('Show', () => {
    test('throws 404 when not found', async () => {
      const response = await request.get(`/sessions/${999}`);

      expect(response.status).toBe(404);
    });

    test('executes correctly', async () => {
      const response = await request.get(`/sessions/${session.id}`);

      expect(response.status).toBe(200);
      expect(response.body).toEqual(expect.objectContaining({ elapsedTime: session.elapsedTime }));
    });
  });

  describe('Update', () => {
    test('executes correctly', async () => {
      const response = await request.put(`/sessions/${session.id}`).send({ elapsedTime: 3000 });

      expect(response.status).toBe(200);
      expect(response.body).toEqual(expect.objectContaining({ elapsedTime: 3000 }));
    });

    test('some error', async () => {
      jest.spyOn(Session.prototype, 'update').mockRejectedValueOnce(new Error('Mock error'));
      const response = await request.put(`/sessions/${session.id}`).send({ elapsedTime: 1000 });

      expect(response.status).toBe(400);
    });
  });

  describe('Destroy', () => {
    test('executes correctly', async () => {
      const response = await request.delete(`/sessions/${session.id}`);

      expect(response.status).toBe(200);
      expect(response.body).toEqual(expect.objectContaining({ id: session.id }));
      const deletedPost = await Session.findByPk(session.id);
      expect(deletedPost).toBeNull();
    });
  });
});
