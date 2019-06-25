const mysql = require('mysql');
const myConfig = require('config');
const config = myConfig.get('Config');

/**
 * MyDb Class
 */
class MyDb {
  constructor() {
    this.pool = mysql.createPool(config.mysql);
  }

  doQuery(sql) {
    let me = this;
    return new Promise((resolve, reject) => {
      this.pool.getConnection((err, conn) => {
        if (err) {
          reject(err);
        } else {
          conn.query(sql, (error, results, fields) => {
            conn.release();
            if (!error) {
              resolve(results);
            } else {
              reject(error);
            }
          });
        }
      });
    });
  }

  myQuery(sql, cb) {
    this.doQuery(sql)
      .then(result => {
        cb(null, result);
      })
      .catch(err => {
        cb(err, null);
      });
  }

  getDbConnection() {
    return new Promise((resolve, reject) => {
      this.pool.getConnection((error, con) => {
        if (error) reject(error);
        else resolve(con);
      });
    });
  }
}

const myDb = new MyDb();

module.exports = myDb;
