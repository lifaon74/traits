## Trait decorator

```ts
declare function Trait(): ClassDecorator;
```

Used to register a class as a Trait.

A Trait has the following constraints:

- **it must be an abstract class** - a Trait doesn't have any internal state (meaning a constructor is not useful)
  and it is not constructable (you cannot perform `new`), so **it must not have any constructor** neither.
- **it must contain only methods** - the state comes from the object invoking the method, not from the trait itself.

#### Best practices

- for each of your Trait, create a file named `[trait-name].trait.ts` (ex: `add.trait.ts`).
- a Trait should have only one method. Else consider splitting your Trait.
- the class name of your Trait should follow this pattern `[TraitName]Trait` (ex: `AddTrait`).
- a Trait must be as flexible as possible, meaning you should maximize the usage of `generics` (ex: `GSelf`, `GValue`, `GReturn`, ...)

### Examples

#### A Trait to perform an addition

```ts
// add.trait.ts

@Trait()
export abstract class AddTrait<GSelf, GValue = GSelf, GReturn = GSelf> {
  abstract add(this: GSelf, value: GValue): GReturn;
}
```


#### A Trait to perform a subtraction using 'add' and 'negate' 

```ts
// subtract-using-add-and-negate.trait.ts

// GSelf must implement AddTrait
export type ISubtractUsingAddAndNegateTraitGSelfConstraint = AddTrait<any, any, any>;
// the incomming value (GValue) must implement NegateTrait, with a return acceptable by 'add'
export type ISubtractUsingAddAndNegateTraitGValueConstraint<GSelf extends ISubtractUsingAddAndNegateTraitGSelfConstraint> = NegateTrait<any, TInferAddTraitGValue<GSelf>>;
// the return is infered from the return of 'add'
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
