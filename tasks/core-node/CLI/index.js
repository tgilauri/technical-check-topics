// How to run script
// node ./index.js

// how to provide env variables
// ENV_VAR_NAME=env_var_value node ./index.js

// how to provide node options
// does node options visible in arguments array? No
// node --flag --option-name=option-value ./index.js

// how to provide application arguments
// node ./index.js --any-application-options=pass-as-array-of-strings

// How to get env variables
console.log(process.env['NAME_OF_THE_VAR']);

// How to get application arguments
console.log(process.argv);
