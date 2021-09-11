// How does require search for files?
// Does multiple requiring runs code every time it is being required?

require('./module-B');
require('./module-B');
require('./module-B');
require('./module-B');

// Does import of the module that imports module-B affects counter increment?
require('./module-C');

// Let's get the counter
const { counter } = require('./module-B');

// What is going to be printed in console?
console.log(counter); // 1
