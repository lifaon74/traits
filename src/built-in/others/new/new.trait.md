## NewTrait

```ts
interface INewFunction<GArguments extends any[], GReturn> {
  (
    ...args: GArguments
  ): GReturn;
}

interface INewTrait<GArguments extends any[], GReturn> {
  [NEW]: INewFunction<GArguments, GReturn>;
}
```

`NewTrait` is used when we need to create a new instance of the original implementation.

### Example: 'add' function for a Number

#### Define the Number type

```ts
// number.type.ts

export interface INumber extends //
  INewFunction<[number], INumber>,
  IValueOfTrait<number>,
  IAddTrait<IValueOfTrait<number>, INumber>
  //
{
}
```

#### Write a function to build a Number

```ts
// create-number.ts

export function createNumber(
  value: number,
): INumber {
  const _new = createNumber;

  const valueOf = (): number => {
    return value;
  };

  const add = (_value: IValueOfTrait<number>): INumber => {
    return _new(value + _value.valueOf());
  };
  
  return {
    [NEW]: _new,
    valueOf,
    add,
  };
}
```

