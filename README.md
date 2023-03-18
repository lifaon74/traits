[![npm (scoped)](https://img.shields.io/npm/v/@lifaon/traits.svg)](https://www.npmjs.com/package/@lifaon/traits)
![npm](https://img.shields.io/npm/dm/@lifaon/traits.svg)
![NPM](https://img.shields.io/npm/l/@lifaon/traits.svg)
![npm type definitions](https://img.shields.io/npm/types/@lifaon/traits.svg)

## 🏗️ Traits

- 😢 Ever felt limited by ES classes ?
- 👿 Sometimes you feel stuck because of the lack of multi-inheritance
- 😰 Do you feel constrained by the `this` keyword ?
- 🔨 Do you want better private/protected properties ?

Well this library is perfect for you 🦸.

A **trait** is simply a set of named functions (called methods) grouped into an object.

They are mostly used for complex inheritance (like multi-inheritance, polymorphism) and with objects sharing their methods.

It's some kind of *framework* for objects and methods.

## 📦 Installation

```bash
yarn add @lifaon/traits
# or
npm install @lifaon/traits --save
```

## 🛠️ Example

We'll imagine a class `Number` that mimics the javascript numbers, and provides some operations like `addition`, etc...

The file structure:

- `number/`: contains all the files for such a Number class
  - `number.trait-collection.ts` : the definition of this Number class
  - `traits/`: contains all the traits for this class
    - `add/`: contains the definition of the `add` trait
      - `add.function-definition.ts`: contains the definition of the `add` function
      - `add.trait.ts`: contains the definition of the `add` trait
  - `implementations/`: contains one or more implementation of the `number.trait-collection.ts` interface
    - `create-number.ts`: creates a Number instance

### Definition of the add function

First we have to define an `add` function:

```ts
// number/traits/add/add.function-definition.ts
export interface IAddFunction<GValue, GReturn> {
  (
    value: GValue,
  ): GReturn;
}
```

It accepts a value and return another one.
This is just an interface (type) for a function.

### Definition of the add trait

Then we have to define the `add` trait:

```ts
// number/traits/add/add.trait.ts
export interface IAddTrait<GValue, GReturn> {
  add: IAddFunction<GValue, GReturn>;
}
```

This is too just an interface: an object must have an `add` property that implements the `IAddFunction`.

### Collection or traits

Instead of having a class, we'll continue with pure interfaces:

```ts
// number/number.trait-collection.ts
export interface INumber extends // 
  IValueOfTrait<number>,
  IAddTrait<INumber, INumber>
  //
{
}
```

An `INumber`, is simply an interface which imposes properties (here our traits).
We'll call it a `trait collection`.

In this case, we juste asked for a `valueOf` and `add` property, but we may extend it with many more like `substract`, `multiply` etc...

### Implementation of a trait

The last step is to create an `implementation` of our `INumber`:

```ts
// number/implementations/create-number.ts

export function createNumber(
  value: number,
): INumber {
  const valueOf = (): number => {
    return value;
  };

  const add = (
    num: INumber,
  ): INumber => {
    return createNumber(value + num.valueOf());
  };

  return {
    valueOf,
    add,
  };
}
```

So at the end, we don't use classes, but we build directly objects (the instance of a class).
For this we use a function which builds the properties (the traits), and create an object implementing them.

### Test it

```ts
// main.ts

function main(): void {
  const a = createNumber(1);
  const b = createNumber(2);
  const c = a.add(b);
  console.log(c.valueOf()); // 3
}

main();
```

[//]: # (### Conclusion)

[//]: # ()

[//]: # (This library provides a framework to creates object structures that are not limited)

## FAQ

> Do I need typescript ?

YES it's mandatory because traits ARE interfaces that we implement. They are not actual code we run, but just type definitions.

> Why no classes ?

Because ES classes doesn't support multi-inheritance nor flexibility.
For example, you cannot call the constructor of an ES class with a different `this`, nor use `this` before the `super(...)` call,
because of natural and perfectly valid constraints on classes, and OOP.
However, this may easily limit our creativity especially when we want intentionally to have multi-inheritance, diamond shapes, or custom constructors
(ex: extend an Array and having `.map` returning an instance of our class instead of an Array).

Hopefully, the ES objects don't have these limits: you can assign to the objects all the properties you want.
And this is exactly what we'll do to create instances instead of using classes.

> This fells so wrong.

First I was sceptical, but in reality this is far more powerful:

- creating objects from scratch instead of creating an instance of a class, is as fast in both cases, thanks to the insane improvements of the javascript engines.
- variables are truly private as they belong only to the scope of the function creating the instance of our object.
- we have the full control of the implementation of our traits: it's possible to pick functions from "child classes", override some, define custom methods, etc...
  without the constraints of the `this` nor `super` keywords.

> How can I create properties that are not functions ?
> ex: { value: number }

This is not possible, let me explain why:

First, we need to differentiate the `data` from the `functions`:

- The `data` contains all the variables that an instance requires **internally**. They are similar to a `struct` in C.
  In the example of our `INumber`, this is the incoming `value: number`.
  All these data are **private**, and only limited to the scope of the function creating the instance.
  This way, there is no leak nor conflict with the properties of some "mother classes".
- The `functions` use these data to perform some actions. However, the data are never directly exposed. This is the equivalent of a `method` on a class.

In consequence, an object contains only properties being functions (we could compare them to methods). So if we want to access a specific value in the `data`.
We need to create a `getXXX` function:

```ts
export interface IGetValueFunction {
  (): number;
}

export interface IGetValueTrait {
  getValue: IGetValueFunction;
}

export interface INumberExtended extends INumber, //
  IGetValueTrait {
}

export function createNumberExtended(
  value: number,
): INumberExtended {
  const numberInstance: INumber = createNumber(value);

  const getValue = numberInstance.valueOf;

  return {
    ...numberInstance,
    getValue,
  };
}
```

The same is true for setters. 

The seconds point, is that, using only functions instead of getter/setters, limits the possibilities of side effects.

For example, a getter may return different values on two consecutive calls, without setting/updating the value between.
By design, it means an undefined behaviour. However, using only functions, developer know that something happen (computed property, etc...), and may expect different results.

> How can I do single/multi-inheritance ?

Because we just create objects instead of classes this is extremely easy. Check the example above.

> What about instanceof ?

Usually, you won't require it because everything is typed: if something implements an interface, we may consider that it is an instance of it.

However, with union types, you may implement some kind of `isXXXType(): boolean` for example (ex: `isNumberType(): boolean`).

