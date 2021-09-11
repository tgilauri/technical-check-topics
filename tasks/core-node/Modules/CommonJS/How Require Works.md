## Step 1
Invoke with makeRequireFunction(module) where |module| is the Module object
to use as the context for the require() function.
Use redirects to set up a mapping from a policy and restrict dependencies

## Step 2
Check the cache for the requested file.
 1. If a module already exists in the cache: return its exports object.
 2. If the module is native and is available to be required by users: 
   call `NativeModule.prototype.compileForPublicLoader()` and return the exports.
 3. Check if module is a package from node modules by 
   check if path do not starts with dot: `charAt(0) !== '.'` 
   or if second char isn't dot or slash: `charAt(1) !== '.'` and `charAt(1) !== '/'`
 4. Otherwise, go up in the path and find a closest `package.json' to identify package
 5. Otherwise, create a new module for the file and save it to the cache.
   Then have it load  the file contents before returning its exports
   object.

