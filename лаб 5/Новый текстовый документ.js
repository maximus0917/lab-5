//1
function average(...args) {
  return args.reduce((acc, val) => acc + val, 0) / args.length;
}
//2
function values(f, low, high) {
  const result = [];
  for (let i = low; i <= high; i++) {
    result.push(f(i));
  }
  return result;
}
//3
function callWithContext(obj, callback) {
  callback.call(obj);
}

const person = {
  name: 'John',
  age: 25,
  birthday() {
    const today = new Date();
    console.log(`Today is ${today}! Happy birthday ${this.name}.`);
  }
}

callWithContext(person, person.birthday);
//4
function createCounter() {
  let count = 0;
  
  return {
    increment() {
      count++;
    },
    getValue() {
      return count;
    }
  }
}

//5
function getGreeting(name) {
  if (getGreeting.cache && getGreeting.cache.name === name) {
    return getGreeting.cache.result;
  }
  
  const result = `Hello ${name}`;
  getGreeting.cache = { name, result };
  return result;
}

getGreeting.cache = null;

//6
function add(x) {
  return function(y) {
    return x + y;
  }
}

const add5 = add(5);
console.log(add5(3)); // 8
console.log(add5(7)); // 12
console.log(add(2)(4)); // 6
//7
function isIncluded(arr) {
  return function(str) {
    return arr.includes(str);
  }
}

const fruits = ['apple', 'banana', 'orange'];
const includesFruit = isIncluded(fruits);

console.log(includesFruit('apple')); // true
console.log(includesFruit('pear')); // false

//8
const data = [
  { name: 'john', age: 25 },
  { name: 'jane', age: 30 },
  { name: 'peter', age: 40 },
];

const capitalizeName = arr => arr.map(({ name, ...rest }) => ({ name: name.charAt(0).toUpperCase() + name.slice(1), ...rest }));

const capitalizedData = capitalizeName(data);

console.log(capitalizedData);
/*
[
  { name: 'John', age: 25 },
  { name: 'Jane', age: 30 },
  { name: 'Peter', age: 40 },
]
*/
//9
const person = {
  name: 'John',
  age: 30,
  greet: function() {
    console.log(`Hello, my name is ${this.name} and I'm ${this.age} years old.`);
  },
};

const greetWithCall = person.greet.call({ name: 'Jane', age: 25 });
// "Hello, my name is Jane and I'm 25 years old."

const greetWithApply = person.greet.apply({ name: 'Peter', age: 40 });
// "Hello, my name is Peter and I'm 40 years old."

const greetWithBind = person.greet.bind({ name: 'Sarah', age: 35 });
greetWithBind();
// "Hello, my name is Sarah and I'm 35 years old."
//10
function callWithLog(callback, ...args) {
  const functionName = callback.name || 'anonymous';
  const timestamp = new Date().toLocaleString();
  console.log(`${functionName} called with arguments ${args} at ${timestamp}`);
  callback(...args);
}

function add(x, y) {
  console.log(x + y);
}

callWithLog(add, 2, 3);
// "add called with arguments 2,3 at 4/16/2023, 1:30:00 PM"
// 5

//11
function cachedFunction(func) {
  let cache;
  let lastCallTime = 0;
  return function(...args) {
    const currentTime = new Date().getTime();
    if (cache && currentTime - lastCallTime < 10000) {
      return cache;
    }
    cache = func(...args);
    lastCallTime = currentTime;
    return cache;
  }
}

