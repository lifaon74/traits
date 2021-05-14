## NewTrait

```ts
@Trait()
export abstract class NewTrait<GSelf, GArguments extends any[], GReturn> {
  abstract [NEW](this: GSelf, ...args: GArguments): GReturn;
}
```

`NewTrait` is used when another Trait requires to create a new instance of our `GSelf`.

### Example: grayscale function for Color

#### Extend NewTrait for a Color class

```ts
// color-new.trait.ts

export type IColorNewArguments = [
  r: number,
  g: number,
  b: number,
  a: number,
];

@Trait()
export abstract class ColorNewTrait<GSelf, GReturn> extends NewTrait<GSelf, IColorNewArguments, GReturn> {
}
```

#### Implement NewTrait for our Color class

```ts
// color-class-new.implementation.ts

@Impl()
export class ColorClassNewImplementation<GSelf> extends ColorNewTrait<GSelf, IColor> {
  [NEW](this: GSelf, r: number, g: number, b: number, a: number): IColor {
    return new Color(r, g, b, a);
  }
}
```

#### Create a ColorGrayscaleTrait

```ts
// color-grayscale.trait.ts

@Trait()
export abstract class ColorGrayscaleTrait<GSelf, GReturn> {
  abstract grayscale(this: GSelf): GReturn;
}
```


#### Create a ColorGrayscaleUsingGetChannelsAndNewTrait that extends ColorGrayscaleTrait and uses ColorNewTrait

```ts
// color-grayscale-using-get-channels-and-new.trait.ts

export interface IColorGrayscaleUsingGetChannelsAndNewTraitGSelfConstraint<GReturn> extends
  // traits
  IColorGetChannelsTraits<any>, // traits to get the rgba channels
  ColorNewTrait<any, GReturn>
  //
{
}

@Trait()
export abstract class ColorGrayscaleUsingGetChannelsAndNewTrait< // generics
  GSelf extends IColorGrayscaleUsingGetChannelsAndNewTraitGSelfConstraint<GReturn>,
  GReturn
  //
  > extends ColorGrayscaleTrait<GSelf, GReturn> {
  grayscale(this: GSelf): GReturn {
    const c: number = (this.getRed() + this.getGreen() + this.getBlue()) / 3;
    return this[NEW](c, c, c, this.getAlpha());
  }
}
```

#### Implement ColorGrayscaleUsingGetChannelsAndNewTrait for our Color class

```ts
// color-struct-grayscale.implementation.ts

export interface IColorStructGrayscaleImplementationGSelfConstraint<GReturn> extends
  // struct
  IGenericColorStruct,
  // constraint
  IColorGrayscaleUsingGetChannelsAndNewTraitGSelfConstraint<GReturn>
  //
{
}


@Impl()
export class ColorStructGrayscaleImplementation< // generics
  GSelf extends IColorStructGrayscaleImplementationGSelfConstraint<GReturn>,
  GReturn
  //
  > extends ColorGrayscaleUsingGetChannelsAndNewTrait<GSelf, GReturn> {
}


```



