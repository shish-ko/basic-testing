// Uncomment the code below and write your tests
import { simpleCalculator, Action } from './index';

const testCases = [
  { a: 1, b: 2, action: Action.Add, expected: 3 },
  { a: 2, b: 2, action: Action.Divide, expected: 1 },
  { a: 3, b: 2, action: Action.Exponentiate, expected: 9 },
  { a: 3, b: 2, action: Action.Multiply, expected: 6 },
  { a: 3, b: 2, action: Action.Subtract, expected: 1 },
];
const brokenTestCases = [
  { a: 1, b: '2', action: Action.Add },
  { a: 2, b: null, action: Action.Divide },
  { a: 3, b: 2, action: '@' },
  { a: {}, b: 2, action: Action.Subtract },
];

describe('simpleCalculator', () => {
  // This test case is just to run this test suite, remove it when you write your own tests
  it.each(testCases)('should handle $action', (payload) => {
    expect(simpleCalculator(payload)).toBe(payload.expected);
  });
  it.each(brokenTestCases)('should return null for invalid arg', (payload) => {
    expect(simpleCalculator(payload)).toBeNull();
  });
  // Consider to use Jest table tests API to test all cases above
});
