const lokijs = require('lokijs');
class MemDB {
  constructor() {
    this.db = new lokijs('admindb.json');
  }

  collection(name) {
    return this.db.addCollection(name);
  }
}

module.exports = new MemDB();
