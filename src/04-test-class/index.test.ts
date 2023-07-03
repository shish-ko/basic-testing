// Uncomment the code below and write your tests
import { BankAccount, getBankAccount, SynchronizationFailedError } from '.';

let testAcc: BankAccount;
let transferAcc: BankAccount;

describe('BankAccount', () => {
  beforeAll(() => {
    testAcc = getBankAccount(1000);
    transferAcc = getBankAccount(1000);
  });
  test('should create account with initial balance', () => {
    expect(testAcc.getBalance()).toBe(1000);
  });

  test('should throw InsufficientFundsError error when withdrawing more than balance', () => {
    expect(() => testAcc.withdraw(1100)).toThrow();
  });

  test('should throw error when transferring more than balance', () => {
    expect(() => testAcc.transfer(1100, transferAcc)).toThrow();
  });

  test('should throw error when transferring to the same account', () => {
    expect(() => testAcc.transfer(1000, testAcc)).toThrow();
  });

  test('should deposit money', () => {
    expect(testAcc.deposit(1000).getBalance()).toBe(2000);
  });

  test('should withdraw money', () => {
    expect(testAcc.withdraw(500).getBalance()).toBe(1500);
  });

  test('should transfer money', () => {
    expect(testAcc.transfer(500, transferAcc).getBalance()).toBe(1000);
  });

  test('fetchBalance should return number in case if request did not failed', async () => {
    let res;
    while (!res) {
      res = await testAcc.fetchBalance();
      if (res) expect(typeof res).toBe('number');
    }
  });

  test('should set new balance if fetchBalance returned number', async () => {
    const balance = testAcc.getBalance();
    let res;
    while (!res) {
      try {
        await testAcc.synchronizeBalance();
        res = testAcc.getBalance();
      } catch {}
    }
    expect(res).not.toBe(balance);
  });

  test('should throw SynchronizationFailedError if fetchBalance returned null', async () => {
    let isError = false;
    while (!isError) {
      try {
        await testAcc.synchronizeBalance();
      } catch (e) {
        isError = true;
        expect(e).toBeInstanceOf(SynchronizationFailedError);
      }
    }
  });
});
