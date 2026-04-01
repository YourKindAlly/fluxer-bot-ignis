import { add } from './math.js';

describe('Math functions', () => {
  test('add should add two numbers', () => {
    expect(add(3, 4)).toBe(7);
  });
});