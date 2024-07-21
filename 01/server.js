// How NodeJS differs from VanillaJS
// 1) Node runs on a server - not in a browser (backend not frontend)
// 2) the console is the terminal window
console.log('HELLO WORLD')
// 3) global object instead of window object
// console.log(global);
// 4) have common core modules
// 5) commonJS modules instead of ES6 modules
// 6) Missing some JS APIs like fetch

const os = require('os');
const path = require('path');
// const math = require('./math');
const {add, multiply, subtract, divide} = require('./math');


// console.log(math.add(2, 3));
console.log(add(2, 3));
console.log(subtract(2, 3));
console.log(multiply(2, 3));
console.log(divide(2, 3));
/*
console.log(os.type());
console.log(os.version());
console.log(os.homedir());

console.log(__dirname);
console.log(__filename);

console.log(path.dirname(__filename));
console.log(path.basename(__filename));
console.log(path.extname(__filename));

console.log(path.parse(__filename));
*/
