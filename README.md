

#### 1) What is the difference between var, let, and const?

**Answer:**

The main differences are:

- **var**: Function-scoped, can be redeclared and reassigned. Gets hoisted.
- **let**: Block-scoped, can be reassigned but not redeclared in same scope.
- **const**: Block-scoped, cannot be reassigned or redeclared. Must be initialized.

```javascript
var name = "Jim";    
let age = 25;         
const city = "Khulna"; 

if (true) {
  var x = 1;  
  let y = 2;  
}
```

#### 2) What is the difference between map(), forEach(), and filter()? 

**Answer:**

These are array methods that do different things:

- **map()**: Creates a new array by transforming each element
- **forEach()**: Just loops through each element (doesn't return anything)
- **filter()**: Creates a new array with elements that pass a test

```javascript
const numbers = [1, 2, 3, 4];

const doubled = numbers.map(x => x * 2);       
numbers.forEach(x => console.log(x));           
const evens = numbers.filter(x => x % 2 === 0);
```

#### 3) What are arrow functions in ES6?

**Answer:**

Arrow functions are a shorter way to write functions. They use `=>` instead of the `function` keyword.

```javascript
function add(a, b) {
  return a + b;
}

const add = (a, b) => a + b;

const double = x => x * 2;

const sayHi = () => "Hello!";
```

The main difference is that arrow functions don't have their own `this` - they inherit it from the surrounding code.

#### 4) How does destructuring assignment work in ES6?

**Answer:**

Destructuring lets you unpack values from arrays or objects into separate variables. It's like taking things out of a box.

```javascript
const colors = ['red', 'blue', 'green'];
const [first, second] = colors; 

const person = { name: 'Jim', age: 25 };
const { name, age } = person;   

const { name: personName } = person;  
```

#### 5) Explain template literals in ES6. How are they different from string concatenation?

**Answer:**

Template literals use backticks (`) instead of quotes and let you insert variables directly into strings using `${variable}`.

```javascript
const name = 'Sarah';
const age = 25;

const message1 = 'Hi, I am ' + name + ' and I am ' + age + ' years old.';

const message2 = `Hi, I am ${name} and I am ${age} years old.`;

const poem = `Roses are red
Violets are blue
Template literals
Are awesome too!`;
```

Template literals are cleaner, easier to read, and you can even do math inside them: `${5 + 3}` gives you 8.
