// index.js

const isPrime = require('./isPrime');

const numbers = [2, 10, 17, 21, 29, -5, "hello", 1.5];

numbers.forEach((num) => {
  console.log(isPrime(num));
});