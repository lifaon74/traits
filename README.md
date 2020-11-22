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

[esnext, minified, gzipped, core version](https://unpkg.com/@lifaon/traits@1.0.0/bundles/traits.esnext.core.umd.min.js) is less than 3KB !


### Table of contents ###
<!-- toc -->

- [Definition](#definition)
- [API](#api)
  * [Trait decorator](#trait-decorator)
  * [Impl decorator](#impl-decorator)
  * [ApplyTraitImplementation](#applytraitimplementation)
  * [AssembleTraitImplementations](#assembletraitimplementations)
  * [OverrideTraitImplementations](#overridetraitimplementations)
  * [TraitIsImplementedBy](#traitisimplementedby)
  * [TraitsAreImplementedBy](#traitsareimplementedby)
  * [CallTargetTraitMethodOrDefaultImplementation](#calltargettraitmethodordefaultimplementation)

    

### Definition

A trait is a collection of methods that can be implemented on any data type (usually objects or classes).

It doesn't have any internal state (attributes), instead it relies only on the properties or methods of the object implementing the trait.

It is intended to reduce some limitations of single inheritance by enabling developers to reuse sets of methods freely in several independent classes living in different class hierarchies.

- [fow who ?](./documentation/for-who.md)
- [motivation](./documentation/motivation.md)
- [tutorial (extremely recommend)](./documentation/examples/01-number-like.md)
- [examples](./documentation/examples/README.md)

### API

#### Trait decorator

```ts
declare function Trait(): ClassDecorator;
```

Used to register a class as a Trait.

A Trait has the following constraints:

- **it must be an abstract class** - a Trait doesn't have any internal state (meaning a constructor is not useful)
and it is not constructable (you cannot perform `new`), so **it must not have any constructor** neither.
- **it must contain only methods** - the state comes from the object invoking the method, not from the trait itself.

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

An Implementation has the following constraints:

- **it must be a plain class and extend a Trait** - it means:
    - non abstract
    - implement all the abstract methods defined in the extended Trait
- **it must contain only methods coming from its parent Trait** - no attributes, no extra methods
- **it must not have any constructor** - for the same reasons as Traits

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

This function generates a class which groups many Implementations.
This is useful to build a class having all the methods of your implementations, and then use it as a parent class.

This is the function you'll use the most.

**NOTE**: `GAssembledImplementations` is used for 2 reasons:

- Typescript struggle to infer properly the intersection of classes coming from a tuple.
- The generic parameters from the constructors can't be merged (see second example).

*Example:*
 
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

export class NumberLike extends AssembledNumberImplementations implements INumber {
  value: number;

  constructor(value: number) {
    super();
    this.value = value;
  }
}
 ```

*Example:* using a base class

 ```ts
export interface INumberImplementations<T> extends Array<T>, // added generic <T> and it extends Array now
  ImplTraitAddForNumber<INumber>,
  ImplTraitSubtractForNumber<INumber>
{}

export const NumberImplementations = [
  ImplTraitAddForNumber,
  ImplTraitSubtractForNumber,
];

export interface INumberImplementationsConstructor {
  new<T>(): INumberImplementations<T>; // added generic <T>
}

export interface INumber<T> extends INumberStruct, INumberImplementations<T> { // added generic <T>
}

const NumberImplementationsConstructor = AssembleTraitImplementations<INumberImplementationsConstructor>(NumberImplementations, Array); // second argument is Array

export class NumberLike<T> extends NumberImplementationsConstructor<T> implements INumber<T> {
  value: number;

  constructor(value: number) {
    super();
    this.value = value;
  }
}
 ```

Yes, I know: a number extending an Array is totally a nonsense, but hey, I didn't had other quick idea 🤣. Is it not fun to do `new NumberLike(5).push(3)` ? 

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

export interface INumberExtendedImplementations {
  new(): INumberExtended;
}

// takes implementations from NumberLike, and overrides some of them with `ImplTraitAddForNumberExtended`
export const NumberExtendedImplementations = OverrideTraitImplementations(
  NumberImplementationsCollection, [
  ImplTraitAddForNumberExtended,
]);

const NumberExtendedImplementationsConstructor = AssembleTraitImplementations<INumberExtendedImplementations>(NumberExtendedImplementations);

export class NumberExtended extends NumberExtendedImplementationsConstructor implements INumberExtended {
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

#### CallTargetTraitMethodOrDefaultImplementation

```ts
declare function CallTargetTraitMethodOrDefaultImplementation<GTrait, GMethodName extends (keyof GTrait)>(
  target: any,
  trait: TAbstractClass<GTrait>,
  methodName: GMethodName,
  args: Parameters<TExtractTraitMethod<GTrait, GMethodName>>,
  defaultImplementation: TClassType<GTrait>
): ReturnType<TExtractTraitMethod<GTrait, GMethodName>>;
```

If `target` implements `trait`, the function does `target[methodName].apply(target, args)`. 
Else, the `defaultImplementation` is used: `defaultImplementation.prototype[methodName].apply(target, args)`

*Example:*
 
 ```ts
const num1 = new NumberLike(5);
console.log(CallTargetTraitMethodOrDefaultImplementation(num1, TraitAdd, 'add', [{ value: 2 }], ImplTraitAddForNumberStruct)); // NumberLike(7)

const num2 = { value: 5 };
console.log(CallTargetTraitMethodOrDefaultImplementation(num2, TraitAdd, 'add', [{ value: 2 }], ImplTraitAddForNumberStruct)); // { value: 7 }
 ```

**WARN:** this function must be used with parsimony and caution.
It should not be used directly from the methods of your traits or implementations, or at least avoided when possible.
Instead, you should create many specialized Implementations or Traits:

**DONT**

```ts
/**
 * This Implementation will work for any kind of INumberStruct, having 'add'/'negate' or not,
 * But it runs many conditional branching and function calls (workload that could be avoided or simplified)
 * This is not max efficient for both the execution time, and the bundle size
 */
@Impl()
export abstract class ImplTraitSubtractForNumberStruct<GSelf extends INumberStruct> extends TraitSubtract<GSelf, INumberStruct, INumberStruct> {
  subtract(this: GSelf, value: INumberStruct): INumberStruct {
    return CallTargetTraitMethodOrDefaultImplementation(
      this,
      TraitAdd,
      'add',
      [
        CallTargetTraitMethodOrDefaultImplementation(
          value,
          TraitNegate,
          'negate',
          [value],
          ImplTraitNegateForNumberStruct
        )
      ],
      ImplTraitAddForNumberStruct
    );
  }
}
```

**INSTEAD PREFER**

```ts
/**
 * Fastest implementation
 */
@Impl()
export class ImplTraitSubtractForNumberStruct<GSelf extends INumberStruct> extends TraitSubtract<GSelf, INumberStruct, INumberStruct> {
  subtract(this: GSelf, value: INumberStruct): INumberStruct {
    return { value: this.value - value.value };
  }
}

/**
 * But maybe one user of your lib, prefer to use 'add' and 'negate'
 */
export type TImplTraitSubtractUsingAddAndNegateForNumberStructGSelfConstraint<GSelf> = INumberStruct
  & TraitAdd<GSelf, GSelf, GSelf>;

export type TImplTraitSubtractUsingAddAndNegateForNumberStructGValue<GSelf extends TraitAdd<GSelf, GSelf, GSelf>> = INumberStruct
  & TraitNegate<INumberStruct, TInferTraitAddGValue<GSelf>>;

@Impl()
export class ImplTraitSubtractUsingAddAndNegateForNumberStruct<GSelf extends TImplTraitSubtractUsingAddAndNegateForNumberStructGSelfConstraint<GSelf>> extends TraitSubtractUsingAddAndNegate<GSelf, TImplTraitSubtractUsingAddAndNegateForNumberStructGValue<GSelf>> {
}
```

And then use the proper implementation depending on the other implementations on your classes.

Creating and using many implementations for different data structures is far more efficient that doing conditional branching (for both execution time and bundle size).

**Consider using this function as last resort, or only if you really don't care of the performances of your app**

