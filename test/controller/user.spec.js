const request = require('supertest');
const app = require('../../app/app');
describe('user controller', () => {
  it('should create user', async () => {
    const resp = await request(app)
      .post('/user')
      .send({ userId: '007' });
    expect(resp.statusCode).toEqual(200);
    expect(resp.body).toHaveProperty('userId');
  });

  it('should return all user', async () => {
    const response = await request(app).get('/user');
    expect(response.body).toHaveLength(1);
  });

  it('should return user', async () => {
    const response = await request(app).get('/user/1');
    expect(response.body).toHaveProperty('userId');
  });

  it('should return user', async () => {
    const response = await request(app)
      .put('/user/1')
      .send({ userId: '008', userName: 'J.' });
    expect(response.statusCode).toEqual(200);
    expect(response.body).toHaveProperty('userId', '008');
    expect(response.body).toHaveProperty('userName', 'J.');
  });

  it('should delete user', async () => {
    const response = await request(app).delete('/user/1');
    expect(response.statusCode).toEqual(200);
  });
});
