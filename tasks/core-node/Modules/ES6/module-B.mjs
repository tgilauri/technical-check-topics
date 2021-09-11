export const B = 1;

// during the import class is named by exported name. Here is going to be named as default
export default class {
  prop = 'Anonymous class';
}

// during the import class is named by exported name. Here is going to be named as AnotherAnonymousClass
export const ExportedAnonymousClass = class {};

// Named classes has its own name despite the name of an export
export const ExportedNamedClass = class NamedClass {};

export const NamedExportToBeImportedAlongsideDefault = 'NamedExportToBeImportedAlongsideDefault';

class StaticCounterClass {
  static staticCounter = 0;
  instanceCounter = 0;


  constructor() {
    StaticCounterClass.staticCounter++;
  }

  showStaticCounter() {
    console.log(StaticCounterClass.staticCounter);
  }

  showInstanceCounter() {
    console.log(this.instanceCounter);
  }

  increment() {
    this.instanceCounter++;
  }
}

export const ClassWithStaticCounter = new StaticCounterClass();
