const module1 = require('./module1');

console.log(module1);

// const module2 = require('module2');

// console.log(module2);

const Module3 = require('./module3');
const sayName = new Module3('Lee');
sayName.show();