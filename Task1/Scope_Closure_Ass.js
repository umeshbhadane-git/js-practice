// Write a createCounter() function that returns an object with increment, decrement and 
// getValue methods. The count must not be accessible from outside.

function createCounter(){
    let count = 0;

    return {

        increment(){
            count++;
        },

        decrement(){
            count--;
        },

        getValue(){
            return count;
        }
    }
}

let counter = createCounter();

console.log(counter.getValue());      // 0

counter.increment();
console.log(counter.getValue());      // 1

counter.increment();
console.log(counter.getValue());      // 2

counter.decrement();
console.log(counter.getValue());      // 1

console.log(counter.count);           // undefined

// ------------------------------------------------------------------------------------

// Write a once(fn) function that ensures fn is called only the first time.

function once(fn){
    let flag  = false;

    return function(...args){
        if(!flag){
            flag = true;
            fn(...args);
        }
    }
}

function sayHello(name){
    console.log(`Hello ${name}`);     // execute only once
}

function sayHii(name){
    console.log(`Hii ${name}`);       // execute only once
}

const helloOnce = once(sayHello);
const hiiOnce = once(sayHii);

helloOnce("Umesh");      // Hello Umesh
helloOnce("Omkar");      // not called
helloOnce("Karan");      // not called

hiiOnce("Umesh");        // Hii Umesh
hiiOnce("Omkar");        // not called
hiiOnce("Karan");        // not called

//--------------------------------------------------------------------------------------

// Write a memoize(fn) that caches results based on arguments.

function memoize(fn) {
  const cache = {};

  return function (value) {

    if (cache[value] !== undefined) {
      return cache[value];
    }

    const result = fn(value);
    cache[value] = result;
    console.log(cache);
    return result;
  };
}

const square = memoize(function (number) {
  console.log("Calculating...");
  return number * number;
});

console.log(square(5));      // 25
console.log(square(2));      // 4
console.log(square(5));      // 25

// ----------------------------------------------------------------------------

// Given the classic for loop closure trap with var, fix it in three different ways 
// (let, IIFE, setTimeout with third arg).

for (var i = 1; i <= 3; i++) {
    setTimeout(function () {
        console.log(i);
    }, 1000);
}

// 1st Way

for (let i = 1; i <= 3; i++) {
    setTimeout(function () {
        console.log(i);
    }, 1000);
}

// 2nd Way

for (var i = 1; i <= 3; i++) {
    
    (function(value){

        setTimeout(function () {
            console.log(value);
        }, 1000);

    }
    )(i);

}



// 3rd Way

for (var i = 1; i <= 3; i++) {

    setTimeout(function (value) {
        console.log(value);
    }, 1000, i);

}
