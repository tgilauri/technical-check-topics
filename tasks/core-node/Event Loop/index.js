const { readFile, createReadStream } = require('fs');

console.log(1);

setTimeout(() => {
  console.log(2);
}, 0);

setImmediate(() => {
  console.log(3);
});

readFile('./index.js', {}, () => {
  console.log(4);
});

createReadStream('./index.js')
  .on('data', () => {})
  .on('end', () => console.log(5));

const promise = new Promise((res) => {
  console.log(6);
  res();
});

promise.then(() => {
  console.log(7);
});

process.nextTick(() => console.log(8));

console.log(9);
