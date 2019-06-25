const userService = require('../../app/service/user');
describe('user service', () => {
  it('should be create user', () => {
    const doc = userService.create({
      userId: '001',
      userName: 'Jame Bond',
      password: '8888'
    });
    expect(doc).toHaveProperty('userId');
  });

  it('should return all record', () => {
    const result = userService.findAll();
    expect(result).toHaveLength(1);
  });

  it('should return user', () => {
    const result = userService.findAll();
    expect(result[0]).toHaveProperty('$loki');
    const id = result[0]['$loki'];
    const user = userService.getById(id);
    expect(user).toHaveProperty('userId', '001');
  });
});
