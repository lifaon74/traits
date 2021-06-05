## 🥇 Best practices

You may find here an example of a repo using Traits: [🗃️ example repo](https://github.com/lifaon74/traits-v2-debug/tree/main/src/color)

### Recommended file structure


- `name-of-your-class` | (ex: `color`)
  - traits
    - `name-of-your-trait` | (ex: `invert`)
      - `name-of-your-class`.`name-of-your-trait`.trait.ts | (ex: `color.invert.trait.ts`)
      - derived | (optional: contains some traits using other traits providing an implementation of this specific trait)
        - `name-of-your-class`.`name-of-your-trait`.using-`name-of-traits-used`.trait.ts | (ex: `color.invert.using-get-channels-and-new.ts`)
  - implementations
    - `name-of-your-implementation` (ex: `default`, `readonly`, etc...)
      - struct
        - `name-of-your-implementation`-`name-of-your-class`.struct.ts | (ex: `readonly-color.struct.ts`)
        - implementations
          - `name-of-the-trait-to-implement` | (ex: `invert`)
            - `name-of-your-implementation`-`name-of-your-class`-struct.`name-of-the-trait-to-implement`.implementation.ts | (ex: `readonly-color-struct.invert.implementation.ts`)
      - class
        - `name-of-your-implementation`-`name-of-your-class`.class.ts | (ex: `readonly-color.class.ts`)
        - implementations
          - `name-of-the-trait-to-implement` | (ex: `invert`)
            - `name-of-your-implementation`-`name-of-your-class`-class.`name-of-the-trait-to-implement`.implementation.ts | (ex: `readonly-color-class.new.implementation.ts`)


### Recommended Trait file content

- for each of your Trait, create a file named `name-of-your-class`.`name-of-your-trait`.trait.ts (ex: `color.invert.trait.ts`).
- a Trait should have only one method. Else consider splitting your Trait.
- the class name of your Trait should follow this pattern `[NameOfYourClass][NameOfYourTrait]Trait` (ex: `ColorInvertTrait`).
- a Trait must be as flexible as possible, meaning you should maximize the usage of `generics` (ex: `GSelf`, `GValue`, `GReturn`, ...)


```ts
// color.invert.trait.ts

@Trait()
export abstract class ColorInvertTrait<GSelf, GReturn> {
  abstract invert(this: GSelf, amount?: number): GReturn;
}
```

#### Derived trait

A derived Trait is a Trait extending a base Trait and providing an implementation for its method.

The provided implementation is based on other Traits instead of relying on a specific data structure (`this`).

```ts
// color.invert.using-get-channels-and-new.ts

export interface IColorInvertUsingGetChannelsAndNewGSelfConstraint<GReturn> extends
  // traits
  IColorGetChannelsTraits<unknown>,
  ColorNewTrait<unknown, GReturn>
  //
{
}


@Trait()
export abstract class ColorInvertUsingGetChannelsAndNew< // generics
  GSelf extends IColorInvertUsingGetChannelsAndNewGSelfConstraint<GReturn>,
  GReturn
  //
  > extends ColorInvertTrait<GSelf, GReturn> {
  invert(this: GSelf, amount: number = 1): GReturn {
    if ((0 <= amount) && (amount <= 1)) {
      return this[NEW](
        amount * (1 - this.getRed()) + (1 - amount) * this.getRed(),
        amount * (1 - this.getGreen()) + (1 - amount) * this.getGreen(),
        amount * (1 - this.getBlue()) + (1 - amount) * this.getBlue(),
        this.getAlpha(),
      );
    } else {
      throw new RangeError(`Expected 'amount' in the range [0, 1]`);
    }
  }
}
```

### Recommended Implementation file content

- for each of your Implementation, create a file named `name-of-your-implementation`-`name-of-your-class`-`'struct' or 'class'`.`name-of-the-trait-to-implement`.implementation.ts (ex: `readonly-color-struct.invert.implementation.ts`)
- the class name of your Implementation should follow this pattern `[NameOfYourImplementation][NameOfYourClass][Struct or Class][NameOfYourTrait]Implementation` (ex: `ReadonlyColorStructInvertImplementation`).

```ts
// color-struct.get-red-implementation.ts

@Impl()
export class ColorStructGetRedImplementation<GSelf extends IGenericColorStruct> extends ColorGetRedTrait<GSelf> {
  getRed(this: GSelf): number {
    return this[COLOR_PRIVATE_CONTEXT].r;
  }
}
```

#### Implementation using a derived trait

```ts
// color-struct.invert.implementation.ts

export interface IColorStructInvertImplementationGSelfConstraint<GReturn> extends
  // struct
  IGenericColorStruct,
  // constraint
  IColorInvertUsingGetChannelsAndNewGSelfConstraint<GReturn>
  //
{
}


@Impl()
export class ColorStructInvertImplementation< // generics
  GSelf extends IColorStructInvertImplementationGSelfConstraint<GReturn>,
  GReturn
  //
  > extends ColorInvertUsingGetChannelsAndNew<GSelf, GReturn> {
}
```




