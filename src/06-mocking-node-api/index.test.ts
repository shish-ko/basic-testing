// Uncomment the code below and write your tests
import { readFileAsynchronously, doStuffByTimeout, doStuffByInterval } from '.';
import path from 'node:path';
import fs from 'fs';

describe('doStuffByTimeout', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('should set timeout with provided callback and timeout', () => {
    jest.spyOn(global, 'setTimeout');
    const callback = jest.fn();
    const timeOut = 1000;
    doStuffByTimeout(callback, timeOut);
    jest.runAllTimers();
    expect(setTimeout).toBeCalledWith(callback, timeOut);
  });

  test('should call callback only after timeout', () => {
    const callback = jest.fn();
    const timeOut = 1000;
    doStuffByTimeout(callback, timeOut);
    expect(callback).not.toBeCalled();
    jest.runAllTimers();
    expect(callback).toBeCalled();
  });
});

describe('doStuffByInterval', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('should set interval with provided callback and timeout', () => {
    const callback = jest.fn();
    jest.spyOn(global, 'setInterval');
    const timeOut = 1000;
    doStuffByInterval(callback, timeOut);
    expect(setInterval).toBeCalledWith(callback, timeOut);
  });

  test('should call callback multiple times after multiple intervals', () => {
    const callback = jest.fn();
    const timeOut = 1000;
    doStuffByInterval(callback, timeOut);
    expect(callback).not.toBeCalled();
    jest.advanceTimersByTime(timeOut * 2.5);
    expect(callback).toBeCalledTimes(2);
  });
});

describe('readFileAsynchronously', () => {
  test('should call join with pathToFile', async () => {
    const spy = jest.spyOn(path, 'join');
    const testPath = 'some/test/qwe.txt';
    await readFileAsynchronously(testPath);
    expect(spy).toBeCalledWith(__dirname, testPath);
  });

  test('should return null if file does not exist', async () => {
    const save = fs.existsSync;
    fs.existsSync = jest.fn().mockReturnValueOnce(false);
    const res = await readFileAsynchronously('index.ts');
    expect(res).toBeNull();
    fs.existsSync = save;
  });

  test('should return file content if file exists', async () => {
    const res = await readFileAsynchronously('index.ts');
    expect(res).toBeTruthy();
  });
});
