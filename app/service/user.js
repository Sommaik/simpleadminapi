const memdb = require('../helper/memdb');

class UserService {
  getRepo() {
    return memdb.collection('user');
  }
  create(user) {
    const doc = this.getRepo().insert(user);
    return doc;
  }

  findAll() {
    return this.getRepo().find();
  }

  update(id, user) {
    try {
      const usr = this.getById(id);
      for (let key in user) {
        usr[key] = user[key];
      }
      return this.getRepo().update(usr);
    } catch (e) {
      return { success: false, msg: e };
    }
  }

  getById(id) {
    return this.getRepo().get(id);
  }

  delete(id) {
    try {
      const x = this.getRepo().get(id);
      return this.getRepo().remove(x);
    } catch (e) {
      return { success: false, msg: e };
    }
  }
}

module.exports = new UserService();
