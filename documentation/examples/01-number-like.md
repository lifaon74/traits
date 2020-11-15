# Example: NumberLike

Let me introduce you to this lib through an example: building a wrapper around a number.
This example is probably useless in itself, but it is very simple and perfect to learn Traits.

[Here is the source file for this example](../../src/examples/number-like.ts)

## Trait

The first use of numbers that one might have idea is the **addition**, so we will start by creating an `add` Trait:

```ts
@Trait()
export abstract class TraitAdd<GSelf, GValue = GSelf, GReturn = GSelf> {
  abstract add(this: GSelf, value: GValue): GReturn;
}
```

Traits are intended to be as generic as possible, to then be used by many classes.
For example, the `TraitAdd` may apply for *numbers*, *bigints*, *vectors*, etc...
so it must be flexible enough, not to be limited to certain data structures.

It means that **every Trait should have a `GSelf` as first generic**, used to type the `this` of each method.

Moreover, in our example, because we don't known in advance the incoming and outgoing values, we will define them as generics too.

Second, we may think about **subtraction**:

```ts
@Trait()
export abstract class TraitSubtract<GSelf, GValue = GSelf, GReturn = GSelf> {
  abstract subtract(this: GSelf, value: GValue): GReturn;
}
```

This library commes with a set of common Traits, which may be found in the [built-in-traits](../../src/built-in-traits) folder.

We will use the [built-in-traits/arithmetic](../../src/built-in-traits/arithmetic)'s ones in the following examples.


#### Extend a Trait

Usually, there is more than one way to obtain equivalent results.
For example, a counterpart of a subtraction is `a - b = a + (-b)` > `add(a, negate(b))`.

Obviously, this is less performant, but in some cases this may be useful if an object implements the `TraitAdd` and `TraitNegate` but lacks of a proper implementation of the `TraitSubstract`.

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


## Structure

The purpose of a Structure, is to carry the data and nothing else.

Let's create a basic wrapper around a `number`:

```ts
export interface INumberStruct {
  value: number;
}
```

**NOTE:** the Structures must not implement any methods. **But** they can store functions as any other kind of variables.

*Example:*

```ts
const num1: INumberStruct = { value: 1 };
const num2: INumberStruct = Object.create(null, { value: { value: 1, writable: false }}); // ok maybe this one goes too far XD
```

**NOTE:** our Structure is just an object having a `value` property. It may be the instance of a class, or simply a plain object (ex: `{ value: 1 }`).


## Implementation

An Implementation does the link between a Trait and a Structure.
It represents the code that must be run for a specific data structure which implements this Trait.

Let's create an Implementation for our `INumberStruct` and our `TraitAdd`:

```ts
@Impl()
export class ImplTraitAddForNumberStruct<GSelf extends INumberStruct> extends TraitAdd<GSelf, INumberStruct, INumberStruct> {
  add(this: GSelf, value: INumberStruct): INumberStruct {
    return { value: this.value + value.value };
  }
}
```

As you may see, our Implementation returns a plain `INumberStruct`, meaning we won't be able to chain some operations like:
`num.add({ value: 5 }).add({ value: 6 })`.

For this particular usecase it's not very convenient, so we will create another Implementation:

```ts
@Impl()
export class ImplTraitAddForNumber<GSelf extends INumber> extends TraitAdd<GSelf, INumberStruct, INumber> {
  add(this: GSelf, value: INumberStruct): INumber {
    return new NumberLike(this.value + value.value);
  }
}
```

And let's do `subtract` too:

```ts
@Impl()
export class ImplTraitSubtractForNumber<GSelf extends INumber> extends TraitSubtract<GSelf, INumberStruct, INumber> {
  subtract(this: GSelf, value: INumberStruct): INumber {
    return new NumberLike(this.value - value.value);
  }
}
```

Don't worry, `INumber` and `NumberLike` are defined below.


## Assemble your implementations in a class

So we have defined two implementations that we would like to use. We may use `ApplyTraitImplementation`,
but it's not efficient nor elegant solution to reflect our implementations on some objects. Instead we will use the well known class approach.

**INFO:** following example is pretty detailed. It's up to you to regroup or reduce your code.

First, we will group our Implementations as one interface:

```ts
export interface INumberImplementations extends
  ImplTraitAddForNumber<INumber>,
  ImplTraitSubtractForNumber<INumber>
{}
```

One array:

```ts
export const NumberImplementations = [
  ImplTraitAddForNumber,
  ImplTraitSubtractForNumber,
];
```

And the constructor associated to it:

```ts
export interface INumberImplementationsConstructor {
  new(): INumberImplementations;
}
```

Then the definition of `INumber`:

```ts
export interface INumber extends INumberStruct, INumberImplementations {
}
```

`INumber` is simply a `INumberStruct` which implements `TraitAdd` and `TraitSubtract`.

Using previous Implementations, it allows us to chain some operations like: `num.add({ value: 5 }).subtract({ value: 6 })`


Next, we assemble our Implementations:

```ts
const NumberImplementationsConstructor = AssembleTraitImplementations<INumberImplementationsConstructor>(NumberImplementations);
```

And last, we create a class which extends our Implementations and contains the properties of `INumberStruct`:

```ts
export class NumberLike extends AssembledNumberImplementations implements INumber {
  value: number;

  constructor(value: number) {
    super();
    this.value = value;
  }
}
```


<details>
<summary>show grouped</summary>
<p>

```ts
export interface INumberImplementations extends
  ImplTraitAddForNumber<INumber>,
  ImplTraitSubtractForNumber<INumber>
{}

export const NumberImplementations = [
  ImplTraitAddForNumber,
  ImplTraitSubtractForNumber,
];

export interface INumberImplementationsConstructor {
  new(): INumberImplementations;
}

export interface INumber extends INumberStruct, INumberImplementations {
}

const NumberImplementationsConstructor = AssembleTraitImplementations<INumberImplementationsConstructor>(NumberImplementations);

export class NumberLike extends NumberImplementationsConstructor implements INumber {
  value: number;

  constructor(value: number) {
    super();
    this.value = value;
  }
}
```

</p>
</details>


### Testing our code

The last step is to test our code:

```ts
const num1 = new NumberLike(1);
const num2 = new NumberLike(2);
const num3 = new NumberLike(3);

console.log(num1.add(num2)); // NumberLike(3)
console.log(num1.add(num2).add(num3)); // NumberLike(6)
console.log(num1.add({ value: 20 })); // NumberLike(21)
console.log(TraitIsImplementedBy(TraitAdd, num1)); // true
```

[source file](../../src/examples/number-like.ts)

---

- [HOME](../../README.md)
- [EXAMPLES](./README.md)
