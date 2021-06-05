# Example: NumberLike

Let me introduce you to this lib through an example: building from scratch a number and some operations on it.

[Here is the source file for this example](https://github.com/lifaon74/traits-v2-debug/blob/main/src/number-like/number-like.ts)

## Trait

The first operation on numbers that comes to mind is the **addition**, so we will start by creating an `add` Trait:

```ts
@Trait()
export abstract class AddTrait<GSelf, GValue = GSelf, GReturn = GSelf> {
  abstract add(this: GSelf, value: GValue): GReturn;
}
```

Traits are intended to be as generic as possible, because they may be used by very different classes, having very different data and purpose.
For example, the `AddTrait` may apply for *numbers*, *bigints*, *vectors*, etc...
so it must be flexible enough, not to be limited to certain data structures.

It means that **every Trait must have a `GSelf` as first generic**, used to type the `this` of each method.

Moreover, in our example, because we don't known in advance the incoming and outgoing values, we will define them as generics too
(`GValue` and `GReturn` for *vectors* won't be the sames as the ones for *numbers*).

Second, we may think about **subtraction**:

```ts
@Trait()
export abstract class SubtractTrait<GSelf, GValue = GSelf, GReturn = GSelf> {
  abstract subtract(this: GSelf, value: GValue): GReturn;
}
```

This library comes with a set of common Traits, which may be found in the [built-in](../../built-in) folder.

We will use the [built-ins/arithmetic](../../built-in/arithmetic)'s ones in the following examples.


#### Extend a Trait

Usually, there is more than one way to obtain equivalent results.
For example, a counterpart of a subtraction is `a - b = a + (-b)` => `add(a, negate(b))`.

Obviously, this is less performant, but in some cases this may be useful if an object implements the `AddTrait`
and `NegateTrait` but lacks of a proper implementation of the `SubtractTrait`.

So here is the definition of a Trait using this approach and extending `SubtractTrait`:

```ts
// constraints
export type ISubtractUsingAddAndNegateTraitGSelfConstraint = AddTrait<any, any, any>;
export type ISubtractUsingAddAndNegateTraitGValueConstraint<GSelf extends ISubtractUsingAddAndNegateTraitGSelfConstraint> = NegateTrait<any, TInferAddTraitGValue<GSelf>>;

// return
export type ISubtractUsingAddAndNegateTraitGReturn<GSelf extends ISubtractUsingAddAndNegateTraitGSelfConstraint> = TInferAddTraitGReturn<GSelf>;


@Trait()
export abstract class SubtractUsingAddAndNegateTrait< // generics
  GSelf extends ISubtractUsingAddAndNegateTraitGSelfConstraint,
  GValue extends ISubtractUsingAddAndNegateTraitGValueConstraint<GSelf>
  //
  > extends SubtractTrait<GSelf, GValue, ISubtractUsingAddAndNegateTraitGReturn<GSelf>> {
  subtract(this: GSelf, value: GValue): ISubtractUsingAddAndNegateTraitGReturn<GSelf> {
    return this.add(value.negate());
  }
}
```

The typing may be a little freaky so let's stop on it a few minutes:

- `GSelf extends AddTrait<any, any, any>`: the incoming `this` must implement `AddTrait`
- `GValue extends NegateTrait<any, TInferAddTraitGValue<GSelf>>`: the incoming `value` must implement `NegateTrait`,
and calling this method must return the proper type expected by `this.add`
- `TInferAddTraitGReturn<GSelf>`: returned type of the `AddTrait` of `GSelf`

At first look, the typing is probably confusing and complex.
However, it is for a good reason: you use Traits to provide a *framework* for your classes,
so a correct typing is essential, just like when you code your abstract classes.
A strong typing is required to ensure that every class implementing your Traits have the proper shape, data structure and expected methods.

## Structure

The purpose of a Structure, is to carry the data and nothing else.

Let's create a basic structure holding a number:

```ts
export interface INumberStruct {
  value: number;
}
```


**NOTE:** the purpose of the Structure is to carry the data, and nothing else. It must not implement any methods,
**BUT** it can store functions just like any other kind of variables.

*Example:*

```ts
const numberStruct: INumberStruct = { value: 1 };
```

**NOTE:** our Structure is just an object having a `value` property.
It may be a plain object, or the instance of a class.


## Implementation

An Implementation does the link between a Trait and a Structure.
It represents the code that must be run for a specific data structure which implements this Trait.

Let's create an Implementation for our `INumberStruct` and our `AddTrait`:

```ts
@Impl()
export class NumberStructAddImplementation<GSelf extends INumberStruct> extends AddTrait<GSelf, INumberStruct, INumberStruct> {
  add(this: GSelf, value: INumberStruct): INumberStruct {
    return { value: this.value + value.value };
  }
}
```

As you may see, our Implementation returns a plain `INumberStruct`, meaning we won't be able to chain some operations like:
`num.add({ value: 5 }).add({ value: 6 })`.

Sometimes, it's not very convenient, so we will create another Implementation allowing us to chain our operations:

```ts
@Impl()
export class NumberAddImplementation<GSelf extends INumber> extends AddTrait<GSelf, INumberStruct, INumber> {
  add(this: GSelf, value: INumberStruct): INumber {
    return new NumberLike(this.value + value.value);
  }
}
```

And let's do `subtract` too:

```ts
@Impl()
export class NumbersSubtractImplementation<GSelf extends INumber> extends SubtractTrait<GSelf, INumberStruct, INumber> {
  subtract(this: GSelf, value: INumberStruct): INumber {
    return new NumberLike(this.value - value.value);
  }
}
```

Don't worry, `INumber` and `NumberLike` are defined below.


## Assemble your implementations in a class

So we have defined two implementations that we would like to use.

First, we will group our Implementations as one interface:

```ts
export interface INumberImplementations extends
  NumberAddImplementation<INumber>,
  NumbersSubtractImplementation<INumber>
{}
```

One array:

```ts
export const NumberImplementations = [
  NumberAddImplementation,
  NumbersSubtractImplementation,
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

`INumber` is simply a `INumberStruct` which implements `AddTrait` and `SubtractTrait`.

Next, we assemble our Implementations:

```ts
const NumberImplementationsConstructor = assembleTraitImplementations<INumberImplementationsConstructor>(NumberImplementations);
```

And last, we create a class which extends our Implementations and contains the properties of `INumberStruct`:

```ts
export class NumberLike extends NumberImplementationsConstructor implements INumber {
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
  NumberAddImplementation<INumber>,
  NumbersSubtractImplementation<INumber>
{}

export const NumberImplementations = [
  NumberAddImplementation,
  NumbersSubtractImplementation,
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
console.log(isTraitImplementedBy(AddTrait, num1)); // true
```

[source file](https://github.com/lifaon74/traits-v2-debug/blob/main/src/number-like/number-like.ts)

---

- [HOME](../../../README.md)
- [EXAMPLES](./README.md)
