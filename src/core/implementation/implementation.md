## Impl decorator

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

### Examples

#### An Implementation of AddTrait for NumberStruct

```ts
@Impl()
export class NumberStructAddImplementation<GSelf extends INumberStruct> extends AddTrait<GSelf, INumberStruct, INumberStruct> {
  add(this: GSelf, value: INumberStruct): INumberStruct {
    return { value: this.value + value.value };
  }
}
```

