//dev keys

if (process.env.NODE_ENV === 'production') {
  //prod env
  module.exports = require('./prod.js');

} else {
  //dev env --> get the keys from dev.js and export to whoever requests them
  module.exports = require('./dev.js');
}