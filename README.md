[![npm (scoped)](https://img.shields.io/npm/v/@lifaon/traits.svg)](https://www.npmjs.com/package/@lifaon/traits)
![npm bundle size (scoped)](https://img.shields.io/bundlephobia/minzip/@lifaon/traits.svg)
![npm](https://img.shields.io/npm/dm/@lifaon/traits.svg)
![NPM](https://img.shields.io/npm/l/@lifaon/traits.svg)
![npm type definitions](https://img.shields.io/npm/types/@lifaon/traits.svg)


## Traits ##

To install:
```bash
yarn add @lifaon/traits
# or 
npm i @lifaon/traits --save
```

Entry point: `index.js`, others files contains internally used functions or methods. I recommend you to use rollup to import/bundle the package,
but you may use an already bundled version in `bundles/`.

You may also use unpkg: `https://unpkg.com/@lifaon/traits`

- [esnext, minified, gzipped, core version](https://unpkg.com/@lifaon/traits@1.0.0/bundles/traits.esnext.core.umd.min.js) is less than 2.3KB !
- [esnext, minified, gzipped version with build in traits](https://unpkg.com/@lifaon/traits@1.0.0/bundles/traits.esnext.umd.min.js) is less than 3.2KB.

**WARNING:** This library reached a certain level of maturity, and is safe to use.
However, I won't recommend using it for organization work, as it may still evolve.

[SOME EXAMPLES HERE]: <>(./examples/README.md)

### Table of contents ###
<!-- toc -->

- [Definition](#definition)
- [For who ?](#for-who-)
- [Motivation](#motivation)
- [Example: NumberLike](#example-numberlike)
  * [Trait](#trait)
  * [Extend a Trait](#extend-a-trait)
  * [Data structure](#data-structure)
  * [Implementation](#implementation)
  * [NumberLike to the rescue](#numberlike-to-the-rescue)
  * [Testing NumberLike](#testing-numberlike)
- [API](#api)
  * [Trait decorator](#trait-decorator)
  * [Impl decorator](#impl-decorator)
  * [ApplyTraitImplementation](#applytraitimplementation)
  * [AssembleTraitImplementations](#assembletraitimplementations)
  * [OverrideTraitImplementations](#overridetraitimplementations)
  * [TraitIsImplementedBy](#traitisimplementedby)
  * [TraitsAreImplementedBy](#traitsareimplementedby)
    

### Definition

<details>
<summary>show</summary>
<p>

A trait is a collection of methods that can be implemented on any data type (usually objects or classes).

It doesn't have any internal state (attributes), instead it may only use properties from the object which implements this trait and own methods.

It is intended to reduce some limitations of single inheritance by enabling developers to reuse sets of methods freely in several independent classes living in different class hierarchies.

</p>
</details>


### For who ?

<details>
<summary>show</summary>
<p>

**Try them if:**

- you want to provide a well-defined and very strong typed library, based on classes
- you want reusable methods across various classes, and mixins and factories are not enough for you
- you want to share your lib piece by piece and let the user choose which part they want (allows very efficient tree shacking and minification)
- you want to hide or externalize the internal logic of your classes

**You probably don't need them if:**

- you aim for fast coding: traits are verbose, and require strict typing to be more efficient.
- your code is not a library (ex: ux, component, server script, etc.)

Traits enforce you to code in a very strict manner, which is perfect for library authors requiring a strict framework and typing
to avoid errors and bugs (of course completed by tests). It's important when they are sometimes shared with millions of users.
In another hand, Traits are not recommended for typical organization work (building ux component, application, etc...).

</p>
</details>

### Motivation

<details>
<summary>show</summary>
<p>

Javascript is a really flexible language:
classes inheritance works with prototypes which allows us to do practically everything in OO,
but working directly with the `prototype` is usually hazardous, hard to read and understand, very verbose,
and is not an easy task when you want to create a proper class (at least for new js developers).

There came ES6, which introduced classes and helped a lot to manage the constructor, properties, methods and inheritance.
It's a far better, easier, and more legible way to work that the previous `prototype` approach.

Sadly ES6 classes doesn't permit multi inheritance, nor sharing identical methods accros many classes.

In some cases (mostly when you build a library for other developers), multi inheritance is required.
For this, two common workaround exist:

- `Mixins` are classes with a potential internal state, constructor, etc... => you copy their properties on your child classes
    - limits:
        - shared properties may conflict (especially prefixed private ones like `_attribute`)
        - the constructor may return a different `this`, meaning different `this` accros parent mixins, resulting in invalid properties assignation
        - you need to keep track of which mixins you've implemented on your classes if you need something similar to `instanceof`
- `Factories` are functions returning a class having its own state and methods and extending a base class
=> you chain your factories to build your final class
    - it solves the problem of the `this` we've seen with mixins
    - but... every other problems remain (conflict on properties, instanceof, etc...)


I explored intensely both of these solutions, writing many libraries using these patterns, but each time, I faced their limits and was not totally satisfied.

In my mind, I wanted something able to share methods across multiple classes, avoiding code duplication sometimes,
and the possibility to implement only the methods I needed, reducing drastically the final build
(ex: if someone doesn't use the method `doSomething()`, then it should not be part of the class, meaning not in the final script)
=> something like the legos: you build yourself your classes based on bricks (here: methods).

---

Other languages like *rust*, *php*, or many others have found a solution to this: `Traits`

I'll speak more about [rust traits](https://doc.rust-lang.org/book/ch10-02-traits.html) because I find their approach very elegant:

- on one side, you have the data: a structure with properties which contains some data and nothing else
- on the other side, you have the traits: a collection of methods. It may be specialized for a specific structure of data, or kept generic.

Then, you tell the program that your data structure implements `traitA`, `traitB`, etc...
and when you write `data.someMethod().anotherMethod()` it somehow does `anotherMethod(someMethod(data))`.
It's important to note that *the data doesn't carry the methods* (as opposed to javascript, where class instances have methods from the prototype chain),
instead the functions are revolved by the types.

At the end, it's very different of our traditional OO approach with classes, inheritance, etc... but it's actually very cleaver.

I wanted to have the same possibilities on javascript, so I wrote a POC in Typescript (works too in javascript, but typing is pretty important for Traits).

</p>
</details>

---

### Example: NumberLike

Let me introduce you to this lib through an example: building a wrapper around a number.
This example is probably useless in itself, but it's very simple and perfect to learn Traits.

#### Trait

As seen earlier, a Trait is simply a collection of methods.

The basic operations on numbers are: `+ - / *`. We will create some Traits for them:

```ts
@Trait()
export abstract class TraitAdd<GSelf, GValue = GSelf, GReturn = GSelf> {
  abstract add(this: GSelf, value: GValue): GReturn;
}
```

A Trait has the following constraints:

- **it must have the `Trait` decorator** - this is used to register this class as a Trait.
- **it must be an abstract class** - a trait is not constructible, so **it must not have any constructor** neither.
- **it must contain only methods** - the state come from the object invoking the method, not from the trait.

`TraitAdd` may be a little confusing, so let's clarify it:

In most of the cases, you want your Traits to be as must generic as possible.
For example, the `TraitAdd` may apply for *numbers*, *bigints*, *vectors*, etc...

So, **every Trait should have a `GSelf` as first generic**, used to type the `this`.
And, because we don't known in advance the incoming and outgoing values, we will define them as generics too.

For simplicity, common Traits may be found in the [built-in-traits](./src/built-in-traits) folder.
We will use the [built-in-traits/arithmetic](./src/built-in-traits/arithmetic)'s ones in the following examples.

#### Extend a Trait

Usually, there is more than one way to obtain equivalent results.
For example, a subtraction, may be written as `add(num1, negate(num2))`.

This may be useful if an object implements the `TraitAdd` and `TraitNegate` but lacks of a proper implementation of the `TraitSubstract`.

So here is the definition of a Trait using this approach and extending `TraitSubstract`:

```ts
@Trait()
export abstract class TraitSubtractUsingAddAndNegate<GSelf extends TraitAdd<GSelf, any, any>, GValue extends TraitNegate<GValue, TInferTraitAddGValue<GSelf>>> extends TraitSubtract<GSelf, GValue, TInferTraitAddGReturn<GSelf>> {
  subtract(this: GSelf, value: GValue): TInferTraitAddGReturn<GSelf> {
    return this.add(value.negate());
  }
}
```

The typing may be a little freaky so let's stop on it a few minutes:

- `GSelf extends TraitAdd<GSelf, any, any>`: the incoming `this` must implement `TraitAdd`
- `GValue extends TraitNegate<GValue, TInferTraitAddGValue<GSelf>>`: the incoming `value` must implement `TraitNegate`,
and calling this method must return the proper type expected by `this.add`
- `TInferTraitAddGReturn<GSelf>`: returned type of the `TraitAdd` of `GSelf`

Yes, the typing is probably confusing and may seem complex. Here I strongly typed my Traits,
but it's up to you to type them loosely, even if I don't recommend it: it will help you to avoid errors when implementing your Traits.


#### Data structure

We've defined some very generic Traits. Now we will create a data structure able to use them.

Let's create a wrapper around a `number`:

```ts
export interface INumberStruct {
  value: number;
}
```

Note that our structure is simply an object. It may be a plain object `{ value: 1 }`, or the instance of a class `NumberLike` for example.


#### Implementation

An Implementation, is the implementation of a Trait for a specific data structure.

```ts
@Impl()
export class ImplTraitAddForNumberStruct<GSelf extends INumberStruct> extends TraitAdd<GSelf, INumberStruct, INumberStruct> {
  add(this: GSelf, value: INumberStruct): INumberStruct {
    return { value: this.value + value.value };
  }
}
```

An Implementation has the following constraints:

- **it must have the `Impl` decorator** - this is used to register this class as an Implementation.
- **it must extend a Trait** - an Implementation is always for a specific Trait.
- **it must be a non abstract class**
- **it must contain only methods**
- **it must implement all the abstract methods defined in the extended trait**
- **it must not have any constructor** - like Traits, an Implementation is not constructible

**INFO:** as you may see, our Implementation returns a `INumberStruct`, meaning we won't be able to chain the operations:
`num.add({ value: 5 }).add({ value: 6 })` => NOPE. We will solve this problem.

#### NumberLike to the rescue

Let's modify our previous implementation to return a more complex object:

```ts
@Impl()
export class ImplTraitAddForNumber<GSelf extends INumber> extends TraitAdd<GSelf, INumberStruct, INumber> {
  add(this: GSelf, value: INumberStruct): INumber {
    return new NumberLike(this.value + value.value);
  }
}
```

And the definition of `INumber`:

```ts
export interface INumber extends INumberStruct,
  ImplTraitAddForNumber<INumber>
{}
```

So `INumber` is simply a `INumberStruct` which implements `TraitAdd`

Now we need to create a class based on `INumber`: 

```ts
// defines the shape of the class using our Implementations
export interface IAssembledNumberImplementations {
  new(): INumber;
}

// list of our implementations for INumber; currenly we just have one
export const NumberImplementationsCollection = [
  ImplTraitAddForNumber,
];

// creates a class which implements all of our Implementations
const AssembledNumberImplementations = AssembleTraitImplementations<IAssembledNumberImplementations>(NumberImplementationsCollection);

// creates NumberLike: a class implementing our Implementations having the shape of INumberStruct
export class NumberLike extends AssembledNumberImplementations implements INumber {
  value: number;

  constructor(value: number) {
    super();
    this.value = value;
  }
}
```

The important part is `AssembleTraitImplementations`. This function merges a list of Implementations as a class.
Then you can create any child class extending the result of the merge, and it will implement all the Traits and methods.

#### Testing NumberLike

```ts
export function testNumberLike() {
  const num1 = new NumberLike(1);
  const num2 = new NumberLike(2);
  const num3 = new NumberLike(3);

  console.log(num1.add(num2)); // NumberLike(3)
  console.log(num1.add(num2).add(num3)); // NumberLike(6)
  console.log(num1.add({ value: 20 })); // NumberLike(21)
  console.log(TraitIsImplementedBy(TraitAdd, num1)); // true
}
```

[sources](./src/examples/number-like.ts)

### API

#### Trait decorator

```ts
declare function Trait(): ClassDecorator;
```

Used to register a class as a Trait. The class must be abstract and must contain only methods.

*Example:*

```ts
@Trait()
export abstract class TraitAdd<GSelf, GValue = GSelf, GReturn = GSelf> {
  abstract add(this: GSelf, value: GValue): GReturn;
}
```


#### Impl decorator

```ts
declare function Impl(): ClassDecorator;
```

Used to register a class as an Implementation.
The class must extend a Trait, implement all of its abstract methods, or override existing ones and nothing more.

*Example:*

```ts
@Impl()
export class ImplTraitAddForNumberStruct<GSelf extends INumberStruct> extends TraitAdd<GSelf, INumberStruct, INumberStruct> {
  add(this: GSelf, value: INumberStruct): INumberStruct {
    return { value: this.value + value.value };
  }
}
```


#### ApplyTraitImplementation

```ts
declare function ApplyTraitImplementation(target: any, traitImplementation: TConstructor): void;
```

This function applies an Implementation (`traitImplementation`) on `target`:

- it reflects the implementation's methods (including extended traits) on `target`
- and it marks `target` as implementing `traitImplementation`
 
*Example:*
 
 ```ts
const numberLike = { value: 1 };
ApplyTraitImplementation(numberLike, ImplTraitAddForNumberStruct);
// numberLike has now the property 'add'
console.log(numberLike.add({ value: 2 })); // { value: 3 }
 ```

**INFO:** usually you should not directly use `ApplyTraitImplementation` as it's slower than inheriting from a class.


#### AssembleTraitImplementations

```ts
declare function AssembleTraitImplementations<GAssembledImplementations extends TConstructor>(traitImplementations: TImplementationsCollection, baseClass?: TConstructor): GAssembledImplementations;
```

This function generates a class which implements many Implementations.
This is useful to build a class having all the methods of your implementation, and then use it as a parent class (you create child classes based on it).

This is the function you'll use the most.

*Example:*
 
 ```ts
export interface INumber extends INumberStruct,
  ImplTraitAddForNumber<INumber>
{}

export interface IAssembledNumberImplementations {
  new(): INumber;
}

export const NumberImplementationsCollection = [
  ImplTraitAddForNumber,
];

const AssembledNumberImplementations = AssembleTraitImplementations<IAssembledNumberImplementations>(NumberImplementationsCollection);

export class NumberLike extends AssembledNumberImplementations implements INumber {
  value: number;

  constructor(value: number) {
    super();
    this.value = value;
  }
}
 ```

**NOTE**: you may provide a `baseClass`, which will be used as the parent class of the newly generated class

**NOTE**: `GAssembledImplementations` is used for 2 reasons:

- Typescript struggle to infer properly the intersection of classes coming from a tuple.
- The generic parameters from the constructors can't be merged.

**NOTE**: I recommend separating properly your code as I did in the example.
It's more verbose, but it will probably help you to type properly your classes.


#### OverrideTraitImplementations

```ts
declare function OverrideTraitImplementations(traitImplementations: TImplementationsCollection, newTraitImplementations: TImplementationsCollection): TImplementationsCollection;
```

This function removes from `traitImplementations` (without modifying the original array) all implementations overridden (sharing similar traits) by `newTraitImplementations`
and appends (concat) `newTraitImplementations`

This is useful, if you want to create a class which implements some Implementations from another, and override some of them.

*Example:*
 
 ```ts
export interface INumberExtended extends INumber,
  ImplTraitAddForNumberExtended<INumberExtended>
{}

export interface IAssembledNumberExtendedImplementations {
  new(): INumberExtended;
}

// takes implementations from NumberLike, and overrides some of them with `ImplTraitAddForNumberExtended`
export const NumberExtendedImplementationsCollection = OverrideTraitImplementations(
  NumberImplementationsCollection, [
  ImplTraitAddForNumberExtended,
]);

const AssembledNumberExtendedImplementations = AssembleTraitImplementations<IAssembledNumberExtendedImplementations>(NumberExtendedImplementationsCollection);

export class NumberExtended extends AssembledNumberExtendedImplementations implements INumberExtended {
  value: number;

  constructor(value: number) {
    super();
    this.value = value;
  }
}
 ```


#### TraitIsImplementedBy

```ts
declare function TraitIsImplementedBy<GTrait, GTarget>(trait: TAbstractClass<GTrait>, target: GTarget): target is TWithImplementedTrait<GTarget, GTrait>;
```

Returns true if `trait` is implemented by `target`

*Example:*
 
 ```ts
const num = new NumberLike(1);
console.log(TraitIsImplementedBy(TraitAdd, num)); // true
 ```

**NOTE:** this function is as efficient as it could be, but like `instanceof`,
it must explore the prototype chain of the object which may be time-consuming on very frequent call.
Instead, for example, you may count on Typescript or cache the result.


#### TraitsAreImplementedBy

```ts
declare function TraitsAreImplementedBy<GTraits extends any[], GTarget>(traits: {
    [GKey in keyof GTraits]: TAbstractClass<GTraits[GKey]>;
}, target: GTarget): target is TWithImplementedTraits<GTarget, GTraits>;
```

Like [TraitIsImplementedBy](#traitisimplementedby) but for many traits.

---

### Good practices

*Do not check directly if a property exists in the methods of your traits*:

```ts
// AVOID
@Trait()
export abstract class TraitSubtractUsingAddAndNegate<GSelf, GValue> extends TraitSubtract<GSelf, GValue, TInferTraitAddGReturn<GSelf>> {
  subtract(this: GSelf, value: GValue): TInferTraitAddGReturn<GSelf> {
    if (
      TraitIsImplementedBy(TraitAdd, this)
      && TraitIsImplementedBy(TraitNegate, value)
    ) {
      return this.add(value.negate());  
    } else {
      throw new Error(`Lack of 'add' and 'negate'`);
    }  
  }
}
```

Instead, you should rely on the typing of Typescript:

```ts
// BETTER
@Trait()
export abstract class TraitSubtractUsingAddAndNegate<GSelf extends TraitAdd<GSelf, any, any>, GValue extends TraitNegate<GValue, TInferTraitAddGValue<GSelf>>> extends TraitSubtract<GSelf, GValue, TInferTraitAddGReturn<GSelf>> {
  subtract(this: GSelf, value: GValue): TInferTraitAddGReturn<GSelf> {
    return this.add(value.negate());
  }
}
```


*Keep GSelf with fewer constraints as possible in your traits*, instead constrain it on your implementations.

*Because Traits are not common for javascript developers, typing them may seem very complex at first glance*.
Don't hesitate to take inspiration from the examples, or if you find a genius pattern, to share it in this repo.

