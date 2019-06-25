const mydb = require("../../app/helper/mydb");

describe("mydb helper", () => {
  beforeAll(async () => {
    mydb.pool.getConnection = jest.fn();
    mydb.pool.getConnection.mockImplementation(cb => {
      cb(null, {
        query: (sql, cb) => {
          cb(null, [], []);
        },
        release: () => true
      });
    });
  });

  test("It should return error from getDbConnection", async () => {
    mydb.pool.getConnection.mockImplementationOnce(cb => {
      cb("Error", null);
    });
    try {
      const con = await mydb.getDbConnection();
      expect(con).toBeNull();
    } catch (e) {
      expect(e).toBe("Error");
    }
  });

  test("It should return connection from getDbConnection", async () => {
    const con = await mydb.getDbConnection();
    expect(con).toHaveProperty("query");
  });

  test("It return result from query", async () => {
    try {
      const res = await mydb.doQuery("select * from table");
      expect(res).toEqual([]);
    } catch (e) {
      expect(e).toBe("Error");
    }
  });

  test("It should error from query", async () => {
    mydb.pool.getConnection.mockImplementationOnce(cb => {
      cb("Error", null);
    });
    try {
      const res = await mydb.doQuery("select * from table");
    } catch (e) {
      expect(e).toBe("Error");
    }
  });

  test("It return error from query from mysql", async () => {
    mydb.pool.getConnection.mockImplementationOnce(cb => {
      cb(null, {
        query: (sql, cb) => {
          cb("Error from mysql", [], []);
        },
        release: () => true
      });
    });
    try {
      const res = await mydb.doQuery("select * from table");
      expect(res).toEqual([]);
    } catch (e) {
      expect(e).toBe("Error from mysql");
    }
  });

  test("It should return [] from myQuery", () => {
    mydb.myQuery("select * from table", (error, result) => {
      expect(result).toEqual([]);
    });
  });

  test("It should return Error from myQuery", () => {
    mydb.pool.getConnection.mockImplementationOnce(cb => {
      cb("Error", null);
    });
    mydb.myQuery("select * from table", (error, result) => {
      expect(error).toEqual("Error");
    });
  });
});
