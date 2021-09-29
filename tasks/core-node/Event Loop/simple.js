console.log(1);

setTimeout(() => {
  console.log(2);
  process.nextTick(() => console.log('next tick'));
}, 0);

setImmediate(() => {
  console.log(3);
});

const promise = new Promise((res) => {
  console.log(4);
  res();
});

promise.then(() => {
  console.log(5);
});

process.nextTick(() => console.log(6));

console.log(7);

// 1, 4, 7, 6, 5, 2, 3,
