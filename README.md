[![npm (scoped)](https://img.shields.io/npm/v/@lifaon/traits.svg)](https://www.npmjs.com/package/@lifaon/traits)
![npm](https://img.shields.io/npm/dm/@lifaon/traits.svg)
![NPM](https://img.shields.io/npm/l/@lifaon/traits.svg)
![npm type definitions](https://img.shields.io/npm/types/@lifaon/traits.svg)

## 🏗️ Traits

A **trait** is a set of methods that can used to extend the functionality of a class, and is particularly useful in multi-inheritance.

A trait doesn't have any internal state, it only provides some typed and constrained methods,
and relies on the provided `this` to carry the data. It's some kind of *framework* for classes, or abstract classes with super-powers.

A trait comes with an **implementation**, which is the implementation of a trait for a specific data structure.


- [🤔 fow who ?](src/documentation/for-who.md)
- [🎯 motivation](src/documentation/motivation.md)
- [🎓 tutorial (highly recommended)](src/documentation/examples/01-number-like.md)
- [🗃️ example repo](https://github.com/lifaon74/traits-v2-debug/tree/main/src/color)

## 🛠️ Example

```ts
// add.trait.ts

@Trait()
export abstract class AddTrait<GSelf, GValue = GSelf, GReturn = GSelf> {
  abstract add(this: GSelf, value: GValue): GReturn;
}
```

<details>
  <summary>Click to expand</summary>

```ts
// number-add.implementation.ts

@Impl()
export class NumberAddImplementation<GSelf extends INumber> extends AddTrait<GSelf, NumberLike, INumber> {
  add(this: GSelf, value: NumberLike): INumber {
    return new NumberLike(this.value + value.value);
  }
}
```

```ts
// number.class.ts

export interface INumberImplementations extends
  NumberAddImplementation<INumber>,
  NumberSubtractImplementation<INumber>
{}

export const NumberImplementations = [
  NumberAddImplementation,
  NumberSubtractImplementation,
];

export interface INumberImplementationsConstructor {
  new(): INumberImplementations;
}

export interface INumber extends INumberImplementations {
  value: number;
}

const NumberImplementationsConstructor = assembleTraitImplementations<INumberImplementationsConstructor>(NumberImplementations);

export class NumberLike extends NumberImplementationsConstructor implements INumber {
  value: number;

  constructor(value: number) {
    super();
    this.value = value;
  }
}
```

</details>

## 📦 Installation

```bash
yarn add @lifaon/traits
# or
npm install @lifaon/traits --save
```

This library supports:

- **common-js** (require): transpiled as es5, with .cjs extension, useful for old nodejs versions
- **module** (esm import): transpiled as esnext, with .mjs extension (requires node resolution for external packages)

In a **node** environment the library works immediately (no extra tooling required),
however, in a **browser** environment, you'll need to resolve external imports thought a bundler like
[snowpack](https://www.snowpack.dev/),
[rollup](https://rollupjs.org/guide/en/),
[webpack](https://webpack.js.org/),
etc...
or directly using [skypack](https://www.skypack.dev/):
[https://cdn.skypack.dev/@lifaon/traits](https://cdn.skypack.dev/@lifaon/traits)


## 📕 Documentation

- [Trait](src/core/trait/trait.md)
- [Impl](src/core/implementation/implementation.md)
- [assembleTraitImplementations](src/core/helpers/assemble-trait-implementations/assemble-trait-implementations.md)
- [overrideTraitImplementations](src/core/helpers/override-trait-implementations/override-trait-implementations.md)
- [traitIsImplementedBy](src/core/helpers/trait-is-implemented-by/trait-is-implemented-by.md)
- [traitsAreImplementedBy](src/core/helpers/traits-are-implemented-by/traits-are-implemented-by.md)

