/*
 * This is a set of JS tasks to check basic core JS topics:
 * Object, Prototype, Closure, Context, Inheritance
 *
 * Main point is to give a complex task that allows to check many skills
 * */

/*
 * Context
 *
 * */

/*
 * Task 1
 * Create an object with name Calc
 *
 * */

/**
 * @namespace Context
 * */

console.group('Context tasks');

/**
 * @type {Object}
 * @property {number} base
 * @property {Function} multiply
 * @memberof Context
 * */
const Calc = {
  base: 2,
  /**
   * @property multiply
   * @returns {number}
   * */
  multiply: function (num) {
    return this.base * num;
  },
};

// What will be printed?
console.log(Calc.multiply(2)); // 4

// What if we assign method to a variable
let multiply = Calc.multiply;
// What will be printed?
console.log(multiply(2)); // NaN

// How to fix
multiply = Calc.multiply.bind(Calc);
// What will be printed?
console.log(multiply(2)); // 4

console.groupEnd();
