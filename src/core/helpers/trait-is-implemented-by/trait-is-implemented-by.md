## traitIsImplementedBy

```ts
declare function traitIsImplementedBy<GTrait, GTarget>(
  trait: IAbstractConstructor<GTrait>,
  target: GTarget,
): target is IWithImplementedTrait<GTarget, GTrait>;
```

Returns true if `trait` is implemented by `target`


**NOTE:** this function is as efficient as it could be, but like `instanceof`,
it must explore the prototype chain of the object which may be time-consuming on very frequent call.
Instead, you should prefer to rely purely on Typescript's typing.

### Examples

#### Test if NumberLike implements AddTrait

```ts
const numberLike = new NumberLike(1);
console.log(traitIsImplementedBy(AddTrait, numberLike)); // returns true if 'numberLike' implements the Trait 'AddTrait'
```


