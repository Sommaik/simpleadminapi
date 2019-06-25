const memdb = require('../helper/memdb');

class LoginService {
  async login(userId, password) {
    const result = memdb.collection('user').findObject({ userId, password });
    return result;
  }
}

module.exports = new LoginService();
