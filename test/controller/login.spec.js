const app = require('../../app/app');
const request = require('supertest');
const service = require('../../app/service/login');
const myConfig = require('config');
const config = myConfig.get('Config');
const jwt = require('jwt-simple');

describe('Test the user path', () => {
  let token = '';

  beforeAll(async () => {
    service.login = jest.fn();
    service.login.mockImplementation((userId, password) =>
      userId == 'admin' ? true : false
    );
    token = jwt.encode({ userId: 'admin' }, config.auth.jwtSecret);
  });

  test('It should be login pass', async () => {
    const response = await request(app)
      .post('/login')
      .send({ userId: 'admin', userPwd: 'admin' });
    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty('success', true);
  });

  test('It should be login fail', async () => {
    const response = await request(app)
      .post('/login')
      .send({ userId: 'bad', userPwd: 'admin' });
    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual({ success: false, msg: '' });
  });

  test('It should be login fail invalid req body', async () => {
    const response = await request(app).post('/login');
    expect(service.login).toHaveBeenCalled();
    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual({
      success: false,
      msg: 'Please fill in userId or password'
    });
  });
});
