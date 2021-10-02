const EventEmitter = require('events');

const debounce = (cb, timeout) => {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => cb(...args), timeout);
  };
};

const emitter = new EventEmitter();

let counter = 0;

emitter.on(
  'event',
  debounce(() => {
    counter++;
  }, 2000)
);

emitter.emit('event');

setTimeout(() => {
  emitter.emit('event');
}, 500);

emitter.emit('event');

process.on('exit', () => console.log('Counter: ', counter, counter === 1));
