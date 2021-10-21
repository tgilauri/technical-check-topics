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
      this.parent.on(REJECTED, (error) => {
        this.value = error;
        this.runCatchCb();
      });
    }
  }

  res(value) {
    this.state = FULFILLED;
    this.value = value;
    this.emit(FULFILLED);
  }

  rej() {
    this.state = REJECTED;
    this.emit(REJECTED);
  }

  then(cb) {
    this.thenCb.push(cb);
    if (this.state !== FULFILLED) {
      this.on(FULFILLED, () => this.runThenCb());
    } else {
      this.runThenCb();
    }
  }

  catch(cb) {
    this.catchCb.push(cb);
    if (this.state !== REJECTED) {
      this.on(REJECTED, () => this.runCatchCb());
    } else {
      this.runCatchCb();
    }
  }

  runThenCb() {
    for (const key in this.thenCb) {
      const cb = this.thenCb.shift();
      try {
        const nextPromise = new Promize(null, this);
        this.value = cb(this.value);
      } catch (e) {
        this.value = e;
        return this;
      }
    }
  }

  runCatchCb() {
    for (const key in this.catchCb) {
      const cb = this.catchCb.shift();
      try {
        this.value = cb(this.value);
        return this;
      } catch (e) {
        this.value = e;
        return this;
      }
    }
  }
}

const promise = new Promize((res, rej) => {
  setTimeout(res, 2000);
});
