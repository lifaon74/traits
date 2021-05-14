## overrideTraitImplementations

```ts
declare function overrideTraitImplementations(
  traitImplementations: IImplementationsCollection,
  newTraitImplementations: IImplementationsCollection,
): IImplementationsCollection;
```

This function filters `traitImplementations`, excluding the implementations overridden by `newTraitImplementations`
(removes from `traitImplementations` the shared traits present in `newTraitImplementations`).
Then it concacts `newTraitImplementations` to this filtered array, and returns the resulting array.

This is useful, if you want to create a class which implements some Implementations from another class (already build from other Implementations).

It is a kind of `extends` for Implementations.


### Example

 ```ts
export interface INumberExtended extends INumber,
  NumberExtendedAddImplementation<INumberExtended>
{}

export interface INumberExtendedImplementations {
  new(): INumberExtended;
}

// takes implementations from NumberLike, and overrides some of them with `NumberExtendedAddImplementation`
export const NumberExtendedImplementations = overrideTraitImplementations(
  NumberImplementationsCollection, [
    NumberExtendedAddImplementation,
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


