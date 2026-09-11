
// 1. From an array of numbers, get the sum of squares of even numbers.

let num = [1,2,3,4,5,6,7,8,9,10];

let ans1 = num.filter(x => x % 2 === 0).reduce((sum, x) => sum + x**2,0);

console.log(ans1);

// ----------------------------------------------------------------------------

// 2. From an array of user objects { name, age, city }, return an object grouping users by city.

let users = [
    { name: "Umesh", age: 23, city: "Pune" },
    { name: "Rahul", age: 20, city: "Mumbai" },
    { name: "Amit", age: 21, city: "Mumbai" },
    { name: "Karan", age: 22, city: "Pune" },
    { name: "Omkar", age: 22, city: "Nashik" },
];

let ans2 = users.reduce((obj, user) => {

        if(!obj[user.city])
        {
            obj[user.city] = [];
        }

        obj[user.city].push(user);
        return obj;

    },{});

console.log(ans2);

// ----------------------------------------------------------------------------

// 3. Flatten a deeply nested array without using .flat(Infinity) (write it yourself with recursion).

const arr = [
    1, 
    [2, 3], 
    [4, [5, 6]], 
    [[7, [8]]]
];

// let ans3 = arr.flat(Infinity)

function flattenDeep(array) {
  return array.reduce((result, item) => {
    if (Array.isArray(item)) {
      return result.concat(flattenDeep(item));
    }
    result.push(item);
    return result;
  }, []);
}

const ans3 = flattenDeep(arr);
console.log(ans3);

// ----------------------------------------------------------------------------

// 4. Given two arrays, return the intersection.

let arr1 = [1,2,3,4,5];
let arr2 = [3,4,5,6,7];

let intersection = arr1.filter(x => arr2.includes(x));
console.log(intersection);

// ---------------------------------------------------------------------------------------------

// 5. Given an array of transactions { amount, type: "credit" | "debit" }, compute the running balance.

let transactions = [
    { amount: 1000, type: "credit" },
    { amount: 200, type: "debit" },
    { amount: 500, type: "credit" },
    { amount: 700, type: "debit" },
  ];
    
const runningBalance = transactions.reduce((balances, transaction) => {
    const previousBalance = balances.length
        ? balances[balances.length - 1]
        : 0;

    const newBalance = transaction.type === "credit"
        ? previousBalance + transaction.amount
        : previousBalance - transaction.amount;

    balances.push(newBalance);

    return balances;
}, []);

console.log(runningBalance);