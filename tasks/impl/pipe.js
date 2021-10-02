const pipe =
  (...funcs) =>
  (...args) => {
    return funcs.reduce((arg, func) => {
      if (Array.isArray(arg)) {
        return func(...arg);
      }
      return func(arg);
    }, args);
  };

const sum = (a, b) => a + b;

const twice = (a) => a * 2;

const result = pipe(sum, twice)(1, 2);

console.log(result, result === 6);
