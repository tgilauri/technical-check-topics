/*
 * This is a set of JS tasks to check basic core JS topics:
 * Object, Prototype, Closure, Context, Inheritance
 *
 * Main point is to give a complex task that allows to check many skills
 * */

/*
 * Closure
 *
 * */

/*
 * Task 1
 * Implement logger with different type of log level
 *
 * */

/**
 * @namespace Closure
 * */

console.group('Closure tasks');

/**
 * @function GetLogger
 * @param {'log' | 'warn' | 'error'} logLevel
 * @memberof Closure
 * @returns {Function}
 * */
const GetLogger = (logLevel) => {
  // You can ask to implement base check for log level existing
  if (logLevel in console) {
    return (...args) => {
      console[logLevel](...args);
    };
  }
  throw new Error('No such log level in parent logger');
};

const baseLogger = GetLogger('log');
baseLogger('Log with log level LOG');

const errorLogger = GetLogger('error');
errorLogger('Log with log level ERROR');

//const blaLogger = GetLogger('bla');
//blaLogger('Log with log level BLA');

console.groupEnd();
