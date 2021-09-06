/*
* This is a set of JS tasks to check basic core JS topics:
* Object, Prototype, Closure, Context, Inheritance
*
* Main point is to give a complex task that allows to check many skills
* */


/*
* Task 1 Inheritance
* Implement functional classes inheritance.
*
* https://developer.mozilla.org/ru/docs/Web/JavaScript/Inheritance_and_the_prototype_chain
* https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/Object/create
* https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/create
* */

/**
 * Parent class Shape
 * @constructor
 * @param {number} height
 * @param {number} width
 */
function Shape(height, width) {
  this.height = height;
  this.width = width;
}

// Method have to throw an Error to make sure it is implemented in subclass
/**
 * @method
 * @throws {Error}
 * */
Shape.prototype.getSquare = function () {
  throw new Error('You have to overload this method in child objects.');
}

/**
 * Subclass Rectangle
 * @constructor
 * @param {number} height
 * @param {number} width
 * */
function Rectangle(height, width) {
  Shape.call(this, height, width);
  //why set methods in prototype
  //this.greet = function() {
  //    console.log(`Hello ${this.name}`);
  //}
}

Rectangle.prototype = Object.create(Shape.prototype);

// Why do we have to explicitly set constructor?
Rectangle.prototype.constructor = Rectangle;

Rectangle.prototype.getSquare = function () {
  return this.height * this.width;
}

new Rectangle(1, 2).getSquare(); // 2

/*
* Task 2 Closure
* Implement logger with different type of log level
*
* */

/**
 * @param {'log' | 'warn' | 'error'} logLevel
 *
 * @returns {Function}
 * */
const GetLogger = (logLevel) => {
  // You can ask to implement base check for log level existing
  if (logLevel in console) {
    return (...args) => {
      console[logLevel](...args);
    }
  }
  throw new Error('No such log level in parent logger');
}

const baseLogger = GetLogger('log');
baseLogger('Log with log level LOG');

const errorLogger = GetLogger('error');
errorLogger('Log with log level ERROR');

