// How does import works?
// https://exploringjs.com/es6/ch_modules.html

console.group('Basic syntax')

// What happened if use B before import? Answer: import statement floats to the top. B is available
console.group('Imports are floats and values are available before import statement.')

console.log(B); // 1

console.groupEnd();

// Named import
import { B, ExportedNamedClass, ExportedAnonymousClass } from './module-B.mjs';

// Default import. default is just another named import having reserved name `default`
import Default from './module-B.mjs';

console.group('Just console values of the named import B')

console.log(B); // 1

console.groupEnd();

// Anonymous classes or functions has a name they were exported with.

// default exported anonymous class has name `default`
console.group('Log name of the anonymous class exported as default')

console.log(Default.prototype.constructor.name); // default

// ExportedAnonymousClass is anonymous and has name of the export
console.log(ExportedAnonymousClass.prototype.constructor.name); // ExportedAnonymousClass

console.groupEnd();


// Named class has its own name despite the name of an export
console.group('Log name of the class named `NamedClass` exported with name `ExportedNamedClass`')

console.log(ExportedNamedClass.prototype.constructor.name); // NamedClass

console.groupEnd();

// How to import default along with named import

import {default as NamedInHere, NamedExportToBeImportedAlongsideDefault} from './module-B.mjs';
import DefaultAlongWithNamed, {NamedExportToBeImportedAlongsideDefault as ImportedAlongTheDefault} from './module-b.mjs';

console.log();

// Single instance class export
console.group('Single instance class export');

import {ClassWithStaticCounter} from './module-B.mjs';

console.group('Show static counter after the first import');

ClassWithStaticCounter.showStaticCounter(); // 1

console.groupEnd();

import {ClassWithStaticCounter as Instance1} from './module-B.mjs';
import {ClassWithStaticCounter as Instance2} from './module-B.mjs';
import {ClassWithStaticCounter as Instance3} from './module-B.mjs';

console.group('Show static counter after import the instance three times');

Instance1.showStaticCounter(); // 1
Instance2.showStaticCounter(); // 1
Instance3.showStaticCounter(); // 1

console.groupEnd();

// Increment instance counter. Shows that this is a single instance
console.group('Instance counter incremented by different imported reference. Shows that this is a single instance.')
Instance1.increment();
Instance1.showInstanceCounter(); // 1

Instance2.increment();
Instance2.showInstanceCounter(); // 2

Instance3.increment();
Instance3.showInstanceCounter(); // 3

console.groupEnd();

console.groupEnd();

