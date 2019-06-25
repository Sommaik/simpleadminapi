const example = require('../../app/service/example');
describe('callback function', () => {
  test('It should show hello world', () => {
    const cb = jest.fn();
    cb.mockImplementation((h, w) => {
      expect(h).toEqual('Hello');
    });
    example.helloWorldCallback(cb);
    expect(cb).toHaveBeenCalled();
  });
});

describe('test group', () => {
  beforeAll(() => {
    /* Runs before all tests */
  });
  afterAll(() => {
    /* Runs after all tests */
  });
  beforeEach(() => {
    /* Runs before each test */
  });
  afterEach(() => {
    /* Runs after each test */
  });

  test('test case', async () => {
    const _prom = async () => {
      return 'Hello';
    };

    // expect(await _prom()).toEqual('Hello');
    _prom().then(value => {
      console.log(value);
    });
  });
});
