const userService = require('../../app/service/login');
const mydb = require('../../app/helper/mydb');

describe('Test User Service', () => {
  beforeAll(async () => {
    mydb.doQuery = jest.fn();
    mydb.doQuery.mockImplementation(sql => {
      return Promise.resolve(true);
    });
  });

  test('It return true when valid user or password', async () => {
    const loginsuccess = await userService.login('admin', 'password');
    expect(loginsuccess).toBeTruthy();
  });

  // test('It return false when invalid user or password', async () => {
  //   mydb.doQuery.mockResolvedValue(false);
  //   const loginsuccess = await userService.login('bad', 'bad');
  //   expect(loginsuccess).toBeFalsy();
  // });

  // test('It return sql statement when call createStatement', () => {
  //   const sql = userService.createLoginStatement('admin', 'password');
  //   expect(sql).toEqual(
  //     `select * from user where userId = 'admin' and password = 'password' `
  //   );
  // });
});
