## assembleTraitImplementations

```ts
declare function assembleTraitImplementations<GAssembledImplementations extends TConstructor>(
  traitImplementationsForPrototype: IImplementationsCollection,
  traitImplementationsForStaticClass?: IImplementationsCollection,
  baseClass?: IConstructor,
): GAssembledImplementations;
```

This function generates a class which groups many Implementations.
This is useful to build a class having all the methods of your implementations, and then use it as a parent class.

This is the function you'll use the most.

**NOTE**: `GAssembledImplementations` is used for 2 reasons:

- Typescript struggle to infer properly the intersection of classes coming from a tuple.
- The generic parameters from the constructors can't be merged.

**Arguments**:

- `traitImplementationsForPrototype`: a list of Implementations to include in the prototype of your class
- `traitImplementationsForStaticClass`: a list of Implementations to include in the static part of your class
- `baseClass`: an optional parent class


### Examples

#### Own implementation of a Number

```ts
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

export interface INumber extends INumberStruct, INumberImplementations {
}

const NumberImplementationsConstructor = assembleTraitImplementations<INumberImplementationsConstructor>(NumberImplementations);

export class NumberLike extends AssembledNumberImplementations implements INumber {
  value: number;

  constructor(value: number) {
    super();
    this.value = value;
  }
}
```


