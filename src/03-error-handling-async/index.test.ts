// Uncomment the code below and write your tests
import {
  throwError,
  throwCustomError,
  resolveValue,
  MyAwesomeError,
  rejectCustomError,
} from './index';

describe('resolveValue', () => {
  test('should resolve provided value', async () => {
    const value = 3;
    const res = await resolveValue(value);
    expect(res).toBe(value);
  });
});

describe('throwError', () => {
  test('should throw error with provided message', () => {
    const testError = 'test error';
    expect(() => throwError(testError)).toThrow(testError);
  });

  test('should throw error with default message if message is not provided', () => {
    expect(() => throwError()).toThrow(/oops!/i);
  });
});

describe('throwCustomError', () => {
  test('should throw custom error', () => {
    expect(() => throwCustomError()).toThrow(new MyAwesomeError());
  });
});

describe('rejectCustomError', () => {
  test('should reject custom error', async () => {
    expect(() => rejectCustomError()).rejects.toThrow(new MyAwesomeError());
  });
});
