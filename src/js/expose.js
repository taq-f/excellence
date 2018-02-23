/**
 * ES6 modules export (for example, "export default xxxxx") results in
 * something like `{ _es6module: true, default: \/* actual exported module *\/ }`
 * when webpacked as exposed library (`libraryTarget: 'var'`). This makes the library
 * users to write `MyApp.default.exportedFunction()` instead of `MyApp.exportedFunction`.
 * 
 * To fix this problem, prepare a wrapper (this module) that imports what to be
 * exposed and exports them in nodeJS `module.exports` style.
 * 
 * Build entry of webpack should be this module.
 */

const app = require('./app');

module.exports = {
    initialize: app.default,
};
