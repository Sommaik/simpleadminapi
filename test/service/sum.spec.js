const _sum = require('../../app/service/sum');

describe('test sum function', () => {
  test('adds 1 + 2 to equal 3', () => {
    expect(_sum.add(1, 2)).toBe(3);
  });

  test('adds 1 + 2.5 equal 3.5', () => {
    expect(_sum.add(1, 2.5)).toBe(3.5);
  });

  test('adds 1.5 + 2.5 equal 4', () => {
    expect(_sum.add(1.5, 2.5)).toBe(4);
  });

  test('adds 1 + 1.236 equal 2.236', () => {
    expect(_sum.add(1, 1.236)).toBe(2.236);
  });
});
