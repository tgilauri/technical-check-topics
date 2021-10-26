const { EventEmitter } = require('events');

const FULFILLED = 'fulfilled';
const REJECTED = 'rejected';

class Promize extends EventEmitter {
  state = 'pending';
  value = undefined;
  thenCb = [];
  catchCb = [];
  parent = null;

  constructor(initialize, parent) {
    super();
    if (initialize) {
      initialize(this.res.bind(this), this.rej.bind(this));
    }
    if (parent) {
      this.parent = parent;
      this.parent.on(FULFILLED, (data) => {
        this.value = data;
        this.runThenCb();
      });
    }
  }

  res(value) {
    this.state = FULFILLED;
    this.value = value;
    this.runThenCb();
  }

  rej(error) {
    this.state = REJECTED;
    this.value = error;
    this.runCatchCb();
  }

  then(cb) {
    this.thenCb.push(cb);
  }

  catch(cb) {
    this.catchCb.push(cb);
  }

  runThenCb() {
    while (this.thenCb.length > 0) {
      const cb = this.thenCb.shift();
      this.value = cb(this.value);
    }
  }

  runCatchCb() {
    for (const key in this.catchCb) {
      const cb = this.catchCb.shift();
      this.value = cb(this.value);
    }
  }
}

const promise = new Promize((res) => {
  setTimeout(res, 2000);
});

promise.then(() => console.log('resolved'));
promise.then(() => console.log('resolved second time'));
